import db from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { protocolo } = await req.json();

    console.log("Protocolo recebido:", protocolo);

    const [rows]: any = await db.execute(
      `
      SELECT
          id,
          protocolo,
          tipo,
          status,
          mensagem,
          resposta,
          created_at AS data_criacao
      FROM protocolos
      WHERE protocolo = ?

      UNION ALL

      SELECT
          id,
          numero_denuncia AS protocolo,
          tipo_denuncia AS tipo,
          status,
          mensagem,
          resposta,
          created_at AS data_criacao
      FROM denuncias
      WHERE numero_denuncia = ?
      `,
      [protocolo, protocolo]
    );

    console.log("Resultado:", rows);

    return NextResponse.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error(error);
  }
}