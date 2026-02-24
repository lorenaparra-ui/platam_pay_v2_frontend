export default function Loading() {
  return (
    <div className="min-h-screen bg-light-950 dark:bg-dark-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-light-100 dark:text-dark-300 text-lg">
          Cargando información del partner...
        </p>
      </div>
    </div>
  );
}
