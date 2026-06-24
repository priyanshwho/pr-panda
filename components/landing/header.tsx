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
    <header className="sticky top-0 z-50 w-full bg-transparent border-none shadow-none">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <button 
          onClick={onLogoClick}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90 cursor-pointer"
          aria-label="PR PANDA Home"
        >
          <span className="text-2xl">🐼</span>
          <span className="text-xl font-black tracking-wider uppercase text-foreground">
            PR PANDA
          </span>
        </button>

        <div className="flex items-center gap-6">
          {currentSection !== 'home' && (
            <span className="hidden sm:inline-block font-semibold tracking-wider text-[10px] bg-muted px-2.5 py-1 rounded-full border border-border uppercase text-muted-foreground">
              {currentSection}
            </span>
          )}

          <div className="flex items-center gap-4">
            <ModeToggle />
            {isPending ? (
              <div className="h-9 w-28 animate-pulse rounded-md bg-muted" />
            ) : session ? (
              <Link href="/dashboard" className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white hover:text-white font-bold uppercase tracking-wider text-[11px] px-4 py-2.5 rounded-lg transition-all duration-300 shadow-md shadow-red-600/10 hover:shadow-red-600/20 hover:scale-[1.01] flex items-center gap-1.5">
                Dashboard <ArrowRight className="size-4" />
              </Link>
            ) : (
              <Link href="/sign-in" className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white hover:text-white font-bold uppercase tracking-wider text-[11px] px-4 py-2.5 rounded-lg transition-all duration-300 shadow-md shadow-red-600/10 hover:shadow-red-600/20 hover:scale-[1.01]">
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
