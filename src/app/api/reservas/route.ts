import { NextResponse } from "next/server";
import { randomInt } from "crypto";
import { db } from "../../../lib/db";

function gerarProtocolo(): string {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  const numero = String(randomInt(100000, 1000000));

  return `MAY-${ano}${mes}${dia}-${numero}`;
}

function normalizarBooleano(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value === 1;
  }

  if (typeof value === "string") {
    return ["true", "1", "sim", "yes"].includes(
      value.trim().toLowerCase()
    );
  }

  return false;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      user_id,
      name,
      phone,
      origin,
      destination,
      date,
      time,
      returnDate,
      returnTime,
      observations,
      vehicle,
      vehicle_name,
      passengers,
      round_trip,
    } = body;

    const nome = typeof name === "string" ? name.trim() : "";
    const telefone = typeof phone === "string" ? phone.trim() : "";
    const origem = typeof origin === "string" ? origin.trim() : "";
    const destino = typeof destination === "string" ? destination.trim() : "";
    const observacoes =
      typeof observations === "string"
        ? observations.trim()
        : null;

    if (!nome) {
      return NextResponse.json(
        {
          success: false,
          message: "Informe seu nome completo.",
        },
        { status: 400 }
      );
    }

    if (!telefone) {
      return NextResponse.json(
        {
          success: false,
          message: "Informe seu telefone ou WhatsApp.",
        },
        { status: 400 }
      );
    }

    if (!origem) {
      return NextResponse.json(
        {
          success: false,
          message: "Informe o local de embarque.",
        },
        { status: 400 }
      );
    }

    if (!destino) {
      return NextResponse.json(
        {
          success: false,
          message: "Informe o destino.",
        },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          message: "Informe a data da viagem.",
        },
        { status: 400 }
      );
    }

    if (!time) {
      return NextResponse.json(
        {
          success: false,
          message: "Informe o horário da viagem.",
        },
        { status: 400 }
      );
    }

    const quantidadePassageiros = Number(passengers);

    if (
      !Number.isInteger(quantidadePassageiros) ||
      quantidadePassageiros < 1 ||
      quantidadePassageiros > 15
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A quantidade de passageiros deve estar entre 1 e 15.",
        },
        { status: 400 }
      );
    }

    const idaVolta = normalizarBooleano(round_trip);

    const dataRetorno =
      idaVolta && returnDate
        ? String(returnDate)
        : null;

    const horaRetorno =
      idaVolta && returnTime
        ? String(returnTime)
        : null;

    if (idaVolta && (!dataRetorno || !horaRetorno)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Informe a data e o horário do retorno.",
        },
        { status: 400 }
      );
    }

    const veiculo =
      typeof vehicle === "string" && vehicle.trim()
        ? vehicle.trim()
        : "carro";

    const nomeVeiculo =
      typeof vehicle_name === "string" &&
      vehicle_name.trim()
        ? vehicle_name.trim()
        : "Carro";

    const usuarioId =
      user_id !== undefined &&
      user_id !== null &&
      String(user_id).trim() !== ""
        ? Number(user_id)
        : null;

    if (
      usuarioId !== null &&
      (!Number.isInteger(usuarioId) || usuarioId <= 0)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Usuário inválido.",
        },
        { status: 400 }
      );
    }

    let protocolo = gerarProtocolo();
    let protocoloDisponivel = false;

    for (let tentativa = 0; tentativa < 10; tentativa++) {
      const [existente] = await db.query(
        `
        SELECT id
        FROM reservas_viagens
        WHERE protocolo = ?
        LIMIT 1
        `,
        [protocolo]
      );

      if (!(existente as unknown[]).length) {
        protocoloDisponivel = true;
        break;
      }

      protocolo = gerarProtocolo();
    }

    if (!protocoloDisponivel) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Não foi possível gerar um protocolo para a reserva.",
        },
        { status: 500 }
      );
    }

    const [result] = await db.execute(
      `
      INSERT INTO reservas_viagens (
        protocolo,
        user_id,
        nome,
        telefone,
        veiculo,
        veiculo_nome,
        passageiros,
        ida_e_volta,
        origem,
        destino,
        data_viagem,
        horario_viagem,
        data_retorno,
        horario_retorno,
        observacoes,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        protocolo,
        usuarioId,
        nome,
        telefone,
        veiculo,
        nomeVeiculo,
        quantidadePassageiros,
        idaVolta ? 1 : 0,
        origem,
        destino,
        date,
        time,
        dataRetorno,
        horaRetorno,
        observacoes || null,
        "pendente",
      ]
    );

    const insertResult = result as {
      insertId: number;
    };

    return NextResponse.json(
      {
        success: true,
        message:
          "Solicitação de reserva registrada com sucesso.",
        protocolo,
        reserva: {
          id: insertResult.insertId,
          protocolo,
          status: "pendente",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Erro ao criar reserva de viagem:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Não foi possível salvar a solicitação da reserva.",
        error:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 }
    );
  }
}