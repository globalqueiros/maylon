import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from '../app/components/navbar';
import Footer from '../app/components/footer';
import Script from "next/script";
import VLibras from "../lib/vlibras";

export const metadata: Metadata = {
  title: {
    default: "Maylon | Movendo pessoas, conectando destinos",
    template: "%s | Maylon",
  },
  description: "Maylon é o aplicativo de transporte mais econômico. Solicite sua viagem com rapidez e segurança ou cadastre-se como motorista parceiro.",
  keywords: [
    "Maylon",
    "Maylon Trip",
    "aplicativo de transporte",
    "motorista parceiro",
    "corrida barata",
    "transporte urbano",
  ],
  authors: [{
    name: "Time Global Queirós Corporation"
  }],
  twitter: {
    card: "summary_large_image",
    title: "Maylon - Mobilidade Segura para Mulheres",
    description:
      "Mais segurança, confiança e conforto em cada viagem.",
    images: ["/thumb.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  themeColor: "#3bab88",
  openGraph: {
    title: "Maylon | Movendo pessoas, conectando destinos",
    description:
      "Aplicativo de transporte mais barato. Peça sua viagem agora ou torne-se motorista parceiro.",
    url: "https://maylon.com.br",
    siteName: "Maylon",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/thumb.png",
        width: 1200,
        height: 630,
        alt: "Maylon - Mobilidade Segura para Mulheres",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Navbar />
        <main className="pt-16">
          <VLibras />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}