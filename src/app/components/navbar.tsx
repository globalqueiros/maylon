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

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#f2f2f2]/95 backdrop-blur-md border-b border-gray-200 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">      
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">        
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-18 lg:h-18 xl:h-18 2xl:h-18">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Maylon Logo"
              width={180}
              height={40}
              priority
              className="
                w-45
                sm:w-52
                md:w-32
                lg:w-36
                xl:w-40
                2xl:w-44
                h-auto
              "
            />
          </Link>
          <div className="
              hidden md:flex items-center
              gap-3 lg:gap-4 xl:gap-6 2xl:gap-8
              text-[11px] lg:text-[13px] xl:text-sm 2xl:text-sm
              font-medium text-[#3bab88]">
            <Link
              href="/cidade"
              className="flex items-center gap-1.5 hover:text-[#097b57] transition whitespace-nowrap"
            >
              <MapPin size={16} />
              <span>Cidades</span>
            </Link>
            <Link
              href="/motorista"
              className="flex items-center gap-1.5 hover:text-[#097b57] transition whitespace-nowrap"
            >
              <Car size={16} />
              <span>Motorista</span>
            </Link>
            <Link
              href="/passageiro"
              className="flex items-center gap-1.5 hover:text-[#097b57] transition whitespace-nowrap"
            >
              <User size={16} />
              <span>Passageiro</span>
            </Link>
            <Link
              href="/empresas"
              className="flex items-center gap-1.5 hover:text-[#097b57] transition whitespace-nowrap"
            >
              <Building2 size={16} />
              <span>Empresas</span>
            </Link>
            <Link
              href="/suporte"
              className="flex items-center gap-1.5 hover:text-[#097b57] transition whitespace-nowrap"
            >
              <HelpCircle size={16} />
              <span>Suporte</span>
            </Link>
            <Link
              href="/quero_ser_motorista"
              className="
                bg-[#3bab88]
                text-white
                px-3 lg:px-4
                py-2
                rounded-full
                text-[11px] lg:text-[13px] xl:text-sm
                font-medium
                hover:bg-[#097b57]
                transition
                whitespace-nowrap
                ml-1 lg:ml-2">
              Quero ser motorista
            </Link>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#3bab88]"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      <div
        className={`
          md:hidden
          bg-white
          border-t
          border-gray-200
          transition-all
          duration-300
          overflow-hidden
          ${isOpen ? 'max-h-screen py-6' : 'max-h-0'}
        `}
      >
        <div className="px-6 flex flex-col space-y-5 text-sm font-medium text-gray-800">          
          <Link
            href="/cidade"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3"
          >
            <MapPin size={18} />
            Cidades
          </Link>
          <Link
            href="/motorista"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3"
          >
            <Car size={18} />
            Motorista
          </Link>
          <Link
            href="/passageiro"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3"
          >
            <User size={18} />
            Passageiro
          </Link>
          <Link
            href="/empresas"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3"
          >
            <Building2 size={18} />
            Empresas
          </Link>
          <Link
            href="/conteudo"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3"
          >
            <BookOpen size={18} />
            Conteúdo
          </Link>
          <Link
            href="/suporte"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3"
          >
            <HelpCircle size={18} />
            Central de Suporte
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=com.maylon.driverr&hl=pt_BR"
            onClick={() => setIsOpen(false)}
            className="
              bg-[#3bab88]
              text-white
              text-center
              py-3
              rounded-full
              hover:bg-[#097b57]
              transition">
            Quero ser motorista
          </Link>
        </div>
      </div>
    </nav>
  )
}