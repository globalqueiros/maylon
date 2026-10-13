// src/lib/stripeService.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface StripePaymentParams {
  nome?: string;
  email?: string;
  valor: number;
  plano: string;
  servicos?: string[];
  idUsuario?: string | number;
}

export async function gerarPagtoStripe({
  nome = 'Cliente Maylon',
  email,
  valor,
  plano,
  servicos = [],
  idUsuario = 'visitante',
}: StripePaymentParams) {
  console.log(`Gerando pagamento Stripe para ${nome} | Valor: R$ ${valor}`);

  try {
    // Conversão segura para centavos (Inteiro)
    const unitAmount = Math.round(Number(valor) * 100);

    const descricaoServicos =
      servicos.length > 0 ? ` + Adicionais (${servicos.join(', ')})` : '';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      ...(email ? { customer_email: email } : {}),
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `Maylon Pass - Plano ${plano}`,
              description: `Assinatura Maylon Pass (${plano})${descricaoServicos}`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment', // Se quiser cobrança recorrente automática do Stripe no futuro, basta usar 'subscription'
      success_url: 'https://auth.maylon.com.br/pagamento-sucesso',
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/maylon_pass`,
      metadata: {
        idUsuario: String(idUsuario),
        plano: String(plano),
        servicosAdicionais: servicos.join(','),
      },
    });

    console.log('Sessão Stripe gerada com sucesso:', session.id);
    return {
      sucesso: true,
      url: session.url, // URL da página de checkout hospedada pelo Stripe
      sessionId: session.id,
    };
  } catch (error: any) {
    console.error('Erro no Stripe Service:', error.message);
    return {
      sucesso: false,
      erro: 'Falha ao gerar sessão no Stripe',
      detalhes: error.message,
    };
  }
}