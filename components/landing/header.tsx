"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react";

export function Header() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <span className="text-2xl">🐼</span>
          <span className="bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-xl font-bold tracking-tight text-transparent">
            PR Panda
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            How it Works
          </a>
          <a href="#testimonials" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Testimonials
          </a>
          <a href="#faqs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            FAQs
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          {isPending ? (
            <div className="h-9 w-28 animate-pulse rounded-md bg-muted" />
          ) : session ? (
            <Link href="/dashboard" className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}>
              Dashboard <ArrowRight className="size-4" />
            </Link>
          ) : (
            <Link href="/sign-in" className={cn(buttonVariants({ size: "sm" }))}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
