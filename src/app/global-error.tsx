"use client";

import ErrorPage from "./components/ErrorPage";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ErrorPage
          code="500"
          title="Erro crítico"
          description="A aplicação encontrou um problema inesperado. Tente novamente ou volte para o início."
          retry={reset}
        />
      </body>
    </html>
  );
}
