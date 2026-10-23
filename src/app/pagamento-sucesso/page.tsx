import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PagamentoSucessoPage() {
  return (
    <main className="min-h-screen bg-[#f7faf9] flex items-center justify-center p-4 text-slate-900">
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 w-full max-w-md text-center">
        
        {/* Ícone de Sucesso animado */}
        <div className="mx-auto bg-[#35a989]/10 w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-[#35a989]" />
        </div>

        <h1 className="text-2xl font-black text-slate-900 mb-3">
          Pagamento Confirmado!
        </h1>
        
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Sua transação foi aprovada com sucesso. Bem-vindo(a) ao 
          <strong className="text-[#35a989] font-bold"> Maylon Pass</strong>! 
          Agora você já pode aproveitar todos os benefícios e vantagens exclusivas do seu plano.
        </p>

        <Link
          href="/"
          className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#35a989] px-5 py-4 font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-lg"
        >
          <span>Ir para o meu painel</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </main>
  );
}