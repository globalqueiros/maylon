"use client";

import { useEffect } from "react";

const HUGGY_SCRIPT_ID = "huggy-chat-widget-script";
const HUGGY_LOADER_ID = "huggy-chat-loader";

declare global {
  interface Window {
    $_Huggy?: {
      defaultCountry: string;
      uuid: string;
      company: string;
    };

    pwz?: {
      context: {
        id: string;
      };
    };

    __HUGGY_INITIALIZED__?: boolean;
  }
}

export default function NvoipWidget() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Impede inicializações duplicadas
    if (window.__HUGGY_INITIALIZED__) {
      return;
    }

    // Verifica se o script já foi inserido no documento
    const scriptExistente = document.getElementById(
      HUGGY_SCRIPT_ID
    );

    const loaderExistente = document.getElementById(
      HUGGY_LOADER_ID
    );

    if (scriptExistente || loaderExistente) {
      window.__HUGGY_INITIALIZED__ = true;
      return;
    }

    // Configuração do Huggy
    window.$_Huggy = {
      defaultCountry: "+55",
      uuid: "2899aa9e-fddf-44cf-9bc1-0c66f858da06",
      company: "349867",
    };

    // Configuração do contexto
    window.pwz = {
      context: {
        id: "92a95f06b713c4d664238eaabe87870f",
      },
    };

    // Marca como inicializado antes de carregar o script
    window.__HUGGY_INITIALIZED__ = true;

    // Cria o script externo do Huggy
    const script = document.createElement("script");

    script.id = HUGGY_SCRIPT_ID;
    script.src = "https://js.huggy.chat/widget.min.js";
    script.async = true;
    script.type = "text/javascript";

    document.body.appendChild(script);
  }, []);

  // Não renderiza elementos visuais
  return null;
}