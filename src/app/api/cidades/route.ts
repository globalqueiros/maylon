import { NextResponse } from "next/server";
import db from "../../../lib/db";

export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT 
        estado,
        cidade
      FROM cidades_atendidas
      ORDER BY estado ASC, cidade ASC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar cidades" },
      { status: 500 }
    );
  }
}