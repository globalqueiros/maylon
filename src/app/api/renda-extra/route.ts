import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const nome = String(body?.nome || "").trim();
    const telefone = String(body?.telefone || "").trim();
    const produto = String(body?.produto || "").trim();
    const observacoes = String(body?.observacoes || "").trim();

    if (!nome) {
      return NextResponse.json(
        {
          success: false,
          message: "O nome é obrigatório.",
        },
        { status: 400 }
      );
    }

    if (!telefone) {
      return NextResponse.json(
        {
          success: false,
          message: "O telefone é obrigatório.",
        },
        { status: 400 }
      );
    }

    if (!produto) {
      return NextResponse.json(
        {
          success: false,
          message: "Selecione o produto que deseja vender.",
        },
        { status: 400 }
      );
    }

    const telefoneNumeros = telefone.replace(/\D/g, "");

    if (telefoneNumeros.length !== 11) {
      return NextResponse.json(
        {
          success: false,
          message: "Informe um telefone celular válido com DDD.",
        },
        { status: 400 }
      );
    }

    /*
     * Cria a tabela automaticamente caso ainda não exista.
     *
     * Assim você não precisa criar a tabela manualmente no MySQL.
     */
    await db.query(`
      CREATE TABLE IF NOT EXISTS renda_extra (
        id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        telefone VARCHAR(30) NOT NULL,
        produto VARCHAR(100) NOT NULL,
        observacoes TEXT NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'pendente',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB
      DEFAULT CHARSET=utf8mb4
      COLLATE=utf8mb4_unicode_ci;
    `);

    /*
     * Salva o telefone somente com números.
     *
     * Exemplo:
     * (11) 98765-4321
     *
     * fica:
     * 11987654321
     */
    await db.query(
      `
        INSERT INTO renda_extra
        (
          nome,
          telefone,
          produto,
          observacoes,
          status
        )
        VALUES (?, ?, ?, ?, 'pendente')
      `,
      [
        nome,
        telefoneNumeros,
        produto,
        observacoes || null,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Cadastro de renda extra enviado com sucesso.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ERRO API /api/renda-extra:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Erro interno ao cadastrar renda extra.",
      },
      { status: 500 }
    );
  }
}