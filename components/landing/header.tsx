"use client";

import React from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react";

interface HeaderProps {
  onLogoClick: () => void;
  currentSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick, currentSection }) => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent transition-all duration-500 ease-in-out hover:bg-background/30 hover:backdrop-blur-xl border-b border-transparent hover:border-border/20">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-8">
        <button 
          onClick={onLogoClick}
          className="flex items-center gap-2.5 transition-all duration-300 hover:opacity-80 active:scale-95 cursor-pointer"
          aria-label="PR PANDA Home"
        >
          <img src="/logo2.png" alt="PR PANDA Logo" className="h-8 w-auto filter drop-shadow-[0_0_8px_rgba(239,68,68,0.2)]" />
          <span className="text-xl font-black tracking-wider uppercase bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
            PR PANDA
          </span>
        </button>

        <div className="flex items-center gap-6">
          {currentSection !== 'home' && (
            <span className="hidden sm:inline-block font-semibold tracking-wider text-[10px] bg-muted/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/40 uppercase text-muted-foreground transition-all duration-300">
              {currentSection}
            </span>
          )}

          <div className="flex items-center gap-4">
            <ModeToggle />
            {isPending ? (
              <div className="h-9 w-28 animate-pulse rounded-md bg-muted" />
            ) : session ? (
              <Link href="/dashboard" className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white hover:text-white font-bold uppercase tracking-wider text-[11px] px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md shadow-red-600/10 hover:shadow-red-600/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5">
                Dashboard <ArrowRight className="size-4" />
              </Link>
            ) : (
              <Link href="/sign-in" className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white hover:text-white font-bold uppercase tracking-wider text-[11px] px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md shadow-red-600/10 hover:shadow-red-600/20 hover:scale-[1.02] active:scale-[0.98]">
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
