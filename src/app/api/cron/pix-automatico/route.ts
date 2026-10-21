// src/app/api/cron/pix-automatico/route.ts
// Job diário do Pix recorrente. Rode 1x por dia (ex.: 08:00 de Brasília).
//
// Vercel: vercel.json → { "crons": [{ "path": "/api/cron/pix-automatico", "schedule": "0 11 * * *" }] }
//   (a Vercel envia automaticamente "Authorization: Bearer <CRON_SECRET>")
// Servidor próprio (crontab):
//   0 8 * * * curl -s -H "Authorization: Bearer $CRON_SECRET" https://SEU_DOMINIO/api/cron/pix-automatico

import { NextResponse } from "next/server";
import { agendarCobrancasPendentes } from "../../../../lib/pixAutomatico/agendamentos";
import { expirarPendentesAntigas } from "../../../../lib/pixAutomatico/assinaturas";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  await expirarPendentesAntigas(Number(process.env.PIX_AUTOMATICO_EXPIRACAO_MIN || 30));
  const resultados = await agendarCobrancasPendentes();

  const resumo = resultados.reduce<Record<string, number>>((acc, r) => {
    acc[r.resultado] = (acc[r.resultado] || 0) + 1;
    return acc;
  }, {});

  console.log("🗓️ [Pix Automático] Job de agendamento:", resumo);
  return NextResponse.json({ ok: true, resumo, resultados });
}
