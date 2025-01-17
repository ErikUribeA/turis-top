import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.API_KEY, // Asegúrate de configurar esta variable de entorno
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
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Ocurrió un error al procesar la solicitud." },
            { status: 500 }
        );
    }
}
