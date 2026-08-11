"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronUp, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Cidade = {
  estado: string;
  cidade: string;
};

export default function Page() {
  const [dados, setDados] = useState<Cidade[]>([]);
  const [busca, setBusca] = useState("");
  const [aberto, setAberto] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const response = await fetch("/api/cidades");
        const data = await response.json();
        console.log(data);
        setDados(data);
      } catch (error) {
        console.error("Erro ao carregar cidades:", error);
      }
    }

    carregar();
  }, []);

  const estadosAgrupados = useMemo(() => {
    const agrupado: Record<string, string[]> = {};
    if (!Array.isArray(dados)) {
      return agrupado;
    }
    dados.forEach((item) => {
      if (!agrupado[item.estado]) {
        agrupado[item.estado] = [];
      }
      agrupado[item.estado].push(item.cidade);
    });
    return agrupado;
  }, [dados]);

  const estadosFiltrados = useMemo(() => {
    return Object.entries(estadosAgrupados)
      .map(([estado, cidades]) => {
        const termo = busca.toLowerCase();
        const cidadesFiltradas = cidades.filter((cidade) =>
          cidade.toLowerCase().includes(termo)
        );
        const estadoEncontrado = estado
          .toLowerCase()
          .includes(termo);
        return [
          estado,
          estadoEncontrado
            ? cidades
            : cidadesFiltradas,
        ];
      })
      .filter(
        ([, cidades]) =>
          (cidades as string[]).length > 0
      ) as [string, string[]][];
  }, [estadosAgrupados, busca]);

  useEffect(() => {
    if (!busca) {
      setAberto(null);
      return;
    }
    if (estadosFiltrados.length > 0) {
      setAberto(estadosFiltrados[0][0]);
    }
  }, [busca, estadosFiltrados]);

  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/bg-cidades.png"
            alt="Background cidades"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-emerald-600/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[400px] md:min-h-[400px] lg:min-h-[530px] grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 items-center gap-8 md:gap-10">
            <div className="z-10 w-full py-12 md:py-16 lg:py-20">
              <h2 className="w-full text-3xl sm:text-5xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                Confira as cidades atendidas pela Maylon
              </h2>
              <p className="mt-4 w-full text-base lg:text-lg leading-relaxed text-white/90">
                Mobilidade urbana moderna, rápida e segura para você viajar com mais
                conforto em diversas cidades.
              </p>
            </div>
            <div className="hidden lg:flex relative items-end justify-end">
              <div className="relative h-[500px] lg:h-[529px] w-full max-w-[520px]">
                <Image
                  src="/casal-maylon.png"
                  alt="Clientes usando Maylon"
                  fill
                  priority
                  className="object-contain object-bottom"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="w-full bg-[#f5f5f5] py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="relative mb-8 max-w-xl">
            <input
              type="text"
              placeholder="Buscar por estado ou cidade..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-white
                px-5
                pr-14
                text-sm
                text-gray-700
                shadow-sm
                outline-none
                transition
                focus:border-emerald-500
                focus:ring-2
                focus:ring-emerald-200
              "
            />
            {busca ? (
              <button
                onClick={() => setBusca("")}
                className="
                  absolute
                  right-5
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  transition
                  hover:text-red-500
                  cursor-pointer
                "
              >
                <X size={18} />
              </button>
            ) : (
              <Search
                size={18}
                className="
                  absolute
                  right-5
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              />
            )}
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {estadosFiltrados.map(([estado, cidades]) => {
              const isOpen = aberto === estado;
              return (
                <div
                  key={estado}
                  className="
                    overflow-hidden
                    rounded-3xl
                    bg-white
                    shadow-sm
                    transition-all
                    duration-300
                  "
                >
                  <button
                    onClick={() =>
                      setAberto(isOpen ? null : estado)
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      px-7
                      py-4
                      text-left
                      cursor-pointer
                    "
                  >
                    <h3 className="text-lg font-semibold text-black">
                      {estado}
                    </h3>
                    <motion.div
                      animate={{
                        rotate: isOpen ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      <ChevronUp
                        size={22}
                        className="text-gray-400"
                      />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-y-5 px-8 pb-8 md:grid-cols-2">
                          {cidades.map((cidade) => (
                            <span
                              key={cidade}
                              className="
                                text-base
                                font-medium
                                text-teal-500
                                transition
                                hover:text-teal-600
                                cursor-default
                              "
                            >
                              {cidade}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}