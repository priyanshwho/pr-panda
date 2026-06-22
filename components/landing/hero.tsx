"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Sparkle, ArrowRight, GithubLogo } from "@phosphor-icons/react";

export function Hero() {
  const { data: session } = authClient.useSession();

  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 text-center md:pt-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border bg-muted/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          <Sparkle className="size-3.5 text-primary" /> Introducing PR Panda for GitHub Apps
        </div>

        <h1 className="bg-gradient-to-b from-foreground via-foreground to-muted-foreground bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          Automate your Code Reviews with AI. Instantly.
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
          Install PR Panda on your repositories. Get context-aware scans, RAG codebase index search, security reviews, and line-by-line feedback posted directly to your pull requests in seconds.
        </p>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Link
            href={session ? "/dashboard" : "/sign-in"}
            className={cn(buttonVariants({ size: "lg" }), "h-12 px-6 gap-2")}
          >
            Get Started Free <ArrowRight className="size-4" />
          </Link>
          <a
            href={process.env.NEXT_PUBLIC_GITHUB_PBLIC_LINK || "https://github.com"}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 px-6 gap-2")}
          >
            <GithubLogo className="size-5" /> Install GitHub App
          </a>
        </div>
      </div>

      {/* Code Review Mockup Illustration */}
      <div className="mt-16 md:mt-24">
        <div className="rounded-xl border bg-card p-2 shadow-2xl shadow-primary/5">
          <div className="rounded-lg border bg-zinc-950 p-4 text-left font-mono text-xs text-zinc-100 dark:bg-black md:p-6 md:text-sm">
            <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-2 text-zinc-400">features/auth/lib/routes.ts</span>
              </div>
              <div className="text-zinc-500">Pull Request #23</div>
            </div>
            <div className="space-y-1">
              <div className="text-zinc-600">@@ -8,12 +8,15 @@ export const routes = &#123;</div>
              <div className="bg-red-950/40 text-red-400">-   login: "/login",</div>
              <div className="bg-green-950/40 text-green-400">+   signIn: "/sign-in",</div>
              <div className="bg-green-950/40 text-green-400">+   signUp: "/sign-up",</div>
              <div className="bg-green-950/40 text-green-400">+   callback: "/api/auth/callback/github",</div>
              <div className="text-zinc-400">    dashboard: "/dashboard",</div>
            </div>

            {/* AI Comment Box */}
            <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4 md:ml-8">
              <div className="flex items-center gap-2 border-b border-primary/10 pb-2">
                <span className="text-lg">🐼</span>
                <div className="flex flex-col">
                  <span className="font-semibold text-zinc-100">PR Panda</span>
                  <span className="text-[10px] text-primary/70">AI REVIEWER • JUST NOW</span>
                </div>
                <span className="ml-auto rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary">
                  Suggestion
                </span>
              </div>
              <p className="mt-3 leading-relaxed text-zinc-300">
                Nice routing updates! Make sure that the `callback` route is added to your GitHub App redirects whitelist in settings. Also, consider setting up a fallback route if `callback` encounters an invalid authorization state.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
