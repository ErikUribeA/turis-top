// app/api/chats/route.ts
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    // 1. Verificar que el usuario esté autenticado
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // 2. Obtener el mensaje del usuario
    const { content } = await req.json();
    if (!content) {
      return NextResponse.json(
        { error: "El mensaje es requerido" },
        { status: 400 }
      );
    }

    // 3. Obtener respuesta de OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an assistant of tourism of antioquia, that only will response questions associate to tourism and the answers will be concise and very helpful.",
        },
        { role: "user", content }
      ],
    });

    const aiResponse = completion.choices[0].message?.content || "";

    // 4. Guardar la conversación en la base de datos
    const savedChat = await prisma.ask.create({
      data: {
        userId: session.user.id,
        question: content,
        answer: aiResponse,
      },
    });

    return NextResponse.json({
      result: aiResponse,
      chatId: savedChat.id
    });

  } catch (error) {
    console.error("Error en el chat:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}

// Endpoint opcional para obtener el historial de chat
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const chatHistory = await prisma.ask.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ history: chatHistory });
  } catch (error) {
    console.error("Error al obtener historial:", error);
    return NextResponse.json(
      { error: "Error al obtener el historial" },
      { status: 500 }
    );
  }
}