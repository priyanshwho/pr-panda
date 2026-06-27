import type { Metadata } from "next";
import { requireAuth } from "@/features/auth/actions";
import { getAnalyticsData } from "@/features/analytics/server/get-analytics";
import { getInstallationStatus } from "@/features/github/server/installation";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { AnalyticsCharts } from "@/features/analytics/components/analytics-charts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";

export const metadata: Metadata = {
  title: "Analytics · Dashboard",
};

export default async function AnalyticsPage() {
  const session = await requireAuth();
  const installation = await getInstallationStatus(session.user.id);

  const header = (
    <DashboardHeader
      title="Review Analytics"
      description="Track code review performance, statuses, and repository statistics over time."
    />
  );

  if (!installation.connected) {
    return (
      <>
        {header}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 lg:p-10">
          <p className="text-sm text-muted-foreground">
            Install the GitHub App first to view code review analytics.
          </p>
          <Button nativeButton={false} render={<Link href={DASHBOARD_ROUTES.github} />}>
            Go to GitHub App
          </Button>
        </div>
      </>
    );
  }

  const data = await getAnalyticsData(session.user.id);

  return (
    <>
      {header}
      <div className="px-8 pb-8 lg:px-10 lg:pb-10">
        <AnalyticsCharts data={data} />
      </div>
    </>
  );
}
