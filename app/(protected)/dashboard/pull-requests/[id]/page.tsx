import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { requireAuth } from "@/features/auth/actions";
import { getPullRequest } from "@/features/pull-requests/server/get-pull-requests";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AiReviewMarkdown } from "@/features/pull-requests/components/ai-review-markdown";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { ReReviewButton } from "@/features/reviews/components/re-review-button";

type PullRequestDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PullRequestDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `PR Review #${id} · Dashboard`,
  };
}

export default async function PullRequestDetailPage({
  params,
}: PullRequestDetailPageProps) {
  const session = await requireAuth();
  const { id } = await params;

  const pr = await getPullRequest(session.user.id, id);

  if (!pr) {
    notFound();
  }

  const githubPrUrl = `https://github.com/${pr.repoFullName}/pull/${pr.prNumber}`;

  return (
    <>
      <div className="flex items-center justify-between px-6 pt-6">
        <Button nativeButton={false} size="sm" variant="outline" render={<Link href={DASHBOARD_ROUTES.pullRequest} />}>
          &larr; Back to Pull Requests
        </Button>
        <ReReviewButton prId={pr.id} disabled={pr.status === "processing" || pr.status === "pending"} />
      </div>

      <DashboardHeader
        title={pr.title}
        description={`Pull Request #${pr.prNumber} inside repository ${pr.repoFullName}`}
      />

      <div className="flex flex-col gap-6 px-6 pb-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* PR Information Sidebar Card */}
          <Card className="md:col-span-1 h-fit">
            <CardHeader>
              <CardTitle>PR Information</CardTitle>
              <CardDescription>Details of the source pull request</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs uppercase font-medium">Repository</span>
                <Link
                  href={`https://github.com/${pr.repoFullName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground hover:underline truncate"
                >
                  {pr.repoFullName}
                </Link>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs uppercase font-medium">Branch</span>
                <span className="font-mono text-xs text-foreground/80 truncate">
                  {pr.baseBranch} &larr; {pr.headSha.slice(0, 7)}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs uppercase font-medium">Author</span>
                <span className="font-medium text-foreground">
                  {pr.authorLogin ? `@${pr.authorLogin}` : "Unknown"}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs uppercase font-medium">Review Status</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge
                    variant={
                      pr.status === "reviewed"
                        ? "default"
                        : pr.status === "failed"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {pr.status}
                  </Badge>
                  {pr.reviewedAt && (
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(pr.reviewedAt), { addSuffix: true })}
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t pt-4 mt-2">
                <Button nativeButton={false} size="sm" className="w-full" render={
                  <Link href={githubPrUrl} target="_blank" rel="noopener noreferrer" />
                }>
                  <svg className="size-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  View on GitHub
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Code Review Report Content */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>AI Code Review Report</CardTitle>
              <CardDescription>Automated feedback on security, performance, and software style</CardDescription>
            </CardHeader>
            <CardContent>
              {pr.status === "reviewed" && pr.reviewComment ? (
                <AiReviewMarkdown content={pr.reviewComment} />
              ) : pr.status === "processing" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="size-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  <span className="font-semibold text-sm mt-4">Generating Review...</span>
                  <span className="text-xs text-muted-foreground mt-1 max-w-xs">
                    PR Panda is currently parsing code diffs, embedding vectors, and fetching context snippets to build your review.
                  </span>
                </div>
              ) : pr.status === "pending" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="size-8 rounded-full border-4 border-muted border-t-transparent animate-spin" />
                  <span className="font-semibold text-sm mt-4">Queueing Review...</span>
                  <span className="text-xs text-muted-foreground mt-1 max-w-xs">
                    The pull request has been recorded and is currently in the background queue.
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center text-destructive">
                  <svg className="size-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                  </svg>
                  <span className="font-semibold text-sm mt-4">Review Failed</span>
                  <span className="text-xs text-muted-foreground mt-1 max-w-xs">
                    An error occurred while analyzing the pull request. Check Inngest status logs for details.
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
