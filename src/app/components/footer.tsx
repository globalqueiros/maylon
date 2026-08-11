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
    <footer className="bg-[#35a989] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-8 pb-[2vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-8">
          <div className="xl:col-span-2">
            <Image
              src="/maylon_logo_branco.png"
              alt="Logo Maylon"
              width={220}
              height={200}
              className="w-40 sm:w-48 lg:w-52 h-auto mb-4"
            />
            <div className="mb-8">
              <h3 className="text-xl lg:text-lg xl:text-lg 2xl:text-lg font-bold mb-3">
                Redes sociais
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  {
                    href: "https://www.facebook.com/maylonapp/",
                    icon: faFacebook,
                  },
                  {
                    href: "https://www.instagram.com/maylonapp",
                    icon: faInstagram,
                  },
                  {
                    href: "https://wa.me/5511974204958",
                    icon: faWhatsapp,
                  },
                  {
                    href: "https://t.me/maylontrip_bot",
                    icon: faTelegram,
                  },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 transition duration-300"
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="w-5 h-5"
                    />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl lg:text-lg xl:text-lg 2xl:text-lg font-bold mb-3">
                Baixe o app
              </h3>
              <a
                href="https://play.google.com/store/apps/details?id=com.maylon.rider&hl=pt_BR"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white/15 hover:bg-white/25 transition duration-300 px-5 py-3 rounded-xl"
              >
                <FontAwesomeIcon
                  icon={faGooglePlay}
                  className="w-5 h-5"
                />
                <span className="text-sm sm:text-base font-medium">
                  Google Play
                </span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-2xl lg:text-xl xl:text-lg 2xl:text-lg font-bold mb-3">
              Empresa
            </h3>
            <ul className="space-y-3 md:space-y-3 lg:space-y-2 xl:space-y-2 2xl:space-y-3 text-sm sm:text-base md:text-sm lg:text-sm xl:text-sm 2xl:text-sm">
              <li>
                <Link
                  href="/quem_somos"
                  className="hover:text-zinc-200 transition"
                >
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link
                  href="/seguranca"
                  className="hover:text-zinc-200 transition"
                >
                  Segurança
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-zinc-200 transition"
                >
                  Cidades
                </Link>
              </li>
              <li>
                <Link
                  href="/motoristas"
                  className="hover:text-zinc-200 transition"
                >
                  Motoristas
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl lg:text-lg xl:text-lg 2xl:text-lg font-bold mb-3">
              Contato
            </h3>
            <ul className="space-y-3 md:space-y-3 lg:space-y-2 xl:space-y-2 2xl:space-y-3 text-sm sm:text-base md:text-sm lg:text-sm xl:text-sm 2xl:text-sm">
              <li>
                <Link
                  href="/suporte"
                  className="hover:text-zinc-200 transition"
                >
                  Suporte
                </Link>
              </li>
              <li>
                <Link
                  href="https://career.groupqueiros.com/"
                  target="_blank"
                  className="hover:text-zinc-200 transition"
                >
                  Trabalhe com a gente
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center md:text-left">
            <p className="text-xs sm:text-sm md:text-xs lg:text-xs xl:text-sm 2xl:text-sm leading-relaxed text-white/90">
              © {new Date().getFullYear()} Maylon Trip Tecnologia LTDA. Todos os direitos reservados | Uma empresa
            </p>
            <Link
              href="https://groupqueiros.com/brazil"
              target="_blank"
              className="hover:opacity-80 transition flex items-center"
            >
              <Image
                src="/queiros.png"
                alt="Queirós Corporation"
                width={90}
                height={30}
                className="
                  w-16
                  sm:w-18
                  md:w-20
                  lg:w-20
                  xl:w-24
                  2xl:w-24
                  h-auto
                "
              />
            </Link>

          </div>
        </div>
      </div>
    </footer>
  );
}