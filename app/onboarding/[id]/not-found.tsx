import Link from "next/link";

export default function OnboardingNotFound() {
  return (
    <div className="min-h-screen bg-light-50 dark:bg-dark-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-bold text-light-50 dark:text-white">
          Partner no encontrado
        </h1>
        <p className="text-light-200 dark:text-dark-300">
          El enlace de onboarding no es válido o el partner ya no está disponible.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
