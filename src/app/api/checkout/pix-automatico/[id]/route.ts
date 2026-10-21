// src/app/api/checkout/pix-automatico/[id]/route.ts
// Consultado pelo checkout a cada poucos segundos (polling).
// Fonte principal: o banco local, atualizado pelo webhook do BTG.
// Fallback: se o webhook ainda não chegou, consulta o BTG diretamente (no máx. a cada 15s).

import { NextResponse } from "next/server";
import { consultarAutorizacao } from "../../../../../lib/pixAutomatico/btgPixAutomatico";
import {
  aplicarStatusBTG,
  buscarAssinatura,
  marcarSincronizada,
} from "../../../../../lib/pixAutomatico/assinaturas";
import { agendarAssinatura } from "../../../../../lib/pixAutomatico/agendamentos";

export const dynamic = "force-dynamic";

const INTERVALO_SYNC_SEG = 15;
const EXPIRA_PENDENTE_MIN = Number(process.env.PIX_AUTOMATICO_EXPIRACAO_MIN || 30);

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!UUID.test(id)) return NextResponse.json({ erro: "Não encontrado" }, { status: 404 });

  let assinatura = await buscarAssinatura(id);
  if (!assinatura) return NextResponse.json({ erro: "Não encontrado" }, { status: 404 });

  if (assinatura.status === "PENDING") {
    const precisaSincronizar =
      assinatura.seg_desde_sync == null || Number(assinatura.seg_desde_sync) > INTERVALO_SYNC_SEG;

    // Fallback do webhook: pergunta direto ao BTG
    if (assinatura.btg_authorization_id && precisaSincronizar) {
      try {
        await marcarSincronizada(id);
        const remota = await consultarAutorizacao({
          authorizationId: assinatura.btg_authorization_id,
          externalId: assinatura.id,
        });
        if (remota) {
          const novo = await aplicarStatusBTG(assinatura, remota.status);
          if (novo === "ACTIVE") {
            const atualizada = await buscarAssinatura(id);
            if (atualizada) await agendarAssinatura(atualizada).catch(console.error);
          }
          assinatura = (await buscarAssinatura(id))!;
        }
      } catch (e) {
        console.warn("⚠️ [Pix Automático] Fallback de consulta ao BTG falhou:", (e as Error)?.message);
      }
    }

    // QR Code abandonado
    if (assinatura.status === "PENDING" && Number(assinatura.idade_seg) > EXPIRA_PENDENTE_MIN * 60) {
      await aplicarStatusBTG(assinatura, "EXPIRED");
      assinatura = (await buscarAssinatura(id))!;
    }
  }

  const pendente = assinatura.status === "PENDING";
  const segundosRestantes = pendente
    ? Math.max(0, EXPIRA_PENDENTE_MIN * 60 - Number(assinatura.idade_seg || 0))
    : 0;

  return NextResponse.json(
    {
      status: assinatura.status,
      plano: assinatura.plano_nome,
      valorMensal: Number(assinatura.valor),
      proximaCobranca: assinatura.proximo_debito ?? assinatura.proxima_cobranca,
      // O QR só é devolvido enquanto faz sentido exibi-lo
      emv: pendente ? assinatura.emv : null,
      qrCodeUrl: pendente ? assinatura.qrcode_url : null,
      segundosRestantes,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
