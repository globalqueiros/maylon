import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { db } from "../../../lib/db";

export const dynamic = "force-dynamic";

type PlanoRow = RowDataPacket & {
  id: number;
  nome: string;
  descricaoone: string | null;
  descricao: string | null;
  preco: number | string;
  ativo: number | boolean;
};

type PlanId = "basico" | "plus" | "premium";

function getPlanId(nome: string): PlanId | null {
  const nomeNormalizado = nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (nomeNormalizado.includes("basico")) return "basico";
  if (nomeNormalizado.includes("premium")) return "premium";
  if (nomeNormalizado.includes("plus")) return "plus";

  return null;
}

function parseBenefits(descricao: string | null): string[] {
  if (!descricao) return [];

  return descricao
    .split(/\r?\n/)
    .map((item) =>
      item
        .replace(/^[\s✓✔☑•\-]+/, "")
        .replace(/\.\.\.$/, "")
        .trim()
    )
    .filter(Boolean);
}

export async function GET() {
  try {
    const [rows] = await db.query<PlanoRow[]>(`
      SELECT
        id,
        nome,
        descricaoone,
        descricao,
        preco,
        ativo
      FROM produtos_maylon
      WHERE ativo = 1
      ORDER BY id ASC
    `);

    const plans = rows
      .map((row) => {
        const id = getPlanId(row.nome);
        const price = Number(row.preco);

        if (!id || !Number.isFinite(price) || price < 0) {
          return null;
        }

        return {
          id,
          name: row.nome,
          price,
          description: row.descricaoone ?? "",
          benefits: parseBenefits(row.descricao),
        };
      })
      .filter((plan) => plan !== null);

    return NextResponse.json(plans, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Erro ao buscar planos Maylon:", error);

    return NextResponse.json(
      { erro: "Não foi possível carregar os planos." },
      { status: 500 }
    );
  }
}