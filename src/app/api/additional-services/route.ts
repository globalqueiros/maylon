import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { db } from "../../../lib/db";

export const dynamic = "force-dynamic";

type ServiceRow = RowDataPacket & {
  id: number;
  codigo: string;
  nome: string;
  descricao: string | null;
  href: string;
  preco_basico: number | string;
  preco_plus: number | string;
  preco_premium: number | string;
};

export async function GET() {
  try {
    const [rows] = await db.query<ServiceRow[]>(`
      SELECT
        id,
        codigo,
        nome,
        descricao,
        href,
        preco_basico,
        preco_plus,
        preco_premium
      FROM servicos_adicionais_maylon
      WHERE ativo = 1
      ORDER BY id ASC
    `);

    const services = rows.map((row) => ({
      id: row.codigo,
      name: row.nome,
      description: row.descricao ?? "",
      href: row.href,
      prices: {
        basico: Number(row.preco_basico),
        plus: Number(row.preco_plus),
        premium: Number(row.preco_premium),
      },
    }));

    return NextResponse.json(services, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Erro ao carregar serviços adicionais:", error);

    return NextResponse.json(
      { erro: "Não foi possível carregar os serviços adicionais." },
      { status: 500 }
    );
  }
}