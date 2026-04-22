'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Car, User, MapPin, Building2, BookOpen, HelpCircle} from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#f2f2f2] border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Maylon Logo"
              width={180}
              height={40}
              priority
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#3bab88]">
            <Link href="cidade" className="flex items-center gap-2 hover:text-[#097b57]">
              <MapPin size={18} />
              Cidades
            </Link>
            <Link href="/motorista" className="flex items-center gap-2 hover:text-[#097b57]">
              <Car size={18} />
              Motorista
            </Link>
            <Link href="/passageiro" className="flex items-center gap-2 hover:text-[#097b57]">
              <User size={18} />
              Passageiro
            </Link>

            <Link href="empresas" className="flex items-center gap-2 hover:text-[#097b57]">
              <Building2 size={18} />
              Empresas
            </Link>
            <Link href="conteudo" className="flex items-center gap-2 hover:text-[#097b57]">
              <BookOpen size={18} />
              Conteúdo
            </Link>
            <Link href="suporte" className="flex items-center gap-2 hover:text-[#097b57]">
              <HelpCircle size={18} />
              Central de Suporte
            </Link>
            <Link href="/motorista"
              className="bg-[#3bab88] text-white px-5 py-2 rounded-full font-medium hover:bg-[#097b57] transition"
            >
              Quero ser motorista
            </Link>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t transition-all duration-300 ${
          isOpen ? 'max-h-screen py-6' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="px-6 flex flex-col space-y-5 text-gray-800">
          <Link href="/motorista" onClick={() => setIsOpen(false)}>
            Motorista
          </Link>
          <Link href="/passageiro" onClick={() => setIsOpen(false)}>
            Passageiro
          </Link>
          <Link href="#">
            99Food
          </Link>
          <Link href="#">
            99Pay
          </Link>
          <Link href="#">
            Empresas
          </Link>
          <Link href="#">
            Conteúdo
          </Link>
          <Link href="#">
            Ajuda
          </Link>
        </div>
      </div>
    </nav>
  )
}