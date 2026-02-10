"use client";
import { ThemeToggle } from "../components/transversal/ThemeToggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground font-sans transition-colors duration-300 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <main className="flex flex-col items-center justify-center gap-8 p-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Platam Design System
        </h1>
        <p className="text-lg opacity-80 max-w-2xl">
          Example of Light/Dark mode switching with persistent state and hydration fix.
        </p>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 w-full max-w-4xl mt-8">
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm flex flex-col gap-2 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary mb-2 flex items-center justify-center text-primary-foreground font-bold">P</div>
            <h3 className="font-semibold text-lg">Primary Color</h3>
            <p className="text-sm opacity-80">Used for main actions and branding.</p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm flex flex-col gap-2 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-secondary mb-2 flex items-center justify-center text-secondary-foreground font-bold">S</div>
            <h3 className="font-semibold text-lg">Secondary Color</h3>
            <p className="text-sm opacity-80">Used for supporting actions.</p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm flex flex-col gap-2 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-tertiary mb-2 flex items-center justify-center text-tertiary-foreground font-bold">T</div>
            <h3 className="font-semibold text-lg">Tertiary Color</h3>
            <p className="text-sm opacity-80">Used for accents and highlights.</p>
          </div>
        </div>
      </main>
    </div>
  );
}