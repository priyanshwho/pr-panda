"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sparkle,
  Lightning,
  ShieldCheck,
  Database,
  ArrowRight,
  GithubLogo,
  Chat,
  Code,
  GitBranch,
  Star,
  CheckCircle,
} from "@phosphor-icons/react";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">
      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-[100px] dark:bg-violet-500/10" />
      </div>

      {/* Header */}
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

      {/* Hero Section */}
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

      {/* Features Section - What We Do */}
      <section id="features" className="border-t bg-muted/30 py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Devs Love PR Panda
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We leverage advanced RAG integration to contextualize codebase reviews, identifying bugs and potential performance flaws in milliseconds.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="bg-background">
              <CardHeader>
                <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Database className="size-5" />
                </div>
                <CardTitle className="mt-4">Contextual Code RAG</CardTitle>
                <CardDescription>
                  Integrates with Pinecone DB to index code embeddings, searching relevant repository contexts before formulating answers.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-background">
              <CardHeader>
                <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Lightning className="size-5" />
                </div>
                <CardTitle className="mt-4">Automated Webhooks</CardTitle>
                <CardDescription>
                  Instantaneous triggered reviews using webhooks. Commits trigger background tasks managed via Inngest.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-background">
              <CardHeader>
                <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ShieldCheck className="size-5" />
                </div>
                <CardTitle className="mt-4">Security Auditing</CardTitle>
                <CardDescription>
                  Automatic scanning for exposed developer API keys, secrets, database leaks, or basic SQL injection vulnerabilities.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-background">
              <CardHeader>
                <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Chat className="size-5" />
                </div>
                <CardTitle className="mt-4">Direct PR Comments</CardTitle>
                <CardDescription>
                  Comments are posted directly to the relevant line of code inside the GitHub pull request dashboard.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 5 */}
            <Card className="bg-background">
              <CardHeader>
                <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Code className="size-5" />
                </div>
                <CardTitle className="mt-4">Detailed Markdown Reports</CardTitle>
                <CardDescription>
                  Get full analytical summaries with performance metrics, style compliance suggestions, and file status inside our dashboard.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 6 */}
            <Card className="bg-background">
              <CardHeader>
                <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GitBranch className="size-5" />
                </div>
                <CardTitle className="mt-4">Workspace Sync</CardTitle>
                <CardDescription>
                  Easily view your linked repositories, track active review queues, and trigger force reviews whenever you want.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section - What we Provide */}
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

      {/* Testimonials Section */}
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

      {/* FAQs Section */}
      <section id="faqs" className="py-20 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Got questions about setup, safety, or models? We have answers.
            </p>
          </div>

          <div className="mt-16">
            <Accordion className="w-full space-y-4">
              <AccordionItem value="faq-1" className="border rounded-lg bg-card px-4">
                <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold">
                  How does PR Panda work?
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                  When you open or push commits to a GitHub Pull Request, a webhook event is sent to PR Panda. We use Inngest functions to fetch the file diffs, query our Pinecone database vector index for codebase context, and use OpenRouter models to evaluate the code and write detailed comments.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2" className="border rounded-lg bg-card px-4">
                <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold">
                  Does PR Panda store or train on my private code?
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                  No. We value your privacy. Code diffs are processed in-memory during review generation and are not stored. Code embeddings stored in Pinecone are solely used for context retrieval for your own workspace and are never shared or used for model training.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3" className="border rounded-lg bg-card px-4">
                <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold">
                  What AI models does PR Panda support?
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                  Through our OpenRouter integration, we leverage state-of-the-art models like Claude 3.5 Sonnet and GPT-4o, providing highly accurate, intelligent, and human-like suggestions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-4" className="border rounded-lg bg-card px-4">
                <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold">
                  Can I configure customized review prompts?
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                  Yes. You can manage guidelines and prompt templates in the dashboard workspace, allowing you to tailor the reviews to fit specific styling rules, test frameworks, or repository conventions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/20 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🐼</span>
                <span className="font-bold text-foreground">PR Panda</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering dev teams with intelligent, context-aware AI pull request reviews.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-foreground">Product</h5>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href="#features" className="text-muted-foreground hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-muted-foreground hover:text-foreground">
                    How it Works
                  </a>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-foreground">Resources</h5>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                    GitHub Integration
                  </a>
                </li>
                <li>
                  <a href="https://nextjs.org" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                    Next.js Docs
                  </a>
                </li>
                <li>
                  <a href="https://inngest.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                    Inngest Queue
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-foreground">Legal</h5>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <span className="text-muted-foreground">Privacy Policy</span>
                </li>
                <li>
                  <span className="text-muted-foreground">Terms of Service</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} PR Panda Inc. All rights reserved.
            </p>
            <div className="mt-4 flex items-center gap-4 sm:mt-0">
              <a
                href={process.env.NEXT_PUBLIC_GITHUB_PBLIC_LINK || "https://github.com"}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <GithubLogo className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
