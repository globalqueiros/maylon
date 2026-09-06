"use client";

import { useEffect } from "react";

export default function NvoipWidget() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.getElementById("nvoip-init-widget")) return;

    const script = document.createElement("script");

    script.id = "nvoip-init-widget";
    script.src =
      "https://content.nvoip.com.br/widget/nvoip-widget-loader.js?public-token=693d7e052a1559c662e39588732dc5150de0e30e";
    script.async = true;

    document.body.appendChild(script);

    return () => {
    };
  }, []);

  return null;
}