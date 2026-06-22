"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Database,
  Lightning,
  ShieldCheck,
  Chat,
  Code,
  GitBranch,
} from "@phosphor-icons/react";

export function Features() {
  return (
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
  );
}
