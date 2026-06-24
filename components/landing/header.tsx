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
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <button 
          onClick={onLogoClick}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90 cursor-pointer"
          aria-label="PR PANDA Home"
        >
          <span className="text-2xl">🐼</span>
          <span className="bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-xl font-black tracking-wider text-transparent uppercase">
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
              <Link href="/dashboard" className={cn(buttonVariants({ size: "sm" }), "gap-1.5 font-bold uppercase tracking-wider text-[11px]")}>
                Dashboard <ArrowRight className="size-4" />
              </Link>
            ) : (
              <Link href="/sign-in" className={cn(buttonVariants({ size: "sm" }), "font-bold uppercase tracking-wider text-[11px]")}>
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
