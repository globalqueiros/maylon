"use client";

import React, {
  Component,
  ErrorInfo,
  ReactNode,
} from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class GracefullyDegradingErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);

    // Você pode enviar o erro para seu serviço de monitoramento aqui.
    console.error("Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex min-h-[300px] items-center justify-center bg-[#f8fafc] px-6">
          <div className="w-full max-w-md text-center">
            <span className="text-sm font-semibold text-teal-600">
              Erro Inesperado
            </span>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#17324d]">
              Ops! Algo deu errado
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Ocorreu um erro ao carregar este conteúdo.
              Tente novamente ou atualize a página.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="
                mt-6
                inline-flex
                h-11
                items-center
                justify-center
                rounded-xl
                bg-teal-600
                px-6
                text-sm
                font-semibold
                text-white
                shadow-md
                shadow-teal-600/20
                transition
                hover:bg-teal-700
                focus:outline-none
                focus:ring-2
                focus:ring-teal-500
                focus:ring-offset-2
              "
            >
              Tentar novamente
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GracefullyDegradingErrorBoundary;