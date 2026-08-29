import { NextResponse } from "next/server";
import db from "../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      empresa,
      cnpj,
      responsavel,
      cargo,
      email,
      telefone,
      cidade,
      estado,
      tipoAnuncio,
      quantidadeVeiculos,
      orcamento,
      mensagem,
    } = body;

    // Campos obrigatórios
    if (
      !empresa ||
      !cnpj ||
      !responsavel ||
      !email ||
      !telefone ||
      !cidade ||
      !estado
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Preencha todos os campos obrigatórios.",
        },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      `
        INSERT INTO solicitacoes_especialista (
          nome_empresa,
          cnpj,
          nome_responsavel,
          cargo,
          email,
          telefone,
          cidade,
          estado,
          tipo_anuncio,
          quantidade_veiculos,
          orcamento,
          mensagem,
          status,
          created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `,
      [
        String(empresa).trim(),
        String(cnpj).trim(),
        String(responsavel).trim(),

        cargo
          ? String(cargo).trim()
          : null,

        String(email)
          .trim()
          .toLowerCase(),

        String(telefone).trim(),

        String(cidade).trim(),

        String(estado).trim(),

        tipoAnuncio
          ? String(tipoAnuncio).trim()
          : null,

        quantidadeVeiculos
          ? Number(quantidadeVeiculos)
          : null,

        orcamento
          ? String(orcamento).trim()
          : null,

        mensagem
          ? String(mensagem).trim()
          : null,

        "pendente",
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Solicitação enviada com sucesso.",
        id: (result as any).insertId,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error(
      "ERRO API /api/especialista:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.sqlMessage ||
          error?.message ||
          "Erro interno ao salvar a solicitação.",
      },
      { status: 500 }
    );
  }
}