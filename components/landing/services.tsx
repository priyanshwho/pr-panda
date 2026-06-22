"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

export function Services() {
  const { data: session } = authClient.useSession();

  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What We Provide
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We bridge the gap between static analysis and contextless AI tools. Here is how we improve your development loop:
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <strong className="text-foreground">Full Repository Context</strong>
                  <p className="text-sm text-muted-foreground">We index your repository files securely to retrieve context queries during scans.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <strong className="text-foreground">Actionable Code Fixes</strong>
                  <p className="text-sm text-muted-foreground">We provide direct code block recommendations you can apply on GitHub in one click.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <strong className="text-foreground">Developer-centric Analytics</strong>
                  <p className="text-sm text-muted-foreground">Beautiful charts and stats dashboard depicting your code health improvements over time.</p>
                </div>
              </li>
            </ul>

            <div className="mt-10">
              <Link
                href={session ? "/dashboard" : "/sign-in"}
                className={cn(buttonVariants({ size: "lg" }), "gap-2")}
              >
                Try PR Panda Now <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-2 text-2xl font-bold text-primary">01</div>
                <h3 className="font-semibold text-foreground">Connect Repo</h3>
                <p className="mt-2 text-sm text-muted-foreground">Import your repository. Better Auth keeps your personal tokens encrypted and safe.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-2 text-2xl font-bold text-primary">02</div>
                <h3 className="font-semibold text-foreground">Sync Index</h3>
                <p className="mt-2 text-sm text-muted-foreground">Vector sync splits your codebase to build custom embeddings within Pinecone database.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-2 text-2xl font-bold text-primary">03</div>
                <h3 className="font-semibold text-foreground">Create PR</h3>
                <p className="mt-2 text-sm text-muted-foreground">Push branch updates. Webhook payload immediately queues review through Inngest functions.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-2 text-2xl font-bold text-primary">04</div>
                <h3 className="font-semibold text-foreground">Review Posted</h3>
                <p className="mt-2 text-sm text-muted-foreground">PR Panda generates detailed Markdown reports and comments on line-specific files.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
