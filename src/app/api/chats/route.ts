import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY, // Asegúrate de configurar esta variable de entorno
});

interface RequestBody {
    content: string;
}

export async function POST(req: NextRequest) {
    try {
        const body: RequestBody = await req.json();
        const { content } = body;

        if (!content) {
            return NextResponse.json(
                { error: "El campo 'content' es obligatorio." },
                { status: 400 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4", 
            messages: [
                { role: "system", content: "You are an assistant of tourism of colombia, that only will response questions associate to tourism" },
                { role: "user", content },
            ],
        });

        const result = completion.choices[0].message?.content;

    return NextResponse.json({
      message: "Values added successfully",
      result,
    });
  } catch (error: any) {
    console.error("Error:", error);

    if (error.status === 429) {
      // manejo del Límite de uso de la API
      return NextResponse.json(
        { error: "Se ha alcanzado el límite de uso de la API. Intente más tarde." },
        { status: 429 }
        //el cliente ha enviado demasiadas solicitudes en un período corto de tiempo, lo que corresponde a errores relacionados con límites de uso, basicamente,el problema está relacionado con las cuotas o el límite de uso.
      );
    }

    if (error.name === "TimeoutError") {
      // manejo del tiempo de espera
      return NextResponse.json(
        { error: "La solicitud tardó demasiado tiempo. Por favor, inténtelo nuevamente." },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Ocurrió un error al procesar la solicitud. Inténtelo más tarde." },
      { status: 500 }
    );
  }
}
