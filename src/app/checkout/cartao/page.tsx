// src/app/checkout/cartao/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import ContainerCartao from "../FormularioCartao"; 
import { Suspense } from "react";
export const dynamic = "force-dynamic";

function CheckoutCartaoContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "0.00";
  const planName = searchParams.get("plan") || "Assinatura";

  // Monta o objeto com os dados que o seu backend precisa para criar o PaymentIntent
  const dadosAssinatura = {
    valor: Number(amount),
    plano: planName,
    email: "cliente@maylon.com.br" // Pode pegar do utilizador logado no futuro
  };

  return (
    <main className="min-h-screen bg-[#f7faf9] flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 w-full max-w-md">
        <h1 className="text-2xl font-black text-slate-900 mb-2 text-center">Pagamento Seguro</h1>
        <p className="text-sm text-slate-500 mb-8 text-center">
          Insira os dados do seu cartão para assinar o Maylon Pass {planName}.
        </p>

        {/* Aqui renderizamos o formulário transparente do Stripe */}
        <ContainerCartao dadosAssinatura={dadosAssinatura} />
      </div>
    </main>
  );
}

export default function CheckoutCartaoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando ambiente seguro...</div>}>
      <CheckoutCartaoContent />
    </Suspense>
  );
}