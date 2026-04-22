"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function SuportePage() {
    const [search, setSearch] = useState("");

    const faq = [
        {
            pergunta: "Como solicitar uma corrida?",
            resposta: "Abra o app, escolha o destino e confirme a corrida.",
        },
        {
            pergunta: "Como me tornar motorista?",
            resposta: "Clique em 'Quero ser motorista' e envie seus documentos.",
        },
        {
            pergunta: "Formas de pagamento",
            resposta: "Aceitamos cartão, PIX e dinheiro.",
        },
    ];

    const filteredFaq = faq.filter((item) =>
        item.pergunta.toLowerCase().includes(search.toLowerCase())
    );

    // ✅ Abre o chat SOMENTE na página de suporte
    useEffect(() => {
        const opened = sessionStorage.getItem("huggy_opened");

        if (opened) return;

        let tentativas = 0;

        const intervalo = setInterval(() => {
            const huggy = (window as any).pwz;

            console.log("Tentando abrir chat...", huggy);

            if (huggy && typeof huggy.open === "function") {
                huggy.open();
                sessionStorage.setItem("huggy_opened", "true");
                clearInterval(intervalo);
            }

            tentativas++;
            if (tentativas > 30) {
                console.log("Huggy não carregou");
                clearInterval(intervalo);
            }
        }, 500);

        return () => clearInterval(intervalo);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* HEADER */}
            <div className="bg-[#3bab88] text-white py-16 text-center">
                <h1 className="text-4xl font-bold">Central de Suporte</h1>
                <p className="mt-2 text-lg opacity-90">
                    Como podemos te ajudar hoje?
                </p>

                {/* BUSCA */}
                <div className="mt-6 flex justify-center">
                    <div className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-xl">
                        <Search className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar ajuda..."
                            className="w-full px-3 outline-none text-black"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* CATEGORIAS */}
            <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
                {["Motoristas", "Passageiros", "Pagamentos"].map((cat) => (
                    <div
                        key={cat}
                        className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
                    >
                        <h3 className="text-xl font-semibold">{cat}</h3>
                        <p className="text-gray-500 mt-2">
                            Veja dúvidas frequentes sobre {cat.toLowerCase()}
                        </p>
                    </div>
                ))}
            </div>

            {/* FAQ */}
            <div className="max-w-4xl mx-auto px-6 pb-16">
                <h2 className="text-2xl font-bold mb-6">Perguntas frequentes</h2>

                <div className="space-y-4">
                    {filteredFaq.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-5 rounded-xl shadow"
                        >
                            <h3 className="font-semibold">{item.pergunta}</h3>
                            <p className="text-gray-600 mt-2">{item.resposta}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CONTATO */}
            <div className="bg-white border-t py-12 text-center">
                <h2 className="text-2xl font-bold">Ainda precisa de ajuda?</h2>
                <p className="text-gray-500 mt-2">
                    Nosso time está pronto para te atender
                </p>

                <div className="mt-6 flex justify-center gap-4">
                    <button
                        onClick={() => {
                            const huggy = (window as any).pwz;
                            if (huggy?.open) {
                                huggy.open();
                            }
                        }}
                        className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700"
                    >
                        Fale conosco
                    </button>

                    <button className="border px-6 py-3 rounded-full hover:bg-gray-100">
                        WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
}