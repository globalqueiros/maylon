"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGooglePlay,
  faWhatsapp,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#35a989] text-zinc-200">
      <div className="max-w-7xl mx-auto px-0 py-7 pb-0">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Image
              src="/maylon_logo_branco.png"
              alt="Logo Maylon"
              width={220}
              height={200}
              className="mb-4"
            />

            <h3 className="text-white font-semibold mb-3">
              Redes sociais
            </h3>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.facebook.com/maylonapp/"
                target="_blank"
                className="bg-white/20 p-3 rounded-lg hover:bg-white/30 transition"
              >
                <FontAwesomeIcon icon={faFacebook} className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/maylonapp"
                target="_blank"
                className="bg-white/20 p-3 rounded-lg hover:bg-white/30 transition"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://wa.me/5511974204958"
                target="_blank"
                className="bg-white/20 p-3 rounded-lg hover:bg-white/30 transition"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://t.me/maylontrip_bot"
                target="_blank"
                className="bg-white/20 p-3 rounded-lg hover:bg-white/30 transition"
              >
                <FontAwesomeIcon icon={faTelegram} className="w-5 h-5 text-white" />
              </a>
            </div>

            <h3 className="text-white font-semibold mb-3">
              Baixe o app
            </h3>
            <a
              href="https://play.google.com/store/apps/details?id=com.maylon.rider&hl=pt_BR"
              target="_blank"
              className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition"
            >
              <FontAwesomeIcon icon={faGooglePlay} className="w-5 h-5 text-white" />
              <span className="text-sm text-white">Google Play</span>
            </a>
          </div>

          <div>
            <h3 className="!text-xl text-white font-semibold mb-3">
              Empresa
            </h3>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <Link href="/quem_somos" className="hover:text-[#097b57] transition">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/seguranca" className="hover:text-[#097b57] transition">
                  Segurança
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#097b57] transition">
                  Cidades
                </Link>
              </li>
              <li>
                <Link href="/motoristas" className="hover:text-[#097b57] transition">
                  Motoristas
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="!text-lg text-white font-semibold mb-3">
              Contato
            </h3>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <Link href="/contato" className="hover:text-[#097b57] transition">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="https://career.groupqueiros.com/" className="hover:text-[#097b57] transition">
                  Trabalhe com a gente
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-6 py-4 text-xs text-zinc-100 flex items-center justify-center gap-2">
          <span> © {new Date().getFullYear()} Maylon Trip Tecnologia LTDA. Todos os direitos reservados | Uma empresa </span>
          <Link href="https://groupqueiros.com/brazil" target="_blank" className="hover:text-white">
            <Image src="/queiros.png" alt="Queirós Corporation" width={110} height={110} />
          </Link>
        </div>
      </div>
    </footer>
  );
}