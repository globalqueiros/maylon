"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

interface ErrorPageProps {
  code: string;
  title: string;
  description: string;
  retry?: () => void;
}

export default function ErrorPage({
  code,
  title,
  description,
  retry,
}: ErrorPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[#f8fafc] px-5 py-4">
      <div className="w-full max-w-2xl text-center">
        <div className="relative">
          <div
            className="
              select-none
              text-[90px]
              font-black
              leading-[0.7]
              tracking-[-0.08em]
              text-[#e5ebe9]
              sm:text-[120px]
              md:text-[140px]
            "
          >
            {code}
          </div>

          {/* Carro */}
          <div
            className="
              relative
              z-10
              mx-auto
              -mt-2
              h-[190px]
              w-full
              max-w-[520px]
              sm:-mt-5
              sm:h-[220px]
              sm:max-w-[580px]
            "
          >
            <Image
              src="/bg-carro.png"
              alt="Carro Maylon"
              fill
              priority
              sizes="(max-width: 640px) 90vw, 580px"
              className="
                object-contain
                drop-shadow-[0_18px_16px_rgba(0,0,0,0.10)]
              "
            />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="relative z-20 -mt-1">

          {/* Badge */}
          <span
            className="
              inline-flex
              rounded-full
              bg-teal-600/10
              px-3.5
              py-1
              text-xs
              font-semibold
              tracking-wide
              text-teal-700
            "
          >
            ERRO {code}
          </span>

          {/* Título */}
          <h1
            className="
              mt-2
              text-2xl
              font-bold
              leading-tight
              tracking-tight
              text-[#17324d]
              sm:text-3xl
            "
          >
            {title}
          </h1>

          {/* Descrição */}
          <p
            className="
              mx-auto
              mt-2
              max-w-md
              text-sm
              leading-5
              text-slate-500
            "
          >
            {description}
          </p>
        </div>

        {/* Ações */}
        <div
          className="
            mt-5
            flex
            flex-col
            items-center
            justify-center
            gap-2.5
            sm:flex-row
          "
        >
          {retry && (
            <button
              type="button"
              onClick={retry}
              className="
                inline-flex
                h-10
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-teal-600
                px-5
                text-sm
                font-semibold
                text-white
                shadow-md
                shadow-teal-600/20
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-teal-700
                hover:shadow-lg
                focus:outline-none
                focus:ring-2
                focus:ring-teal-500
                focus:ring-offset-2
                active:translate-y-0
              "
            >
              <RefreshCw size={16} />
              Tentar novamente
            </button>
          )}

          <Link
            href="/"
            className="
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              text-sm
              font-semibold
              text-[#17324d]
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-slate-50
              hover:shadow
              focus:outline-none
              focus:ring-2
              focus:ring-teal-500
              focus:ring-offset-2
              active:translate-y-0
            "
          >
            <ArrowLeft size={16} />
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
