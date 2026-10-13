// src/app/api/checkout/stripe/route.ts
import { NextResponse } from 'next/server';
import { gerarPagtoStripe } from '../../../../lib/stripeService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await gerarPagtoStripe(body);

    if (result.sucesso && result.url) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { erro: result.erro, detalhes: result.detalhes },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { erro: 'Erro interno ao processar pagamento com cartão', detalhes: error.message },
      { status: 500 }
    );
  }
}