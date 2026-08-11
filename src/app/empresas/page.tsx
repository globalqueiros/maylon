import Image from "next/image";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";

export default function HeroEmpresas() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-teal-50 to-emerald-50 py-10 lg:py-14">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-teal-400/10 blur-[150px]" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-400/10 blur-[150px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-[620px]">
                <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-[50px] border-2 border-teal-400" />
                <div className="relative overflow-hidden rounded-[50px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
                  <Image
                    src="/empresa_maylon.png"
                    alt="Maylon Empresas"
                    width={800}
                    height={700}
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute left-6 top-6 rounded-2xl bg-white px-5 py-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500 text-white">
                      <Building2 size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-500">
                        Plataforma Corporativa
                      </p>
                      <h3 className="font-bold text-zinc-900">
                        Maylon Empresas
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-5 py-2 text-sm font-semibold text-teal-700">
                🚀 Mobilidade Corporativa Inteligente
              </span>
              <h1 className="mt-4 text-5xl font-black leading-tight text-zinc-900 lg:text-4xl">
                Controle total das viagens da sua empresa.
              </h1>
              <p className="my-6 max-w-xl text-base text-justify leading-8 text-zinc-600">
                Centralize corridas, acompanhe despesas em tempo real,
                gerencie colaboradores e tenha relatórios completos em
                uma única plataforma.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 text-sm">
                {[
                  "Controle de gastos",
                  "Relatórios completos",
                  "Gestão de colaboradores",
                  "Faturamento centralizado",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm"
                  >
                    <div className="h-3 w-3 rounded-full bg-teal-500" />
                    <span className="font-medium text-zinc-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/empresas/cadastro"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-teal-500 px-7 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-teal-600"
                >
                  Cadastrar empresa
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/suporte"
                  className="inline-flex h-14 items-center justify-center rounded-2xl border border-zinc-300 bg-white px-7 text-sm font-semibold text-zinc-700 transition-all hover:border-teal-500 hover:text-teal-600"
                >
                  Falar com especialista
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}