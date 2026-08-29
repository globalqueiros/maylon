"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  ArrowRight,
  BarChart3,
  Car,
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
  {
    icon: ClipboardList,
    title: "Centralização de todas as viagens corporativas",
  },
  {
    icon: BarChart3,
    title: "Dashboard com dados em tempo real",
  },
  {
    icon: Receipt,
    title: "Controle e relatórios financeiros automáticos",
  },
  {
    icon: Car,
    title: "Chamadas diretamente pela plataforma",
  },
  {
    icon: Gift,
    title: "Voucher corporativo",
  },
  {
    icon: ShieldCheck,
    title: "Mobilidade com segurança",
  },
  {
    icon: Headphones,
    title: "Atendimento personalizado",
  },
];

export default function HeroEmpresas() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-zinc-950">
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#f4fffd] to-[#dffaf5]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00bfae]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#00bfae]/10 blur-3xl" />
        <div className="relative mx-auto max-w-[1440px] px-6 py-14 sm:px-8 lg:px-16 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 relative flex items-center justify-center lg:order-1">
              <div className="absolute -bottom-3 -right-3 h-[92%] w-[92%] rounded-[42px] border-2 border-[#00bfae] sm:-right-5 sm:h-[94%] sm:w-[94%]" />
              <div className="relative z-10 w-full max-w-[680px] overflow-hidden rounded-[38px] shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
                <Image
                  src="/empresa_maylon.png"
                  alt="Maylon Empresas - Plataforma de gestão corporativa"
                  width={1000}
                  height={700}
                  priority
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="absolute left-3 top-5 z-20 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl sm:left-6 sm:top-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00bfae] text-white">
                  <BarChart3 size={21} />
                </div>
                <div>
                  <p className="text-[11px] text-zinc-500">
                    Plataforma Corporativa
                  </p>
                  <p className="text-sm font-bold text-zinc-900">
                    Maylon Empresas
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 relative z-10 lg:order-2">
              <h1 className="max-w-[1000px] text-[40px] font-black text-zinc-950 sm:text-3xl lg:text-4xl">
                Controle total das viagens da sua empresa.
              </h1>
              <p className="mt-6 max-w-[650px] text-[16px] leading-7 text-zinc-600 sm:text-[17px]">
                Centralize corridas, acompanhe despesas em tempo real,
                gerencie colaboradores e tenha relatórios completos em uma
                única plataforma.

              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <HeroBenefit text="Controle de gastos" />
                <HeroBenefit text="Relatórios completos" />
                <HeroBenefit text="Gestão de colaboradores" />
                <HeroBenefit text="Faturamento centralizado" />
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/empresas/cadastro"
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-[#00bfae] px-7 text-sm font-bold text-white shadow-lg shadow-[#00bfae]/20 transition hover:-translate-y-1 hover:bg-[#00a897]"
                >
                  Cadastrar empresa
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/suporte"
                  className="inline-flex h-14 items-center justify-center rounded-xl border border-zinc-300 bg-white px-7 text-sm font-bold text-zinc-800 transition hover:border-[#00bfae] hover:text-[#00a897]"
                >
                  Falar com especialista
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-10 lg:py-12">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-16">
          <div className="max-w-[700px]">
            <span className="text-sm font-bold uppercase tracking-wider text-[#00a897]">
              Soluções Maylon
            </span>
            <h2 className="mt-3 text-[30px] font-black leading-tight tracking-[-1px] sm:text-[36px]">
              Mobilidade para todos os momentos da sua empresa
            </h2>
            <p className="mt-4 text-[16px] leading-7 text-zinc-600">
              Tenha uma plataforma completa para administrar as viagens
              corporativas e oferecer mobilidade para seus colaboradores e
              clientes.
            </p>
          </div>
          <div className="mt-5 grid max-w-[1300px] gap-8 lg:grid-cols-2">
            <UseCase
              image="/viagem-trabalho.png"
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
              image="/viagem-cortesia.png"
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
      <section className="bg-[#f8faf9] py-10 lg:py-10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-16">
          <div className="max-w-[700px]">
            <span className="text-sm font-bold uppercase tracking-wider text-[#00a897]">
              Benefícios
            </span>
            <h2 className="mt-2 text-[30px] font-black tracking-[-1px] sm:text-2xl">
              Tudo que sua empresa precisa em um só lugar
            </h2>
          </div>
          <div className="mt-12 max-w-[1100px]">
            {benefits.map((item, index) => (
              <div
                key={item.title}
                className="grid gap-6 border-b border-zinc-200 py-8 last:border-b-0 md:grid-cols-[220px_1px_1fr] md:items-center md:gap-8"
              >
                <div className="relative h-[120px] w-full overflow-hidden rounded-2xl md:h-[120px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
                <div className="hidden h-full min-h-[120px] bg-zinc-200 md:block">
                  <span className="relative -left-[3px] block h-[7px] w-[7px] rounded-full bg-[#00bfae]" />
                  {index === benefits.length - 1 && (
                    <span className="relative -bottom-[115px] -left-[3px] block h-[7px] w-[7px] rounded-full bg-[#00bfae]" />
                  )}
                </div>
                <div className="max-w-[650px]">
                  <h3 className="text-[18px] font-bold text-zinc-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-6 text-zinc-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-10 lg:py-14">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-16">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-[92%] w-[80%] rounded-[42px] border-4 border-[#00bfae]" />
              <div className="relative z-10 overflow-hidden rounded-[42px] shadow-2xl">
                <Image
                  src="/executivo.png"
                  alt="Gestão corporativa Maylon"
                  width={900}
                  height={700}
                  className="h-[420px] w-full object-cover sm:h-[500px] lg:h-[550px]"
                />
              </div>
            </div>
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-[#00a897]">
                Gestão inteligente
              </span>
              <h2 className="mt-3 max-w-[650px] text-[36px] font-black leading-[1.08] tracking-[-1.2px] sm:text-[42px] lg:text-[48px]">
                Uma solução completa para a gestão corporativa.
              </h2>
              <p className="mt-6 max-w-[600px] text-[16px] leading-7 text-zinc-600">
                Simplifique a mobilidade da sua empresa com tecnologia,
                segurança, controle financeiro e uma experiência completa
                para seus colaboradores.
              </p>
              <div className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.title}
                      className="flex items-start gap-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e7faf7] text-[#00a897]">
                        <Icon
                          size={22}
                          strokeWidth={2.2}
                        />
                      </div>
                      <p className="pt-1 text-[14px] font-semibold leading-6 text-zinc-800">
                        {feature.title}
                      </p>
                    </div>
                  );
                })}
              </div>
              <Link
                href="/empresas"
                className="mt-10 inline-flex h-12 items-center justify-center rounded-xl bg-[#00bfae] px-7 text-sm font-bold text-white transition hover:bg-[#00a897]"
              >
                Conheça a Maylon Empresas
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pb-12 sm:px-6 lg:px-10">
  <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[32px] border border-white/10 bg-[#111827] shadow-2xl">
    {/* Efeitos de fundo */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,175,143,0.12),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(56,175,143,0.16),transparent_35%)]" />

    <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#38AF8F]/20 blur-[90px]" />

    <div className="pointer-events-none absolute -bottom-32 -left-32 h-[320px] w-[320px] rounded-full bg-[#38AF8F]/10 blur-[80px]" />

    {/* Linhas decorativas */}
    <div className="pointer-events-none absolute right-[28%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent lg:block" />

    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)]" />

    <div className="relative grid items-center gap-10 px-7 py-12 sm:px-10 sm:py-14 lg:grid-cols-[1fr_auto] lg:gap-16 lg:px-16 lg:py-16">
      {/* Conteúdo */}
      <div className="max-w-[780px]">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#38AF8F]/30 bg-[#38AF8F]/10 px-4 py-2 shadow-[0_0_30px_rgba(56,175,143,0.08)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38AF8F]/70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#38AF8F]" />
          </span>

          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6dd6b8] sm:text-[12px]">
            Maylon Empresas
          </span>
        </div>

        {/* Título */}
        <h2 className="max-w-[760px] text-[32px] font-black leading-[1.08] tracking-[-1.2px] text-white sm:text-[40px] lg:text-[48px]">
          Transforme a mobilidade{" "}
          <span className="bg-gradient-to-r from-[#6dd6b8] to-[#38AF8F] bg-clip-text text-transparent">
            da sua empresa.
          </span>
        </h2>

        {/* Descrição */}
        <p className="my-5 max-w-[680px] text-[15px] leading-7 text-zinc-300 sm:text-[16px]">
          Tenha mais controle, segurança e eficiência em todas as viagens
          corporativas. Nossa equipe está pronta para encontrar a melhor
          solução para o seu negócio.
        </p>

        {/* Benefícios */}
        <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
          {[
            "Gestão centralizada",
            "Controle de despesas",
            "Atendimento especializado",
          ].map((item) => (
            <div
              key={item}
              className="group/item flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2.5 text-[13px] font-medium text-zinc-200 transition-all duration-300 hover:border-[#38AF8F]/30 hover:bg-[#38AF8F]/10"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#38AF8F] text-[11px] font-bold text-white shadow-[0_0_12px_rgba(56,175,143,0.35)]">
                ✓
              </span>

              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative lg:min-w-[280px]">
        <Link
          href="/suporte"
          className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#38AF8F] px-6 py-5 text-white shadow-[0_15px_40px_rgba(56,175,143,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#2f9d7f] hover:shadow-[0_25px_60px_rgba(56,175,143,0.35)] active:translate-y-0 lg:w-[280px]"
        >
          {/* Brilho animado */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <div className="relative text-left">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/75">
              Fale com nossa equipe
            </span>

            <span className="mt-1 block text-[16px] font-bold">
              Falar com especialista
            </span>
          </div>

          {/* Ícone */}
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/15 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 group-hover:bg-white/25">
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
        </Link>

        {/* Informação */}
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-zinc-500 lg:justify-start">
          <span className="h-1.5 w-1.5 rounded-full bg-[#38AF8F]" />
          Atendimento personalizado para sua empresa
        </div>
      </div>
    </div>
  </div>
</section>
    </main>
  );
}

function HeroBenefit({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex min-h-[48px] items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 shadow-sm">
      <span className="h-3 w-3 shrink-0 rounded-full bg-[#00bfae]" />
      <span className="text-[14px] font-medium text-zinc-700">
        {text}
      </span>

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
    <div className="group relative h-[280px] w-full overflow-hidden rounded-[28px] border border-zinc-200 bg-[#f4faf8] shadow-[0_5px_18px_rgba(0,0,0,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="relative grid h-full grid-cols-2">

        {/* =================================================
            TEXTO
        ================================================= */}

        <div
          className={`relative z-20 flex flex-col justify-center px-6 py-6 sm:px-8 ${imagePosition === "left" ? "order-2" : "order-1"
            }`}
        >

          {/* Ícone */}

          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#009f8f] text-xl text-white shadow-sm">
            {icon}
          </div>

          {/* Título */}

          <h3 className="text-[24px] font-black leading-[1.05] tracking-[-0.7px] text-[#15232a]">
            {title}
          </h3>

          {/* Descrição */}

          <p className="mt-4 max-w-[230px] text-[13px] leading-5 text-zinc-600">
            {description}
          </p>

        </div>

        {/* =================================================
            IMAGEM
        ================================================= */}

        <div
          className={`relative h-full overflow-hidden bg-[#f4faf8] ${imagePosition === "left" ? "order-1" : "order-2"
            }`}
        >

          <Image
            src={image}
            alt="Viagem corporativa Maylon"
            fill
            sizes="(max-width: 1024px) 50vw, 600px"
            className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
          />

        </div>

      </div>

    </div>
  );
}