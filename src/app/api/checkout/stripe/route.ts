// src/app/api/checkout/stripe/route.ts
import { NextResponse } from 'next/server';
import { criarPaymentIntent } from '../../../../lib/stripeService';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Chama a função nova que retorna o clientSecret
    const result = await criarPaymentIntent(body);

    if (result.sucesso && result.clientSecret) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { erro: result.erro, detalhes: result.detalhes },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { erro: 'Erro interno', detalhes: error.message },
      { status: 500 }
    );
  }
}