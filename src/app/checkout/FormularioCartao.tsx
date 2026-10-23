"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Carrega a chave PÚBLICA do .env
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

function CheckoutForm({ clientSecret, valor }: { clientSecret: string; valor: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage("");

    // Confirma o pagamento e redireciona em caso de sucesso
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url:`${window.location.origin}/pagamento-sucesso`,//"https://auth.maylon.com.br/pagamento-sucesso",
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "Ocorreu um erro desconhecido.");
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}
      
      <button
        disabled={isProcessing || !stripe || !elements}
        className="w-full cursor-pointer bg-[#35a989] text-white py-4 rounded-2xl font-bold hover:brightness-95 disabled:opacity-50"
      >
        {isProcessing ? "Processando..." : `Pagar R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
      </button>
    </form>
  );
}


export default function ContainerCartao({ dadosAssinatura }: { dadosAssinatura: any }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Busca o secret do backend ao abrir a opção de cartão
    fetch("/api/checkout/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosAssinatura),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) setClientSecret(data.clientSecret);
      });
  }, [dadosAssinatura]);

  if (!clientSecret) {
    return <div className="text-center text-slate-500 text-sm">Carregando ambiente seguro...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
      <CheckoutForm clientSecret={clientSecret} valor={dadosAssinatura.valor} />
    </Elements>
  );
}