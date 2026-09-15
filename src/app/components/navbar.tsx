'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import {
  Menu,
  X,
  Car,
  User,
  MapPin,
  Building2,
  BookOpen,
  HelpCircle,
} from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const closeMobileMenu = () => {
    setIsOpen(false)
    setOpen(false)
  }

  return (
    <nav
      className="
        fixed
        top-0
        left-0
        z-50
        w-full
        border-b
        border-gray-200
        bg-[#f2f2f2]/95
        shadow-[0_4px_20px_rgba(0,0,0,0.08)]
        backdrop-blur-md
      "
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-[1600px]">
        <div className="flex h-16 items-center justify-between sm:h-[72px] md:h-[72px] lg:h-[72px] xl:h-[72px] 2xl:h-[72px]">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            onClick={closeMobileMenu}
          >
            <Image
              src="/logo.png"
              alt="Maylon Logo"
              width={180}
              height={40}
              priority
              className="
                h-auto
                w-45
                sm:w-52
                md:w-32
                lg:w-36
                xl:w-40
                2xl:w-44
              "
            />
          </Link>

          <div
            className="
              hidden
              items-center
              gap-3
              font-medium
              text-[#3bab88]
              md:flex
              lg:gap-4
              xl:gap-6
              2xl:gap-8
              text-[11px]
              lg:text-[13px]
              xl:text-sm
              2xl:text-sm
            "
          >
            <Link
              href="/cidade"
              className="
                flex
                items-center
                gap-1.5
                whitespace-nowrap
                transition
                hover:text-[#097b57]
              "
            >
              <MapPin size={16} />
              <span>Cidades</span>
            </Link>

            <Link
              href="/motorista"
              className="
                flex
                items-center
                gap-1.5
                whitespace-nowrap
                transition
                hover:text-[#097b57]
              "
            >
              <Car size={16} />
              <span>Motorista</span>
            </Link>

            <Link
              href="/passageiro"
              className="
                flex
                items-center
                gap-1.5
                whitespace-nowrap
                transition
                hover:text-[#097b57]
              "
            >
              <User size={16} />
              <span>Passageiro</span>
            </Link>

            <Link
              href="/empresas"
              className="
                flex
                items-center
                gap-1.5
                whitespace-nowrap
                transition
                hover:text-[#097b57]
              "
            >
              <Building2 size={16} />
              <span>Empresas</span>
            </Link>

            <Link
              href="/suporte"
              className="
                flex
                items-center
                gap-1.5
                whitespace-nowrap
                transition
                hover:text-[#097b57]
              "
            >
              <HelpCircle size={16} />
              <span>Suporte</span>
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                className="
                  ml-1
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#35a889]
                  px-3
                  py-2
                  text-[11px]
                  font-medium
                  whitespace-nowrap
                  text-white
                  transition
                  hover:bg-[#097b57]
                  lg:ml-2
                  lg:px-4
                  lg:text-[13px]
                  xl:text-sm
                "
              >
                <span className="text-base">♙</span>
                <span>Acessar Portais</span>

                <span
                  className={`
                    text-sm
                    leading-none
                    transition-transform
                    duration-300
                    ${open ? 'rotate-180' : ''}
                  `}
                >
                  ⌄
                </span>
              </button>

              {open && (
                <div
                  className="
                    absolute
                    right-0
                    top-full
                    z-50
                    mt-2
                    w-[180px]
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    py-1
                    text-black
                    shadow-xl
                  "
                >
                  <Link
                    href="/empresas/cadastro"
                    onClick={() => setOpen(false)}
                    className="
                      block
                      border-b
                      border-gray-200
                      px-4
                      py-3
                      text-[12px]
                      transition
                      hover:bg-gray-100
                      hover:text-[#35a889]
                    "
                  >
                    Quero Ser Motorista
                  </Link>

                  <Link
                    href="https://connect.maylon.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="
                      block
                      px-4
                      py-3
                      text-[12px]
                      transition
                      hover:bg-gray-100
                      hover:text-[#35a889]
                    "
                  >
                    Maylon Connect
                  </Link>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="
              text-[#3bab88]
              transition
              hover:text-[#097b57]
              md:hidden
            "
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`
          border-t
          border-gray-200
          bg-white
          transition-all
          duration-300
          md:hidden
          ${
            isOpen
              ? 'max-h-[1000px] opacity-100'
              : 'pointer-events-none max-h-0 overflow-hidden opacity-0'
          }
        `}
      >
        <div className="flex w-full flex-col space-y-5 px-6 py-6 text-sm font-medium text-gray-800">
          <Link
            href="/cidade"
            onClick={closeMobileMenu}
            className="
              flex
              items-center
              gap-3
              transition
              hover:text-[#35a889]
            "
          >
            <MapPin size={18} className="text-[#35a889]" />
            <span>Cidades</span>
          </Link>

          <Link
            href="/motorista"
            onClick={closeMobileMenu}
            className="
              flex
              items-center
              gap-3
              transition
              hover:text-[#35a889]
            "
          >
            <Car size={18} className="text-[#35a889]" />
            <span>Motorista</span>
          </Link>

          <Link
            href="/passageiro"
            onClick={closeMobileMenu}
            className="
              flex
              items-center
              gap-3
              transition
              hover:text-[#35a889]
            "
          >
            <User size={18} className="text-[#35a889]" />
            <span>Passageiro</span>
          </Link>

          <Link
            href="/empresas"
            onClick={closeMobileMenu}
            className="
              flex
              items-center
              gap-3
              transition
              hover:text-[#35a889]
            "
          >
            <Building2 size={18} className="text-[#35a889]" />
            <span>Empresas</span>
          </Link>

          <Link
            href="/conteudo"
            onClick={closeMobileMenu}
            className="
              flex
              items-center
              gap-3
              transition
              hover:text-[#35a889]
            "
          >
            <BookOpen size={18} className="text-[#35a889]" />
            <span>Conteúdo</span>
          </Link>

          <Link
            href="/suporte"
            onClick={closeMobileMenu}
            className="
              flex
              items-center
              gap-3
              transition
              hover:text-[#35a889]
            "
          >
            <HelpCircle size={18} className="text-[#35a889]" />
            <span>Central de Suporte</span>
          </Link>

          <div className="w-full pt-1 md:hidden">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              className="
                relative
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                bg-[#35a889]
                px-4
                py-3
                text-sm
                font-medium
                text-white
                transition
                hover:bg-[#097b57]
                active:scale-[0.99]
              "
            >
              <span className="flex items-center gap-2">
                <span className="text-base">♙</span>
                <span>Acessar Portais</span>
              </span>

              <span
                className={`
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-lg
                  leading-none
                  transition-transform
                  duration-300
                  ${open ? 'rotate-180' : ''}
                `}
              >
                ⌄
              </span>
            </button>

            <div
              className={`
                grid
                transition-all
                duration-300
                ${
                  open
                    ? 'mt-2 grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }
              `}
            >
              <div className="overflow-hidden">
                <div
                  className="
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                  "
                >
                  <Link
                    href="/empresas/cadastro"
                    onClick={closeMobileMenu}
                    className="
                      block
                      border-b
                      border-gray-200
                      px-4
                      py-3
                      text-sm
                      text-gray-800
                      transition
                      hover:bg-white
                      hover:text-[#35a889]
                    "
                  >
                    Quero Ser Motorista
                  </Link>

                  <Link
                    href="https://connect.maylon.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className="
                      block
                      px-4
                      py-3
                      text-sm
                      text-gray-800
                      transition
                      hover:bg-white
                      hover:text-[#35a889]
                    "
                  >
                    Maylon Connect
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}