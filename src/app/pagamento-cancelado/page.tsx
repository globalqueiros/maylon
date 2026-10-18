import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

export default function PagamentoCanceladoPage() {
  return (
    <main className="min-h-screen bg-[#f7faf9] flex items-center justify-center p-4 text-slate-900">
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 w-full max-w-md text-center">
        
        {/* Ícone de Cancelamento/Erro */}
        <div className="mx-auto bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-10 h-10 text-red-500" />
        </div>

        <h1 className="text-2xl font-black text-slate-900 mb-3">
          Pagamento Cancelado
        </h1>
        
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          A sua transação não foi concluída e <strong>nenhuma cobrança foi efetuada</strong>. 
          Se você teve algum problema com o cartão, tente novamente ou escolha outra forma de pagamento.
        </p>

        <Link
          href="/maylon_pass"
          className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 font-bold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
        >
          <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Tentar novamente</span>
        </Link>
      </div>
    </main>
  );
}