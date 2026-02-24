"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[Partner Error]:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-light-950 dark:bg-dark-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-dark-900 rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-light-50 dark:text-white mb-2">
          Error al cargar el partner
        </h2>

        <p className="text-light-100 dark:text-dark-300 mb-6">
          {error.message || "Ha ocurrido un error inesperado. Por favor, intenta nuevamente."}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
          >
            Intentar nuevamente
          </button>

          <a
            href="/"
            className="w-full px-6 py-3 border border-light-300 dark:border-dark-600 text-light-100 dark:text-dark-300 font-medium rounded-lg hover:bg-light-100 dark:hover:bg-dark-800 transition-colors"
          >
            Volver al inicio
          </a>
        </div>

        {error.digest && (
          <p className="mt-6 text-xs text-light-200 dark:text-dark-400">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
