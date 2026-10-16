"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check, ShieldCheck, Clock } from "lucide-react";
export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "0.00";
  const planName = searchParams.get("plan") || "Assinatura";

  const [pixCode, setPixCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos = 300 segundos
  

  // Timer Countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Buscar PIX da API
  useEffect(() => {
    const fetchPix = async () => {
      try {
        const response = await fetch("/api/checkout/pix", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            description: `Maylon Pass - ${planName}`,
            debtor: { name: "Usuário Atual", document: "12345678909" } // Pegar  os dados do usuário autenticado
          }),
        });
        const data = await response.json();
        if (data.sucesso) {
          setPixCode(data.qrcode); // Código EMV / Copia e Cola
        }
      } catch (error) {
        console.error("Erro ao gerar PIX");
      } finally {
        setLoading(false);
      }
    };
    fetchPix();
  }, [amount, planName]);

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <main className="min-h-screen bg-[#f7faf9] flex items-center justify-center p-4 text-slate-900">
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 w-full max-w-md text-center relative overflow-hidden">
        
        {/* Ícone topo */}
        <div className="mx-auto bg-[#1c5a4b] w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-md">
          <div className="grid grid-cols-2 gap-1">
            <div className="w-2 h-2 bg-white rounded-sm"></div>
            <div className="w-2 h-2 border border-white rounded-sm"></div>
            <div className="w-2 h-2 border border-white rounded-sm"></div>
            <div className="w-2 h-2 bg-white rounded-sm"></div>
          </div>
        </div>

        <h1 className="text-2xl font-black text-slate-900 mb-2">Pagamento via PIX</h1>
        <p className="text-sm text-slate-500 mb-8">
          Escaneie o QR Code com o app do seu banco para pagar
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-[200px] mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#35a989]"></div>
          </div>
        ) : (
          <>
            {/* QR Code Box */}
            <div className="bg-white border-2 border-slate-100 rounded-3xl p-4 inline-block mb-8 shadow-sm">
              <QRCodeSVG 
                value={pixCode || "https://maylon.com.br"} 
                size={200} 
                fgColor="#0f2b23" 
                imageSettings={{
                  src: "/favicon.ico", // Coloque o logo da Maylon aqui
                  x: undefined, y: undefined, height: 40, width: 40, excavate: true,
                }}
              />
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-500 mb-1">Valor da assinatura</p>
              <h2 className="text-4xl font-black text-[#35a989]">
                R$ {Number(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h2>
            </div>

            <p className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-6">
              <ShieldCheck className="w-4 h-4 text-[#35a989]" />
              O pagamento é instantâneo e seguro.
            </p>

            {/* Timer */}
            <div className="bg-[#35a989]/10 text-[#27866c] rounded-xl p-3 flex items-center justify-center gap-2 font-bold mb-6">
              <Clock className="w-4 h-4" />
              Expira em {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>

            {/* Copia e Cola */}
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-500 mb-2 ml-1">Pix Copia e Cola</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={pixCode} 
                  readOnly 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-500 outline-none"
                />
                <button 
                  onClick={handleCopy}
                  className="bg-[#35a989] hover:bg-[#27866c] text-white px-4 py-3 rounded-xl flex items-center justify-center transition-colors shrink-0"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}