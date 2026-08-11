"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Building2 } from "lucide-react";

export default function Page() {
  const [openEspecialista, setOpenEspecialista] = useState(false);
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");

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

  const cards = [
    {
      image: "/viagem1.webp",
      title: "Diversas opções de viagem",
      description:
        "Escolha a categoria ideal para cada momento. Mais conforto, economia e praticidade para o seu dia a dia.",
    },
    {
      image: "/viagem2.webp",
      title: "Atendimento em aeroportos",
      description:
        "Solicite sua corrida para embarques e desembarques com rapidez, segurança e total comodidade.",
    },
    {
      image: "/viagem3.webp",
      title: "Disponível em toda a região",
      description:
        "Viaje com tranquilidade. A Maylon conecta você aos melhores motoristas onde precisar.",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-zinc-50 to-zinc-100 py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 2xl:py-28">

        {/* Background */}
        <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl sm:h-72 sm:w-72 lg:-top-32 lg:-right-32 lg:h-96 lg:w-96" />

        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl sm:h-96 sm:w-96 lg:-bottom-40 lg:-left-40 lg:h-[500px] lg:w-[500px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-0">

          <div
            className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,.12)] grid grid-cols-1 lg:grid-cols-[55%_45%]">

            {/* IMAGEM */}
            <div
              className="relative h-[260px] sm:h-[360px] md:h-[460px] lg:min-h-[650px] xl:min-h-[720px] overflow-hidden">
              <Image
                src="/hero_passageiro.png"
                alt="Maylon Passageiro"
                fill
                priority
                className="object-cover object-center transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

              {/* Card Flutuante */}
              <div className="absolute bottom-5 left-5 hidden rounded-2xl bg-white/90 p-5 shadow-xl backdrop-blur-xl md:block lg:bottom-8 lg:left-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
                  Mais de
                </p>

                <h3 className="mt-1 text-3xl font-black text-zinc-900">
                  100 mil
                </h3>

                <p className="text-zinc-600">
                  viagens realizadas
                </p>
              </div>
            </div>

            {/* CONTEÚDO */}
            <div
              className="relative flex items-center bg-gradient-to-br from-[#36b58f] via-[#249978] to-[#176d59] px-5 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
              <div className="relative z-10 w-full">
                {/* Badge */}
                <span
                  className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-xl sm:px-5 sm:text-xs">
                  Mobilidade Inteligente
                </span>

                {/* Título */}
                <h1
                  className="mt-6 max-w-xl text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                  Viaje com

                  <span className="block">
                    conforto,
                  </span>

                  <span className="block">
                    segurança e qualidade.
                  </span>
                </h1>

                {/* Texto */}
                <p
                  className="mt-6 max-w-xl text-sm leading-7 text-white/90 sm:text-base md:text-lg xl:text-xl">
                  A Maylon conecta você aos melhores motoristas parceiros,
                  oferecendo viagens rápidas, seguras e confortáveis com
                  tecnologia de ponta para proporcionar uma experiência
                  moderna em cada trajeto.
                </p>

                {/* Benefícios */}
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-white" />
                      <span className="text-sm font-medium text-white sm:text-base">
                        Motoristas verificados
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-white" />
                      <span className="text-sm font-medium text-white sm:text-base">
                        Pagamento seguro
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-white" />
                      <span className="text-sm font-medium text-white sm:text-base">
                        Rastreamento em tempo real
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-white" />
                      <span className="text-sm font-medium text-white sm:text-base">
                        Atendimento 24 horas
                      </span>
                    </div>
                  </div>

                </div>
                {/* Botões */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">

                  <Link
                    href="/passageiro"
                    className="
                inline-flex
                h-12
                w-full
                items-center
                justify-center
                rounded-full
                bg-white
                px-8
                font-bold
                text-[#239978]
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                sm:h-14
                sm:w-auto
                sm:px-10
              "
                  >
                    Baixar aplicativo
                  </Link>

                  <Link
                    href="/sobre"
                    className="
                inline-flex
                h-12
                w-full
                items-center
                justify-center
                rounded-full
                border
                border-white/30
                bg-white/10
                px-8
                font-semibold
                text-white
                backdrop-blur-lg
                transition-all
                duration-300
                hover:bg-white/20
                sm:h-14
                sm:w-auto
                sm:px-10
              ">
                    Saiba mais
                  </Link>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>





      <section className="relative overflow-hidden bg-gradient-to-br from-teal-950 via-emerald-950 to-teal-900 py-24">
        <div className="absolute inset-0">
          <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-teal-500/20 blur-[120px]" />
          <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-full border border-teal-400/20 bg-teal-500/10 px-4 py-2 text-sm font-semibold text-teal-300 backdrop-blur-md">
                ✨ Assinatura Premium
              </span>
              <h2 className="mt-6 text-5xl font-black leading-tight text-white lg:text-4xl">
                Maylon Pass
              </h2>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-3xl font-black text-teal-400">
                  R$ 59,99
                </span>
                <span className="mb-2 text-sm text-zinc-400">
                  /mês
                </span>
              </div>
              <p className="my-4 max-w-xl text-base leading-7 text-zinc-300 text-justify">
                Tenha acesso a benefícios exclusivos para você e sua
                família. Mais segurança, economia e suporte quando
                precisar.
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <div className="h-2.5 w-2.5 rounded-full bg-teal-400" />
                  Ambulância particular em situações de emergência
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="h-2.5 w-2.5 rounded-full bg-teal-400" />
                  Descontos especiais em viagens
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="h-2.5 w-2.5 rounded-full bg-teal-400" />
                  Atendimento prioritário
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="h-2.5 w-2.5 rounded-full bg-teal-400" />
                  Benefícios exclusivos para assinantes
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="h-2.5 w-2.5 rounded-full bg-teal-400" />
                  Promoções e campanhas especiais
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/maylon_pass"
                  className="inline-flex items-center justify-center rounded-2xl bg-teal-500 px-8 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-teal-400 hover:shadow-[0_20px_50px_rgba(20,184,166,0.3">
                  Assinar agora
                </Link>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative h-[450px] w-[450px]">
                <div className="absolute left-0 top-0 rotate-[-12deg] rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                  <div className="text-5xl">🚑</div>
                  <h3 className="mt-4 text-xl font-bold text-white">
                    Ambulância
                  </h3>
                  <p className="mt-2 text-zinc-300">
                    Cobertura emergencial.
                  </p>
                </div>
                <div className="absolute right-0 top-10 rotate-[15deg] rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                  <div className="text-5xl">🚖</div>
                  <h3 className="mt-4 text-xl font-bold text-white">
                    Descontos
                  </h3>
                  <p className="mt-2 text-zinc-300">
                    Economia em viagens.
                  </p>
                </div>
                <div className="absolute bottom-10 left-24 rotate-[-8deg] rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                  <div className="text-5xl">⭐</div>
                  <h3 className="mt-4 text-xl font-bold text-white">
                    Benefícios VIP
                  </h3>
                  <p className="mt-2 text-zinc-300">
                    Atendimento prioritário.
                  </p>
                </div>
                <div className="absolute inset-0 -z-10 m-auto h-72 w-72 rounded-full bg-teal-500/20 blur-[120px]" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-8 lg:py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="mb-9 max-w-3xl text-4xl font-black text-zinc-900 lg:text-3xl">
            Viaje do seu jeito com a Maylon
          </h2>
          <div className="grid gap-10 lg:grid-cols-3">
            {cards.map((card, index) => (
              <div key={index} className="group">
                <div className="overflow-hidden rounded-3xl">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={600}
                    height={500}
                    className="h-[380px] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-zinc-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-justify leading-8 text-zinc-600">
                  {card.description}
                </p>
              </div>
            ))}
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

      {openEspecialista && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5">
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
                onClick={() => setOpenEspecialista(false)}
                className="rounded-xl cursor-pointer bg-white/10 p-2 text-white transition hover:bg-red-500"
              >
                <X />
              </button>
            </div>
            <div className="max-h-[65vh] overflow-y-auto p-6">
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
                      placeholder="Nome da Empresa"
                      className="w-full rounded-xl border border-zinc-300 px-4 py-3 capitalize outline-none transition focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-zinc-700">
                      CNPJ *
                    </label>
                    <input
                      type="text"
                      value={cnpj}
                      onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
                      inputMode="numeric"
                      maxLength={18}
                      placeholder="00.000.000/0001-00"
                      className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-zinc-700">
                      Nome do Responsável *
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-zinc-300 px-4 py-3 capitalize outline-none transition focus:border-emerald-500"
                      placeholder="Nome completo"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-zinc-700">
                      Cargo
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                      placeholder="Ex.: Gerente Comercial"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-zinc-700">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                      placeholder="empresa@empresa.com.br"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-zinc-700">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="text"
                      value={telefone}
                      onChange={(e) => setTelefone(formatPhone(e.target.value))}
                      inputMode="numeric"
                      maxLength={15}
                      placeholder="(00) 00000-0000"
                      className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-zinc-700">
                      Cidade *
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-zinc-300 px-4 py-3 capitalize outline-none transition focus:border-emerald-500"
                      placeholder="Cidade"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-zinc-700">
                      Estado *
                    </label>
                    <select
                      defaultValue=""
                      className="w-full rounded-xl border border-zinc-300 text-sm cursor-pointer bg-white px-4 py-3 text-zinc-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
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
                      defaultValue=""
                      className="w-full rounded-xl border border-zinc-300 bg-white text-sm cursor-pointer px-4 py-3 text-zinc-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    >
                      <option value="" disabled>
                        Selecione um tipo de anúncio
                      </option>
                      <option value="banner-app">Banner no Aplicativo</option>
                      <option value="anuncio-veiculo">Anúncio no Veículo</option>
                      <option value="banner-app e anuncio-veiculo">Banner no Aplicativo e Anúncio no Veículo</option>
                      <option value="viagens">Viagens</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-zinc-700">
                      Quantidade de veículos (opcional)
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Ex.: 50"
                      className="w-full rounded-xl border border-zinc-300 bg-white text-sm px-4 py-3 text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-zinc-700">
                      Orçamento Previsto
                    </label>
                    <select
                      defaultValue=""
                      className="w-full rounded-xl border border-zinc-300 bg-white text-sm cursor-pointer px-4 py-3 text-zinc-900 placeholder:text-zinc-500 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    >
                      <option value="" disabled>
                        Selecione um orçamento
                      </option>
                      <option value="500">Até R$ 500/mês</option>
                      <option value="1000">R$ 500 a R$ 1.000/mês</option>
                      <option value="5000">R$ 1.000 a R$ 5.000/mês</option>
                      <option value="5001">Acima de R$ 5.000/mês</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-zinc-700">
                      Mensagem
                    </label>
                    <div className="relative">
                      <textarea
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
            <div className="flex flex-col gap-4 border-t border-zinc-200 p-6 sm:flex-row sm:justify-end">
              <button
                onClick={() => setOpenEspecialista(false)}
                className="cursor-pointer rounded-xl border border-zinc-300 bg-white px-8 py-3 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:bg-gray-100 hover:text-black"
              >
                Cancelar
              </button>
              <button
                className="rounded-xl cursor-pointer bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Enviar solicitação
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}