"use client";
import { stripePromise } from "@/lib/stripe";

export default function Pagamento() {
  const handlePagamento = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe não foi carregado.");
      return;
    }

    console.log("Stripe carregado!");
  };

  return (
    <button onClick={handlePagamento}>
      Pagar
    </button>
  );
}