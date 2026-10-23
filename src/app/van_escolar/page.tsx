"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  School,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function VanEscolarPage() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Segurança",
      description:
        "Transporte pensado para oferecer mais tranquilidade aos alunos e responsáveis.",
    },
    {
      icon: Clock3,
      title: "Pontualidade",
      description:
        "Horários e rotas organizados para facilitar a rotina escolar.",
    },
    {
      icon: Users,
      title: "Conforto",
      description:
        "Uma experiência mais confortável durante o trajeto de ida e volta.",
    },
    {
      icon: MapPin,
      title: "Rotas planejadas",
      description:
        "Organização das rotas de acordo com os locais e horários combinados.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Solicite o serviço",
      description:
        "Envie seus dados e informe os locais, horários e necessidades do transporte.",
    },
    {
      number: "02",
      title: "Analisamos a rota",
      description:
        "Nossa equipe verifica a disponibilidade e as condições da rota solicitada.",
    },
    {
      number: "03",
      title: "Definimos os detalhes",
      description:
        "Alinhamos horários, pontos de embarque e demais informações do serviço.",
    },
    {
      number: "04",
      title: "Comece a utilizar",
      description:
        "Com tudo combinado, o transporte escolar pode fazer parte da sua rotina.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#f7fdfb] to-[#e9f7f2]">
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#35a989]/15 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-[#35a989]/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-0 sm:px-8 sm:pb-10 sm:pt-0 lg:px-10 lg:pb-5 lg:pt-0">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <h1 className="max-w-2xl text-3xl font-black leading-8 tracking-tight text-gray-950 sm:text-3xl lg:text-3xl">
                Transporte escolar
                <br />
                com a{" "}
                <span className="text-[#35a989]">Maylon</span>
              </h1>
              <p className="my-5 max-w-xl text-sm text-justify leading-6 text-gray-600 sm:text-sm">
                Uma solução prática para o transporte escolar, com rotas
                planejadas, conforto, pontualidade e mais tranquilidade para
                alunos e responsáveis.
              </p>

              <div className="mt-0 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#solicitar"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#35a989] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#35a989]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2f9679] hover:shadow-xl sm:text-base"
                >
                  Solicitar Van Escolar
                  <ArrowRight size={19} />
                </Link>

                <Link
                  href="#como-funciona"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-4 text-sm font-bold text-gray-800 shadow-sm transition-all duration-300 hover:border-[#35a989]/30 hover:bg-[#f7fdfb] sm:text-base"
                >
                  Como funciona
                  <ChevronRight size={19} />
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur">
                  <ShieldCheck className="mb-2 text-[#35a989]" size={22} />
                  <p className="text-xs font-bold text-gray-900 sm:text-sm">
                    Segurança
                  </p>
                </div>

                <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur">
                  <Clock3 className="mb-2 text-[#35a989]" size={22} />
                  <p className="text-xs font-bold text-gray-900 sm:text-sm">
                    Pontualidade
                  </p>
                </div>

                <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur">
                  <Users className="mb-2 text-[#35a989]" size={22} />
                  <p className="text-xs font-bold text-gray-900 sm:text-sm">
                    Conforto
                  </p>
                </div>

                <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur">
                  <MapPin className="mb-2 text-[#35a989]" size={22} />
                  <p className="text-xs font-bold text-gray-900 sm:text-sm">
                    Rotas planejadas
                  </p>
                </div>
              </div>
            </div>

            <div className="relative order-1 flex items-center justify-center lg:order-2">
              <div className="absolute h-[280px] w-[280px] rounded-full bg-[#35a989]/20 blur-3xl sm:h-[420px] sm:w-[420px]" />
              <div className="relative hidden w-full max-w-[650px] md:block">
                <div className="relative">
                  <Image
                    src="/sprinter-van-escolar-01.png"
                    alt="Van escolar Maylon"
                    width={1024}
                    height={768}
                    priority
                    className="relative z-10 block h-auto w-full object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.18)] transition duration-500 hover:scale-[1.02]"
                  />

                  <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-white/80 bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:bottom-8 sm:px-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#35a989] text-white">
                      <School size={20} />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                        Serviço Maylon
                      </p>

                      <p className="text-sm font-black text-gray-900 sm:text-base">
                        Van Escolar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-4 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold text-[#35a989]">
              POR QUE ESCOLHER A MAYLON?
            </span>

            <h2 className="my-2 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Mais tranquilidade para sua rotina
            </h2>

            <p className="mt-0 text-sm leading-6 text-justify text-gray-600 sm:text-sm">
              Pensamos em uma experiência de transporte escolar que una
              praticidade, organização e conforto.
            </p>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="group rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#35a989]/20 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f7f3] text-[#35a989] transition-colors group-hover:bg-[#35a989] group-hover:text-white">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-gray-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="como-funciona"
        className="bg-[#f7faf9] py-10 sm:py-10"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <span className="text-sm font-bold text-[#35a989]">
                COMO FUNCIONA
              </span>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                Simples para você.
                <br />
                Organizado para todos.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-6 text-gray-600 sm:text-base text-justify">
                Solicite o serviço e nossa equipe ajuda a organizar os
                detalhes necessários para o transporte escolar.
              </p>

              <div className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#35a989] text-white">
                  <Calendar size={20} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Planejamento
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    Rotas e horários organizados
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <span className="text-sm font-black text-[#35a989]">
                    {step.number}
                  </span>

                  <h3 className="mt-4 text-lg font-black text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 sm:py-5">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="overflow-hidden rounded-[36px] bg-[#0b6e4f] px-6 py-12 text-center text-white shadow-2xl sm:px-10 lg:px-16">
            <div className="mx-auto max-w-3xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <School size={28} />
              </div>

              <h2 className="mt-5 text-3xl font-black sm:text-4xl">
                Precisa de transporte escolar?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm text-justify leading-6 text-white/80 sm:text-base">
                Fale com a Maylon e consulte as possibilidades de atendimento
                para sua região, horários e necessidades de transporte.
              </p>

              <div
                id="solicitar"
                className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"
              >
                <a
                  href="https://wa.me/5511974204958"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#0b6e4f] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:text-base"
                >
                  <MessageCircle size={20} />
                  Solicitar pelo WhatsApp
                </a>

                <Link
                  href="/reservar_viagem"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-white/20 sm:text-base"
                >
                  Reservar viagem
                  <ArrowRight size={19} />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/80">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Atendimento Maylon
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Rotas planejadas
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Transporte escolar
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main >
  );
}