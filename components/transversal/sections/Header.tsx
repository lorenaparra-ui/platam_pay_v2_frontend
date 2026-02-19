"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Button } from "@/components/transversal/buttons/Button";
import { Menu, X } from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Primary logo component or element to display on the left.
   */
  primaryLogo: React.ReactNode;
  /**
   * Optional secondary logo to display next to the primary one.
   */
  secondaryLogo?: React.ReactNode;
  /**
   * Array of navigation items to display in the center (desktop) or menu (mobile).
   */
  navigation?: NavigationItem[];
  /**
   * Content to display on the right side (e.g., buttons).
   */
  actions?: React.ReactNode;
  /**
   * Whether to make the header sticky at the top.
   */
  sticky?: boolean;
}

export function Header({
  className,
  primaryLogo,
  secondaryLogo,
  navigation = [],
  actions,
  sticky = false,
  ...props
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "w-full z-50 transition-colors duration-300",
        "dark:bg-dark-900 dark:border border-primary-400/30 bg-light-950  backdrop-blur-md border-b border-light-800 dark:border-dark-800/50",
        sticky && "sticky top-0",
        className
      )}
      {...props}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logos Section */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center">
              {primaryLogo}
            </div>
            {secondaryLogo && (
              <>
                <div className="h-6 w-px bg-light-300 dark:bg-dark-700 hidden sm:block" />
                <div className="flex items-center">
                  {secondaryLogo}
                </div>
              </>
            )}
          </div>

          {/* Desktop Navigation */}
          {navigation.length > 0 && (
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-light-50 antialiased hover:text-primary-600 dark:text-white dark:hover:text-primary-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {actions}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             {/* Show actions on mobile header if needed, or move them inside menu */}
             {/* For now, keeping actions hidden on mobile header bar to save space, 
                 or showing simplified version could be an option. 
                 Let's put the toggle here. */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="md:hidden text-light-600 dark:text-dark-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-light-50 dark:bg-dark-950 border-b border-light-200 dark:border-dark-800 shadow-lg animate-in slide-in-from-top-5">
          <div className="px-4 py-6 space-y-6">
            {navigation.length > 0 && (
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-base font-medium text-light-600 hover:text-primary-600 dark:text-dark-300 dark:hover:text-primary-400 transition-colors block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}
            
            {actions && (
              <div className="pt-4 border-t border-light-200 dark:border-dark-800 flex flex-col gap-4">
                {actions}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}