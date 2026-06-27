import { prisma } from "@/lib/db";
import { getUserInstallationId } from "@/features/github/server/installation";

export async function getAnalyticsData(userId: string) {
  const installationId = await getUserInstallationId(userId);

  if (!installationId) {
    return {
      reviewsOverTime: [],
      reviewsByRepo: [],
      statusBreakdown: [],
      totals: { total: 0, reviewed: 0, pending: 0, failed: 0 },
    };
  }

  const pullRequests = await prisma.pullRequest.findMany({
    where: { installationId },
    orderBy: { createdAt: "asc" },
  });

  // Calculate totals
  const total = pullRequests.length;
  let reviewed = 0;
  let pending = 0;
  let processing = 0;
  let failed = 0;

  // Reviews by Repository
  const repoCounts: Record<string, number> = {};

  // Status breakdown
  pullRequests.forEach((pr) => {
    if (pr.status === "reviewed") reviewed++;
    else if (pr.status === "pending") pending++;
    else if (pr.status === "processing") processing++;
    else if (pr.status === "failed") failed++;

    repoCounts[pr.repoFullName] = (repoCounts[pr.repoFullName] || 0) + 1;
  });

  const reviewsByRepo = Object.entries(repoCounts).map(([name, count]) => ({
    name: name.split("/").pop() || name,
    count,
  }));

  const statusBreakdown = [
    { name: "Reviewed", value: reviewed, color: "#f97316" }, // primary terracotta orange
    { name: "Pending", value: pending, color: "#eab308" }, // amber
    { name: "Processing", value: processing, color: "#3b82f6" }, // blue
    { name: "Failed", value: failed, color: "#ef4444" }, // red
  ].filter((item) => item.value > 0);

  // Reviews Over Time (last 7 days grouped by date)
  const last7Days: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    last7Days[dateStr] = 0;
  }

  pullRequests.forEach((pr) => {
    const prDate = new Date(pr.createdAt);
    const dateStr = prDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    if (dateStr in last7Days) {
      last7Days[dateStr] += 1;
    }
  });

  const reviewsOverTime = Object.entries(last7Days).map(([date, count]) => ({
    date,
    count,
  }));

  return {
    reviewsOverTime,
    reviewsByRepo,
    statusBreakdown,
    totals: { total, reviewed, pending, failed: failed + processing },
  };
}
