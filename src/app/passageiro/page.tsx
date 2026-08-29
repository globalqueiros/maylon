"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Building2,
  CheckCircle2,
  XCircle,
  Clock3,
  ShieldCheck,
  Percent,
} from "lucide-react";

const cards = [
  {
    image: "/viagem1.webp",
    title: "Viagens sob medida para você",
    description:
      "Conte com diferentes opções de viagem, desenvolvidas para oferecer conforto, praticidade e segurança em cada trajeto.",
  },
  {
    image: "/viagem2.webp",
    title: "Atendimento em aeroportos",
    description:
      "Tenha mais tranquilidade em seus deslocamentos, com atendimento planejado para garantir pontualidade, conforto e segurança.",
  },
  {
    image: "/viagem3.webp",
    title: "Mobilidade em toda a região",
    description:
      "Motoristas parceiros preparados para proporcionar viagens seguras, confortáveis e eficientes em seus principais destinos.",
  },
  {
    image: "/dirijir.png",
    title: "Tenha liberdade para dirigir quando quiser",
    description:
      "Tenha autonomia para organizar sua rotina, escolher seus horários e dirigir com mais liberdade, tranquilidade e flexibilidade. Você decide quando começar e onde quer chegar.",
  }
];

export default function Page() {
  const [openEspecialista, setOpenEspecialista] = useState(false);
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [tipoAlerta, setTipoAlerta] = useState<"success" | "error">(
    "success"
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const totalSlides = cards.length;

  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      if (width <= 425) {
        setSlidesPerView(4);
      } else {
        setSlidesPerView(4);
      }
    };
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  };

  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 14)
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  const handlePrevious = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + totalSlides) % totalSlides
    );
  };

  const handleNext = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % totalSlides
    );
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = e.currentTarget;

    try {
      const formData = new FormData(form);

      const dados = {
        empresa: formData.get("empresa"),
        cnpj: formData.get("cnpj"),
        responsavel: formData.get("responsavel"),
        cargo: formData.get("cargo"),
        email: formData.get("email"),
        telefone: formData.get("telefone"),
        cidade: formData.get("cidade"),
        estado: formData.get("estado"),
        tipoAnuncio: formData.get("tipoAnuncio"),
        quantidadeVeiculos: formData.get("quantidadeVeiculos"),
        orcamento: formData.get("orcamento"),
        mensagem: formData.get("mensagem"),
      };

      const response = await fetch("/api/especialista", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const resultado = await response.json();

      if (!response.ok || !resultado.success) {
        throw new Error(
          resultado.error ||
          "Não foi possível enviar a solicitação."
        );
      }
      setTipoAlerta("success");
      setMostrarAlerta(true);
      form.reset();
      setCnpj("");
      setTelefone("");
      setMensagem("");
      setOpenEspecialista(false);
      setTimeout(() => {
        setMostrarAlerta(false);
      }, 5000);
    } catch (error) {
      console.error(
        "Erro ao enviar solicitação:",
        error
      );
      setTipoAlerta("error");
      setMostrarAlerta(true);
      setTimeout(() => {
        setMostrarAlerta(false);
      }, 5000);
    }
  };

  return (
    <>
      {
        mostrarAlerta && (
          <div
            className={`fixed right-5 top-5 z-[9999] w-[calc(100%-40px)] max-w-md animate-in slide-in-from-right-5 fade-in duration-300 ${tipoAlerta === "success"
              ? "border-emerald-200"
              : "border-red-200"
              }`}
          >
            <div className="rounded-2xl border bg-white p-4 shadow-2xl">
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tipoAlerta === "success"
                    ? "bg-emerald-100"
                    : "bg-red-100"
                    }`}
                >
                  {tipoAlerta === "success" ? (
                    <CheckCircle2
                      size={22}
                      className="text-emerald-600 cursor-pointer"
                    />
                  ) : (
                    <XCircle
                      size={22}
                      className="text-red-600 cursor-pointer"
                    />
                  )}
                </div>
                <div className="flex-1">
                  {tipoAlerta === "success" ? (
                    <>
                      <h4 className="font-bold text-zinc-900">
                        Solicitação enviada!
                      </h4>
                      <p className="mt-1 text-sm text-zinc-600">
                        Seus dados foram enviados com sucesso.
                        Nossa equipe entrará em contato em breve.
                      </p>
                    </>
                  ) : (
                    <>
                      <h4 className="font-bold text-zinc-900">
                        Erro ao enviar
                      </h4>
                      <p className="mt-1 text-sm text-zinc-600">
                        Não foi possível enviar sua solicitação.
                        Tente novamente.
                      </p>
                    </>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setMostrarAlerta(false)}
                  className="rounded-lg p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                >
                  <X size={18} className="cursor-pointer" />
                </button>
              </div>
              <div
                className={`mt-3 h-1 overflow-hidden rounded-full ${tipoAlerta === "success"
                  ? "bg-emerald-100"
                  : "bg-red-100"
                  }`}
              >
                <div
                  className={`h-full origin-left animate-[shrink_300s_linear_forwards] rounded-full ${tipoAlerta === "success"
                    ? "bg-emerald-500"
                    : "bg-red-500"
                    }`}
                />
              </div>
            </div>
          </div>
        )
      }
      <section className="relative isolate w-full overflow-hidden rounded-2xl bg-white sm:rounded-3xl">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/passageiro_hero.png"
            alt="Passageiro utilizando o serviço Maylon"
            fill
            priority
            className="
              object-cover
              object-[68%_center]
              sm:object-[72%_center]
              lg:object-center
            "
            sizes="100vw"
          />
          <div
            className="
              absolute inset-0
              hidden
              bg-gradient-to-r
              from-white
              via-white/95
              via-45%
              to-transparent
              sm:block
            "
          />
          <div
            className="
              absolute inset-0
              bg-gradient-to-b
              from-white
              via-white/95
              via-55%
              to-white/70
              sm:hidden
            "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
        </div>
        <div
          className="
            relative mx-auto flex w-full max-w-7xl items-center
            px-5 py-12
            sm:min-h-[480px] sm:px-8 sm:py-14
            lg:min-h-[500px] lg:px-14 lg:py-16
          "
        >
          <div
            className="
              w-full max-w-xl
              sm:max-w-lg
              lg:max-w-xl
            "
          >
            <h1
              className="
                max-w-[340px]
                text-3xl font-black leading-[1.08] tracking-tight text-slate-900
                sm:max-w-xl sm:text-4xl
                md:text-5xl
                lg:text-5xl
              "
            >
              Mobilidade que{" "}
              <span className="text-teal-500">
                te <br/> leva mais longe.
              </span>
            </h1>
            <p
              className="
                my-5 max-w-[340px]
                text-base leading-6 text-black
                sm:mt-5 sm:max-w-md sm:text-base sm:leading-7
                lg:mt-6 lg:text-base
              "
            >
              Mais comodidade, segurança e benefícios para sua rotina
              todos os dias.
            </p>
            <div
              className="
                mt-0 grid grid-cols-1 gap-4
                sm:mt-8 sm:grid-cols-3 sm:gap-4
                lg:mt-9 lg:gap-5
              "
            >
              <div className="group flex items-start gap-3">
                <div
                  className="
                    flex h-10 w-10 shrink-0 items-center justify-center
                    rounded-xl border border-teal-500/20
                    bg-teal-500/10 text-teal-600
                    transition-all duration-300
                    group-hover:bg-teal-500/20
                    sm:h-11 sm:w-11
                  "
                >
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Viagens Seguras
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Sua segurança em primeiro lugar.
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-3">
                <div
                  className="
                    flex h-10 w-10 shrink-0 items-center justify-center
                    rounded-xl border border-teal-500/20
                    bg-teal-500/10 text-teal-600
                    transition-all duration-300
                    group-hover:bg-teal-500/20
                    sm:h-11 sm:w-11
                  "
                >
                  <Percent className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Benefícios Exclusivos
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Economize com vantagens especiais.
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-3">
                <div
                  className="
                    flex h-10 w-10 shrink-0 items-center justify-center
                    rounded-xl border border-teal-500/20
                    bg-teal-500/10 text-teal-600
                    transition-all duration-300
                    group-hover:bg-teal-500/20
                    sm:h-11 sm:w-11
                  "
                >
                  <Clock3 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Mais Agilidade
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Chegue ao seu destino com mais tempo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-950 via-emerald-950 to-teal-900 py-8 sm:py-14 md:py-10 lg:py-10 xl:py-15 2xl:py-15">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-teal-500/10 blur-[100px] sm:h-72 sm:w-72 md:h-80 md:w-80 lg:left-20 lg:top-20 lg:h-96 lg:w-96 lg:blur-[120px]" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px] sm:h-72 sm:w-72 md:h-80 md:w-80 lg:bottom-20 lg:right-20 lg:h-96 lg:w-96 lg:blur-[120px]" />
          <div className="absolute left-1/2 top-1/2 hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/5 blur-[150px] lg:block xl:h-[600px] xl:w-[600px]" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 md:gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20 2xl:gap-24">
            <div className="w-full">
              <span className="inline-flex items-center rounded-full border border-teal-400/20 bg-teal-500/10 px-3 py-1.5 text-xs font-semibold text-teal-300 backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
                ✨ Assinatura Premium
              </span>
              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:mt-6 sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl">
                Maylon Pass
              </h2>
              <div className="mt-4 flex items-end gap-2 sm:mt-5">
                <span className="text-2xl font-black text-teal-400 sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl">
                  R$ 59,99
                </span>
                <span className="mb-0 text-xs text-white sm:mb-0 sm:text-sm">
                  / Mês
                </span>
              </div>
              <p className="my-4 max-w-xl text-justify text-sm leading-6 text-white sm:my-5 sm:text-base sm:leading-8 md:text-base lg:text-sm xl:text-base 2xl:text-base">
                Tenha benefícios exclusivos pensados para você e sua família.
                Mais tranquilidade, proteção, economia e suporte sempre ao seu lado.
              </p>
              <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4 lg:mt-7">
                <div className="flex items-start gap-3 text-sm text-white sm:text-base md:text-lg lg:text-base xl:text-lg">
                  <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.6)]" />
                  <span className="text-base">
                    Ambulância particular em situações de emergência
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm text-white sm:text-base md:text-lg lg:text-base xl:text-lg">
                  <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.6)]" />
                  <span className="text-base">
                    Descontos especiais em viagens
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm text-white sm:text-base md:text-lg lg:text-base xl:text-lg">
                  <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.6)]" />
                  <span className="text-base">
                    Atendimento prioritário
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm text-white sm:text-base md:text-lg lg:text-base xl:text-lg">
                  <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.6)]" />
                  <span className="text-base">
                    Benefícios exclusivos para assinantes
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm text-white sm:text-base md:text-lg lg:text-base xl:text-lg">
                  <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.6)]" />
                  <span className="text-base">
                    Promoções e campanhas especiais
                  </span>
                </div>
              </div>
              <div className="mt-8 sm:mt-10 md:mt-12">
                <Link
                  href="/maylon_pass"
                  className="group inline-flex h-12 w-full text-sm items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 text-sm font-bold text-white shadow-[0_8px_25px_rgba(20,184,166,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-400 hover:shadow-[0_12px_35px_rgba(20,184,166,0.35)] active:translate-y-0 sm:h-14 sm:w-auto sm:min-w-[190px] sm:px-8 sm:text-base"
                >
                  <span className="text-sm">Assinar Agora</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
            <div className="relative hidden min-h-[430px] items-center justify-center lg:flex lg:min-h-[480px] xl:min-h-[520px] 2xl:min-h-[580px]">
              <div className="absolute h-64 w-64 rounded-full bg-teal-500/20 blur-[100px] lg:h-80 lg:w-80 xl:h-96 xl:w-96" />
              <div className="relative h-[430px] w-full max-w-[450px] lg:h-[450px] lg:max-w-[480px] xl:h-[500px] xl:max-w-[520px] 2xl:h-[540px] 2xl:max-w-[560px]">
                <div className="absolute left-0 top-0 max-w-[220px] rotate-[-8deg] rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 lg:max-w-[230px] lg:p-6 xl:max-w-[240px]">
                  <div className="text-4xl xl:text-5xl">
                    🚑
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-white lg:mt-4 lg:text-xl">
                    Ambulância
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400 xl:text-base">
                    Cobertura emergencial.
                  </p>
                </div>
                <div className="absolute right-0 top-10 max-w-[220px] rotate-[10deg] rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 lg:max-w-[230px] lg:p-6 xl:max-w-[240px]">
                  <div className="text-4xl xl:text-5xl">
                    🚖
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-white lg:mt-4 lg:text-xl">
                    Descontos
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400 xl:text-base">
                    Economia em viagens.
                  </p>
                </div>
                <div
                  className="absolute bottom-8 left-20 max-w-[230px] rotate-[-8deg] rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 lg:left-24 lg:max-w-[240px] lg:p-6 xl:left-28 xl:max-w-[250px]">
                  <div className="text-4xl xl:text-5xl">
                    ⭐
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-white lg:text-xl">
                    Benefícios VIP
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400 xl:text-base">
                    Atendimento prioritário.
                  </p>
                </div>
                <div
                  className="pointer-events-none absolute left-0 top-1/2 -z-10 h-px w-full -translate-y-1/2 bg-teal-400/60 blur-[2px]" />
              </div>
            </div>
          </div>
        </div>
      </section >
      <section className="bg-white py-8 lg:py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="mb-5 max-w-3xl font-black text-black text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl">
            Viaje do seu jeito com a Maylon
          </h2>
          <div
            className="relative w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:transform-none lg:transition-none"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}>
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className="w-full shrink-0 px-2 sm:px-3 md:w-1/2 lg:w-1/3"
                  >
                    <article className="group h-full">
                      <div
                        className="relative overflow-hidden rounded-2xl sm:rounded-3xl"
                      >
                        <Image
                          src={card.image}
                          alt={card.title}
                          width={600}
                          height={500}
                          priority={index === 0}
                          className="h-[280px] w-full object-cover transition-transform duration-700 ease-out sm:h-[320px] md:h-[340px] lg:h-[380px] group-hover:scale-105" />
                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                      <div className="px-1">
                        <h3
                          className="mt-4 text-xl font-bold leading-tight text-zinc-900 sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl"
                        >
                          {card.title}
                        </h3>
                        <p
                          className="mt-1 text-justify sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm text-justify leading-6 text-zinc-600 sm:leading-6"
                        >
                          {card.description}
                        </p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev - 1 + totalSlides) % totalSlides
                )
              }
              aria-label="Slide anterior"
              className="absolute cursor-pointer left-0 top-1/2 z-20 flex h-11 w-11 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-lg font-bold text-zinc-800 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-emerald-500 hover:text-white sm:-translate-x-4"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev + 1) % totalSlides
                )
              }
              aria-label="Próximo slide"
              className="absolute cursor-pointer right-0 top-1/2 z-20 flex h-11 w-11 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-lg font-bold text-zinc-800 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-emerald-500 hover:text-white sm:translate-x-4"
            >
              →
            </button>
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: slidesPerView }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Ir para slide ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-500 ${currentSlide === index
                    ? "w-8 bg-emerald-500"
                    : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-950 via-emerald-950 to-teal-900 py-8 sm:py-10 md:py-10 lg:py-12 xl:py-12 2xl:py-12">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-60 w-60 rounded-full bg-teal-500/10 blur-[120px] sm:h-72 sm:w-72 lg:h-96 lg:w-96 lg:blur-[140px]" />
          <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-emerald-500/10 blur-[120px] sm:h-72 sm:w-72 lg:h-96 lg:w-96 lg:blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-0">
          <div className="grid items-left gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="text-left lg:text-left">
              <span className="inline-flex items-left rounded-full border border-teal-400/20 bg-teal-500/10 px-4 py-2 text-xs font-semibold text-teal-300 backdrop-blur-md sm:text-sm">
                🏢 Soluções Corporativas
              </span>
              <h2 className="mt-5 text-2xl font-black leading-tight text-white sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-4xl">
                Mobilidade Inteligente Para Sua Empresa
              </h2>
              <p className="mx-auto my-4 max-w-2xl text-sm leading-6 text-justify text-zinc-300 sm:text-sm sm:leading-8 lg:mx-0 md:text-sm md:leading-6 lg:text-sm lg:leading-6 xl:text-base xl:leading-7 2xl:text-base 2xl:leading-7">
                Gerencie viagens corporativas, transporte de colaboradores e
                deslocamentos empresariais com mais segurança, praticidade e
                controle financeiro.
              </p>
              <div className="space-y-4">
                {[
                  "Viagens corporativas com gestão centralizada",
                  "Transporte para colaboradores e equipes",
                  "Controle de gastos e relatórios detalhados",
                  "Atendimento prioritário para empresas",
                  "Pagamento simplificado e faturamento mensal",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-white sm:text-base"
                  >
                    <div className="h-2.5 w-2.5 rounded-full bg-teal-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-start lg:justify-start">
                <a
                  href="/empresas"
                  className="inline-flex h-12 cursor-pointer items-center justify-center rounded-2xl bg-teal-500 px-8 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-teal-400 hover:shadow-[0_20px_50px_rgba(20,184,166,0.35)]"
                >
                  Ver soluções para empresas
                </a>
                <button
                  onClick={() => setOpenEspecialista(true)}
                  className="inline-flex h-12 cursor-pointer items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
                >
                  Solicitar Atendimento
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-teal-500/20 to-emerald-500/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[32px] xl:rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl">
                <img
                  src="/empresa_maylon.png"
                  alt="Maylon Empresas"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -left-5 top-8 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl xl:-left-6 xl:top-10">
                <div className="text-4xl">📊</div>
                <h3 className="mt-2 text-lg font-bold text-white">
                  Controle Total
                </h3>
                <p className="text-sm text-zinc-300">
                  Relatórios e gestão.
                </p>
              </div>
              <div className="absolute -right-5 bottom-8 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl xl:-right-6 xl:bottom-10">
                <div className="text-4xl">🚖</div>
                <h3 className="mt-2 text-lg font-bold text-white">
                  Mobilidade
                </h3>
                <p className="text-sm text-zinc-300">
                  Equipes em movimento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
        openEspecialista && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
            <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div className="flex shrink-0 items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/20 p-3">
                    <Building2 className="text-white" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Falar com um especialista
                    </h2>
                    <p className="text-sm text-emerald-100">
                      Preencha os dados da sua empresa.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenEspecialista(false)}
                  className="cursor-pointer rounded-xl bg-white/10 p-2 text-white transition hover:bg-red-500"
                >
                  <X size={22} />
                </button>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex min-h-0 flex-1 flex-col"
              >
                <div className="min-h-0 flex-1 overflow-y-auto p-6">
                  <div className="mb-8">
                    <h3 className="mb-5 text-lg font-bold text-zinc-900">
                      Informações da empresa
                    </h3>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                          Nome da Empresa *
                        </label>
                        <input
                          type="text"
                          name="empresa"
                          required
                          placeholder="Nome da Empresa"
                          className="w-full rounded-xl border border-zinc-300 px-4 py-3 capitalize outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                          CNPJ *
                        </label>
                        <input
                          type="text"
                          name="cnpj"
                          required
                          value={cnpj}
                          onChange={(e) =>
                            setCnpj(formatCNPJ(e.target.value))
                          }
                          inputMode="numeric"
                          maxLength={18}
                          placeholder="00.000.000/0001-00"
                          className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                          Nome do Responsável *
                        </label>
                        <input
                          type="text"
                          name="responsavel"
                          required
                          placeholder="Nome completo"
                          className="w-full rounded-xl border border-zinc-300 px-4 py-3 capitalize outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                          Cargo
                        </label>
                        <input
                          type="text"
                          name="cargo"
                          placeholder="Ex.: Gerente Comercial"
                          className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="empresa@empresa.com.br"
                          className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                          Telefone / WhatsApp *
                        </label>
                        <input
                          type="text"
                          name="telefone"
                          required
                          value={telefone}
                          onChange={(e) =>
                            setTelefone(formatPhone(e.target.value))
                          }
                          inputMode="numeric"
                          maxLength={15}
                          placeholder="(00) 00000-0000"
                          className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                          Cidade *
                        </label>
                        <input
                          type="text"
                          name="cidade"
                          required
                          placeholder="Cidade"
                          className="w-full rounded-xl border border-zinc-300 px-4 py-3 capitalize outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                          Estado *
                        </label>
                        <select
                          name="estado"
                          required
                          defaultValue=""
                          className="w-full cursor-pointer rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        >
                          <option value="" disabled>
                            Selecione um estado
                          </option>
                          <option value="AC">Acre</option>
                          <option value="AL">Alagoas</option>
                          <option value="AP">Amapá</option>
                          <option value="AM">Amazonas</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="ES">Espírito Santo</option>
                          <option value="GO">Goiás</option>
                          <option value="MA">Maranhão</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="PA">Pará</option>
                          <option value="PB">Paraíba</option>
                          <option value="PR">Paraná</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PI">Piauí</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="SP">São Paulo</option>
                          <option value="SE">Sergipe</option>
                          <option value="TO">Tocantins</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-5 text-lg font-bold text-zinc-900">
                      Interesse Comercial
                    </h3>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                          Tipo de Anúncio
                        </label>
                        <select
                          name="tipoAnuncio"
                          defaultValue=""
                          className="w-full cursor-pointer rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        >
                          <option value="" disabled>
                            Selecione um tipo de anúncio
                          </option>
                          <option value="banner-app">
                            Banner no Aplicativo
                          </option>
                          <option value="anuncio-veiculo">
                            Anúncio no Veículo
                          </option>
                          <option value="banner-app e anuncio-veiculo">
                            Banner no Aplicativo e Anúncio no Veículo
                          </option>
                          <option value="viagens">
                            Viagens
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                          Quantidade de veículos (opcional)
                        </label>
                        <input
                          type="number"
                          name="quantidadeVeiculos"
                          min="1"
                          placeholder="Ex.: 50"
                          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                          Orçamento Previsto
                        </label>
                        <select
                          name="orcamento"
                          defaultValue=""
                          className="w-full cursor-pointer rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        >
                          <option value="" disabled>
                            Selecione um orçamento
                          </option>
                          <option value="500">
                            Até R$ 500/mês
                          </option>
                          <option value="1000">
                            R$ 500 a R$ 1.000/mês
                          </option>
                          <option value="5000">
                            R$ 1.000 a R$ 5.000/mês
                          </option>
                          <option value="5001">
                            Acima de R$ 5.000/mês
                          </option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                          Mensagem
                        </label>
                        <div className="relative">
                          <textarea
                            name="mensagem"
                            rows={5}
                            maxLength={350}
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                            placeholder="Informe o serviço desejado e o objetivo da campanha."
                            className="w-full resize-none rounded-xl border border-zinc-300 bg-white px-4 py-3 pb-10 text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                          />
                          <span className="absolute bottom-3 right-4 text-xs font-medium text-zinc-500">
                            {mensagem.length}/350
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-4 border-t border-zinc-200 bg-white p-6 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setOpenEspecialista(false)}
                    className="cursor-pointer rounded-xl border border-zinc-300 bg-white px-8 py-3 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:bg-gray-100 hover:text-black"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Enviar solicitação
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </>
  )
}