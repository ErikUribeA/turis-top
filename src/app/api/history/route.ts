import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
      const session = await getServerSession();
      if (!session?.user?.id) {
        return NextResponse.json(
          { error: "No autorizado" },
          { status: 401 }
        );
      }
  
      const chatHistory = await prisma.ask.findMany({
        where: {
          userId: session.user.id
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
  
      return NextResponse.json({
        history: chatHistory
      });
  
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json(
        { error: "Error al obtener el historial de chat" },
        { status: 500 }
      );
    }
  }