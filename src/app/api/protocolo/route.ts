import { NextResponse } from "next/server";
import db from "../../../lib/db";

function gerarProtocolo() {
    const agora = new Date();

    return `MAY-${agora.getFullYear()}${String(
        agora.getMonth() + 1
    ).padStart(2, "0")}${String(agora.getDate()).padStart(2, "0")}${Math.floor(
        100000 + Math.random() * 900000
    )}`;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            nome = "",
            email = "",
            telefone = "",
            assunto = "",
            mensagem = "",
            tipo = "atendimento",
        } = body;

        if (!nome || !email || !mensagem) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Campos obrigatórios faltando",
                },
                { status: 400 }
            );
        }

        const protocolo = gerarProtocolo();

        // Horário Brasil (UTC-3)
        const created_at = new Date(
            new Date().toLocaleString("sv-SE", {
                timeZone: "America/Sao_Paulo",
            })
        );

        const expires_at = new Date(
            created_at.getTime() + 90 * 60 * 1000
        );

        await db.execute(
            `
            INSERT INTO protocolos (
                protocolo,
                nome,
                email,
                telefone,
                assunto,
                mensagem,
                tipo,
                created_at,
                expires_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                protocolo,
                nome,
                email,
                telefone,
                assunto,
                mensagem,
                tipo,
                created_at,
                expires_at,
            ]
        );

        return NextResponse.json({
            success: true,
            protocolo,
        });
    } catch (error) {
        console.error("Erro ao criar protocolo:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Erro interno no servidor",
            },
            { status: 500 }
        );
    }
}