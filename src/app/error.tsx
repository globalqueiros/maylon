"use client";
import ErrorPage from "./components/ErrorPage";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      code="500"
      title="Ops! Algo deu errado"
      description="Ocorreu um erro inesperado ao processar sua solicitação. Tente novamente."
      retry={reset}
    />
  );
}
