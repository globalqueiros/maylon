"use client";

import Script from "next/script";

export default function VLibras() {
  return (
    <>
      <div
        {...({ vw: "true" } as React.HTMLAttributes<HTMLDivElement>)}
        className="enabled"
      >
        <div
          {...({ "vw-access-button": "true" } as React.HTMLAttributes<HTMLDivElement>)}
          className="active"
        ></div>

        <div
          {...({ "vw-plugin-wrapper": "true" } as React.HTMLAttributes<HTMLDivElement>)}
        >
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>

      <Script
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && "VLibras" in window) {
            // @ts-expect-error VLibras é injetado pelo script externo
            new window.VLibras.Widget(
              "https://vlibras.gov.br/app"
            );
          }
        }}
      />
    </>
  );
}
