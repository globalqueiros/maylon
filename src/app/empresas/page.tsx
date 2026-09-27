"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Car,
  Check,
  ClipboardList,
  Gift,
  Headphones,
  Receipt,
  ShieldCheck,
} from "lucide-react";

const benefits = [
  {
    title: "Personalize seus programas de viagens",
    description:
      "Defina políticas de mobilidade, acompanhe as viagens e tenha controle completo das despesas da sua empresa em uma única plataforma.",
    image: "/gestao.png",
  },
  {
    title: "Adicione seus colaboradores",
    description:
      "Cadastre colaboradores, equipes e usuários da sua empresa para solicitar viagens, acompanhar deslocamentos e controlar despesas.",
    image: "/colaboradores.png",
  },
  {
    title: "Ofereça vouchers para seus clientes",
    description:
      "Envie vouchers corporativos para seus clientes e colaboradores, proporcionando uma experiência prática, segura e personalizada.",
    image: "/voucher.png",
  },
];

const features = [
  { icon: ClipboardList, title: "Centralização de todas as viagens corporativas" },
  { icon: BarChart3, title: "Dashboard com dados em tempo real" },
  { icon: Receipt, title: "Controle e relatórios financeiros automáticos" },
  { icon: Car, title: "Chamadas diretamente pela plataforma" },
  { icon: Gift, title: "Voucher corporativo" },
  { icon: ShieldCheck, title: "Mobilidade com segurança" },
  { icon: Headphones, title: "Atendimento personalizado" },
];

const finalBenefits = [
  "Gestão centralizada",
  "Controle de despesas",
  "Atendimento especializado",
];

export default function HeroEmpresas() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-zinc-950">
      {/* Hero principal */}
      <section className="relative overflow-hidden bg-[#f5fbf9]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#00bfae]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-40 h-[460px] w-[460px] rounded-full bg-[#00bfae]/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-8 lg:px-14 lg:py-14">
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            {/* Conteúdo */}
            <div className="relative z-10 order-1">
              <h1 className="max-w-[1000px] text-[40px] font-black leading-tight text-zinc-950 sm:text-3xl lg:text-4xl">
                Controle total das viagens da sua empresa.
              </h1>

              <p className="my-6 max-w-[650px] text-justify text-sm leading-7 text-zinc-600">
                Centralize corridas, acompanhe despesas em tempo real,
                gerencie colaboradores e tenha relatórios completos em uma
                única plataforma.
              </p>

              <div className="mt-0 grid gap-3 sm:grid-cols-2">
                <HeroBenefit text="Controle de gastos" />
                <HeroBenefit text="Relatórios completos" />
                <HeroBenefit text="Gestão de colaboradores" />
                <HeroBenefit text="Faturamento centralizado" />
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/empresas/cadastro"
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-[#00bfae] px-7 text-sm font-bold text-white shadow-lg shadow-[#00bfae]/20 transition hover:-translate-y-1 hover:bg-[#00a897]"
                >
                  Cadastrar empresa
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/suporte"
                  className="inline-flex h-14 items-center justify-center rounded-2xl border border-zinc-300 bg-white px-7 text-sm font-bold text-zinc-800 transition hover:border-[#00bfae] hover:text-[#00a897]"
                >
                  Falar com especialista
                </Link>
              </div>
            </div>

            {/* Imagem principal */}
            <div className="relative order-2 flex items-center justify-center">
              <div className="absolute -bottom-5 -right-4 h-[90%] w-[92%] rounded-[40px] border border-[#00bfae]/40 sm:-right-6" />

              <div className="relative z-10 w-full max-w-[700px] overflow-hidden rounded-[36px] border border-white bg-white shadow-[0_30px_80px_rgba(15,23,42,0.14)]">
                <Image
                  src="/empresa_maylon.png"
                  alt="Maylon Empresas - Plataforma de gestão corporativa"
                  width={1000}
                  height={700}
                  priority
                  className="h-auto w-full object-contain"
                />
              </div>

              <div className="absolute left-2 top-5 z-20 flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white px-4 py-3 shadow-xl sm:left-5 sm:top-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00bfae] text-white">
                  <BarChart3 size={21} strokeWidth={2.2} />
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-400">
                    Plataforma corporativa
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-zinc-900">
                    Maylon Empresas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soluções */}
      <section className="bg-white py-10 lg:py-10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-16">
          <div className="max-w-[720px]">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#009f8f]">
              Soluções Maylon
            </span>

            <h2 className="my-4 text-3xl font-black text-zinc-950 sm:text-4xl">
              Mobilidade para todos os momentos da sua empresa
            </h2>

            <p className="max-w-[650px] text-base leading-7 text-zinc-600">
              Tenha uma plataforma completa para administrar viagens
              corporativas e oferecer mobilidade para seus colaboradores e
              clientes.
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <UseCase
              image="/cara_olhando.png"
              icon="💼"
              title={
                <>
                  Viagens
                  <br />
                  a trabalho
                </>
              }
              description="Transporte corporativo com segurança, conforto e eficiência para o dia a dia da sua equipe."
              imagePosition="right"
            />

            <UseCase
              image="/casal.png"
              icon="🎁"
              title={
                <>
                  Viagens
                  <br />
                  de cortesia
                </>
              }
              description="Encante clientes e parceiros com uma experiência de transporte premium e personalizada."
              imagePosition="right"
            />
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-[#f7faf9] py-10 lg:py-10 lg:pb-5">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-16">
          <div className="max-w-[720px]">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#009f8f]">
              Benefícios
            </span>

            <h2 className="my-3 text-3xl font-black leading-tight tracking-[-1.2px] text-zinc-950 sm:text-3xl">
              Tudo que sua empresa precisa em um só lugar
            </h2>
          </div>

          <div className="mt-0 max-w-[1120px]">
            {benefits.map((item, index) => (
              <div
                key={item.title}
                className="grid gap-6 border-b border-zinc-200 py-8 last:border-b-0 md:grid-cols-[230px_1px_1fr] md:items-center md:gap-9 md:py-10"
              >
                <div className="relative h-[150px] overflow-hidden rounded-2xl bg-white shadow-sm">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="230px"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="hidden h-full min-h-[150px] bg-zinc-200 md:block">
                  <span className="relative -left-[3px] block h-1.5 w-1.5 rounded-full bg-[#00bfae]" />

                  {index === benefits.length - 1 && (
                    <span className="relative -bottom-[143px] -left-[3px] block h-1.5 w-1.5 rounded-full bg-[#00bfae]" />
                  )}
                </div>

                <div className="max-w-[650px]">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00a897]">
                    0{index + 1}
                  </span>

                  <h3 className="mt-2 text-xl font-bold tracking-[-0.4px] text-zinc-900">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-zinc-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gestão inteligente */}
      <section className="bg-white py-10 lg:py-10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-16">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-[92%] w-[82%] rounded-[40px] border border-[#00bfae]/50 sm:-left-6 sm:-top-6" />

              <div className="relative z-10 overflow-hidden rounded-[36px] bg-zinc-100 shadow-[0_25px_70px_rgba(15,23,42,0.12)]">
                <Image
                  src="/cara_olhando.png"
                  alt="Gestão corporativa Maylon"
                  width={900}
                  height={700}
                  className="h-[420px] w-full object-cover sm:h-[520px] lg:h-[580px]"
                />
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#009f8f]">
                Gestão inteligente
              </span>

              <h2 className="my-4 max-w-[650px] text-3xl font-black leading-[1.08] tracking-[-1.5px] text-zinc-950 sm:text-3xl lg:text-3xl">
                Uma solução completa para a gestão corporativa.
              </h2>

              <p className="mt-0 max-w-[600px] text-sm text-justify leading-7 text-zinc-600">
                Simplifique a mobilidade da sua empresa com tecnologia,
                segurança, controle financeiro e uma experiência completa para
                seus colaboradores.
              </p>

              <div className="mt-5 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="flex items-start gap-3.5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e5f8f4] text-[#009f8f]">
                        <Icon size={20} strokeWidth={2.2} />
                      </div>

                      <p className="pt-1 text-sm font-semibold leading-6 text-zinc-800">
                        {feature.title}
                      </p>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/empresas"
                className="group mt-10 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#00bfae] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#009f8f]"
              >
                Conheça a Maylon Empresas
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroBenefit({ text }: { text: string }) {
  return (
    <div className="flex min-h-[50px] items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white px-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00bfae]/40 hover:shadow-md">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e5f8f4] text-[#00a897]">
        <Check size={14} strokeWidth={3} />
      </span>

      <span className="text-sm font-semibold text-zinc-700">{text}</span>
    </div>
  );
}

function UseCase({
  image,
  icon,
  title,
  description,
  imagePosition = "right",
}: {
  image: string;
  icon: string;
  title: ReactNode;
  description: string;
  imagePosition?: "left" | "right";
}) {
  return (
    <div className="group relative h-[330px] w-full overflow-hidden rounded-[30px] border border-zinc-200 bg-[#f3faf7] shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)]">
      <div className="grid h-full grid-cols-2">
        {/* Conteúdo */}
        <div
          className={`relative z-30 flex flex-col justify-center px-5 py-7 sm:px-8 ${
            imagePosition === "left" ? "order-2" : "order-1"
          }`}
        >
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#009f8f] text-xl text-white shadow-lg shadow-[#009f8f]/20">
            {icon}
          </div>

          <h3 className="text-xl font-black leading-[1.05] tracking-[-0.8px] text-[#15232a] sm:text-2xl">
            {title}
          </h3>

          <p className="mt-4 text-justify text-sm leading-6 text-zinc-600">
            {description}
          </p>
        </div>

        {/* Imagem + faixas */}
        <div
          className={`relative h-full overflow-hidden bg-[#edf8f4] ${
            imagePosition === "left" ? "order-1" : "order-2"
          }`}
        >
          <Image
            src={image}
            alt="Viagem corporativa Maylon"
            fill
            sizes="(max-width: 1024px) 50vw, 600px"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />

          {/* Faixa cinza — desliza primeiro */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-[#d1d5db] transition-transform duration-700 ease-out group-hover:-translate-x-3"
            style={{
              clipPath:
                "polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%)",
            }}
          />

          {/* Faixa verde — acompanha a cinza */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-14 bg-[#009f8f] transition-transform duration-700 ease-out group-hover:-translate-x-1"
            style={{
              clipPath:
                "polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}