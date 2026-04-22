import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from '../app/components/navbar';
import Footer from '../app/components/footer';
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://maylon.com.br"),

  title: {
    default: "Maylon | Solicite uma viagem ou seja motorista parceiro",
    template: "%s | Maylon",
  },

  description:
    "Maylon é o aplicativo de transporte mais econômico. Solicite sua viagem com rapidez e segurança ou cadastre-se como motorista parceiro.",

  keywords: [
    "Maylon",
    "aplicativo de transporte",
    "motorista parceiro",
    "corrida barata",
    "transporte urbano",
  ],

  authors: [{ name: "Time Global Queirós Corporation" }],

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },

  themeColor: "#37a788",

  openGraph: {
    title: "Maylon | Solicite uma viagem ou seja motorista parceiro",
    description:
      "Aplicativo de transporte mais barato. Peça sua viagem agora ou torne-se motorista parceiro.",
    url: "https://maylon.com.br",
    siteName: "Maylon",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/img/favicon.png",
        width: 512,
        height: 512,
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
    <html lang="pt-BR">
      <body>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}