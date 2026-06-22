import type { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "@/features/auth/actions";
import { getOverview } from "@/features/overview/server/get-overview";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { formatDistanceToNow } from "date-fns";

export const metadata: Metadata = {
  title: "Overview · Dashboard",
};

export default async function DashboardPage() {
  const session = await requireAuth();
  const overview = await getOverview(session.user.id);

  const header = (
    <DashboardHeader
      title="Overview"
      description="Monitor your repositories, codebase sync status, and recent pull request reviews."
    />
  );

  if (!overview.installation.connected) {
    return (
      <>
        {header}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
          <div className="flex flex-col items-center gap-2 max-w-sm text-center">
            <svg
              className="size-10 text-muted-foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253"
              />
            </svg>
            <p className="text-sm text-muted-foreground">
              Connect your GitHub account and install the PR Panda App to view overview analytics.
            </p>
          </div>
          <Button nativeButton={false} render={<Link href={DASHBOARD_ROUTES.github} />}>
            Go to GitHub App Settings
          </Button>
        </div>
      </>
    );
  }

  const { repoSummary, prSummary, recentActivity, installation } = overview;

  // Calculate sync completion percentage
  const syncPercentage = repoSummary && repoSummary.totalRepos > 0
    ? Math.round((repoSummary.syncedRepos / repoSummary.totalRepos) * 100)
    : 0;

  return (
    <>
      {header}
      <div className="flex flex-col gap-6 p-6">
        {/* Statistics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-sm font-medium">Integration Status</CardTitle>
                <CardDescription className="text-xs">GitHub App Connection</CardDescription>
              </div>
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold truncate">@{installation.accountLogin}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Installed {installation.installedAt ? formatDistanceToNow(new Date(installation.installedAt), { addSuffix: true }) : "recently"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-sm font-medium">Codebase Synced</CardTitle>
                <CardDescription className="text-xs">Repositories synced to vectors</CardDescription>
              </div>
              <svg className="size-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376A8.965 8.965 0 0 0 12 12.75c-.497 0-.982.04-1.455.12m8.678 1.956A9.084 9.084 0 0 0 20.25 12c0-1.895-.584-3.652-1.584-5.103m0 0A9.042 9.042 0 0 0 15.75 3.375c-.621 0-1.125.504-1.125 1.125v1.5a3.375 3.375 0 0 0 3.375 3.375h1.5a1.125 1.125 0 0 1 1.125 1.125v1.5a3.375 3.375 0 0 0-3.375 3.375H9" />
              </svg>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="text-2xl font-bold">
                {repoSummary?.syncedRepos} <span className="text-sm font-normal text-muted-foreground">/ {repoSummary?.totalRepos}</span>
              </div>
              <Progress value={syncPercentage} className="mt-1" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-sm font-medium">Reviewed PRs</CardTitle>
                <CardDescription className="text-xs">Successfully reviewed pull requests</CardDescription>
              </div>
              <svg className="size-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{prSummary?.reviewed}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Out of {prSummary?.total} total pull requests detected
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <CardDescription className="text-xs">PRs queued or processing reviews</CardDescription>
              </div>
              <svg className="size-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(prSummary?.pending ?? 0) + (prSummary?.processing ?? 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {prSummary?.processing} currently processing, {prSummary?.pending} in queue
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Activity Timeline */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest code reviews and repository synchronizations</CardDescription>
            </CardHeader>
            <CardContent>
              {recentActivity.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-sm text-muted-foreground">No recent activity detected.</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Activity will appear once you sync a repo or submit a PR on GitHub.
                  </p>
                </div>
              ) : (
                <div className="relative border-l border-border pl-6 ml-3 space-y-6">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="relative">
                      {/* Timeline dot */}
                      <span className={`absolute -left-[31px] top-1.5 flex size-4 items-center justify-center rounded-full ring-4 ring-background ${
                        activity.status === "synced" || activity.status === "reviewed"
                          ? "bg-emerald-500"
                          : activity.status === "failed"
                          ? "bg-red-500"
                          : "bg-amber-500 animate-pulse"
                      }`} />
                      
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{activity.title}</span>
                          <Badge variant={
                            activity.status === "synced" || activity.status === "reviewed"
                              ? "default"
                              : activity.status === "failed"
                              ? "destructive"
                              : "secondary"
                          }>
                            {activity.status}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.repoFullName}</span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Repo Sync Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Codebase Sync Summary</CardTitle>
              <CardDescription>Status breakdown of your codebases</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-emerald-500" />
                    <span>Synced</span>
                  </div>
                  <span className="font-semibold">{repoSummary?.syncedRepos}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-amber-500" />
                    <span>Syncing / Pending</span>
                  </div>
                  <span className="font-semibold">{repoSummary?.syncingRepos}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-red-500" />
                    <span>Failed</span>
                  </div>
                  <span className="font-semibold">{repoSummary?.failedRepos}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                    <span>Not Synced</span>
                  </div>
                  <span className="font-semibold">
                    {Math.max(0, (repoSummary?.totalRepos ?? 0) - (repoSummary?.syncedRepos ?? 0) - (repoSummary?.syncingRepos ?? 0) - (repoSummary?.failedRepos ?? 0))}
                  </span>
                </div>
              </div>
              
              <div className="border-t pt-4 flex flex-col gap-2 mt-2">
                <Button nativeButton={false} size="sm" variant="outline" className="w-full" render={<Link href={DASHBOARD_ROUTES.repos} />}>
                  Manage Repositories
                </Button>
                <Button nativeButton={false} size="sm" variant="outline" className="w-full" render={<Link href={DASHBOARD_ROUTES.pullRequest} />}>
                  View Pull Requests
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}