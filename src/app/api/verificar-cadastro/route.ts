import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

function normalizePhone(phone: unknown) {
  let value = String(phone || "").replace(/\D/g, "");

  if (value.startsWith("55") && value.length >= 12) {
    value = value.slice(2);
  }

  return value;
}

function normalizeName(name: unknown) {
  return String(name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const nome = String(body?.nome || "").trim();
    const telefone = normalizePhone(body?.telefone);

    if (!nome) {
      return NextResponse.json(
        {
          success: false,
          registered: false,
          message: "Digite seu nome completo.",
        },
        { status: 400 }
      );
    }

    if (!telefone) {
      return NextResponse.json(
        {
          success: false,
          registered: false,
          message: "Digite seu telefone.",
        },
        { status: 400 }
      );
    }

    if (telefone.length < 10 || telefone.length > 11) {
      return NextResponse.json(
        {
          success: false,
          registered: false,
          message: "Digite um telefone válido.",
        },
        { status: 400 }
      );
    }

    const [rows]: any = await db.query(`
      SELECT
        id,
        full_name,
        phone
      FROM users
    `);

    if (!rows || rows.length === 0) {
      return NextResponse.json({
        success: true,
        registered: false,
        user: null,
      });
    }

    const typedName = normalizeName(nome);

    const user = rows.find((item: any) => {
      const databasePhone = normalizePhone(item.phone);

      if (!databasePhone || databasePhone !== telefone) {
        return false;
      }

      const registeredName = normalizeName(item.full_name);

      if (!registeredName) {
        return false;
      }

      const firstNameTyped = typedName.split(" ")[0];
      const firstNameRegistered = registeredName.split(" ")[0];

      return (
        typedName === registeredName ||
        registeredName.includes(typedName) ||
        typedName.includes(registeredName) ||
        firstNameTyped === firstNameRegistered
      );
    });

    if (!user) {
      return NextResponse.json({
        success: true,
        registered: false,
        user: null,
      });
    }

    return NextResponse.json({
      success: true,
      registered: true,
      user: {
        id: user.id,
        nome_completo: user.full_name,
        telefone: user.phone,
      },
    });
  } catch (error) {
    console.error("Erro ao verificar cadastro:", error);

    return NextResponse.json(
      {
        success: false,
        registered: false,
        message:
          "Não foi possível verificar seu cadastro. Tente novamente.",
      },
      { status: 500 }
    );
  }
}