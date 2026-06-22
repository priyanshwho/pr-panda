"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "@phosphor-icons/react";

export function Testimonials() {
  return (
    <section id="testimonials" className="border-t bg-muted/30 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What Developers Are Saying
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See how teams of all sizes leverage our bot to clean code and quicken PR review turnarounds.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Testimonial 1 */}
          <Card className="bg-background">
            <CardContent className="pt-6">
              <div className="flex gap-1 text-yellow-500">
                <Star className="size-4 fill-yellow-500" />
                <Star className="size-4 fill-yellow-500" />
                <Star className="size-4 fill-yellow-500" />
                <Star className="size-4 fill-yellow-500" />
                <Star className="size-4 fill-yellow-500" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                "PR Panda has cut down our pull request approval latency by 40%. The context retrieval is amazingly precise, catching code layout errors before the senior reviewer even opens the PR."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold text-white">
                  JD
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">John Doe</h4>
                  <p className="text-xs text-muted-foreground">Senior Dev, Cloudscale</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial 2 */}
          <Card className="bg-background">
            <CardContent className="pt-6">
              <div className="flex gap-1 text-yellow-500">
                <Star className="size-4 fill-yellow-500" />
                <Star className="size-4 fill-yellow-500" />
                <Star className="size-4 fill-yellow-500" />
                <Star className="size-4 fill-yellow-500" />
                <Star className="size-4 fill-yellow-500" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                "The security scans alone are worth it. Caught an exposed Stripe development key in a draft PR. Our dev workflow runs automatically on Vercel and Inngest without any glitches."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-semibold text-white">
                  SL
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Sarah Lim</h4>
                  <p className="text-xs text-muted-foreground">CTO, Devflow Inc</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial 3 */}
          <Card className="bg-background">
            <CardContent className="pt-6">
              <div className="flex gap-1 text-yellow-500">
                <Star className="size-4 fill-yellow-500" />
                <Star className="size-4 fill-yellow-500" />
                <Star className="size-4 fill-yellow-500" />
                <Star className="size-4 fill-yellow-500" />
                <Star className="size-4" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                "Very impressed by the RAG feature. It retrieves previous code patterns from the repository via Pinecone, so it suggests custom API function implementations matching our design patterns."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 font-semibold text-white">
                  MW
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Marcus Wright</h4>
                  <p className="text-xs text-muted-foreground">Full Stack Eng, Octave</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
