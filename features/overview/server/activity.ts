import { prisma } from "@/lib/db";
import { getUserInstallationId } from "@/features/github/server/installation";

export type ActivityItem = {
  id: string;
  type: "pr_review" | "repo_sync";
  title: string;
  repoFullName: string;
  status: string;
  timestamp: string;
  metadata?: any;
};

export async function getRecentActivity(userId: string): Promise<ActivityItem[]> {
  const installationId = await getUserInstallationId(userId);

  if (!installationId) {
    return [];
  }

  // Fetch recent pull request reviews
  const prs = await prisma.pullRequest.findMany({
    where: { installationId },
    orderBy: { updatedAt: "desc" },
    take: 5,
  });

  // Fetch recent repository codebase sync runs
  const syncs = await prisma.repoSync.findMany({
    where: { installationId },
    orderBy: { updatedAt: "desc" },
    take: 5,
  });

  const prItems: ActivityItem[] = prs.map((pr) => ({
    id: pr.id,
    type: "pr_review" as const,
    title: `Pull Request #${pr.prNumber}: ${pr.title}`,
    repoFullName: pr.repoFullName,
    status: pr.status,
    timestamp: pr.updatedAt.toISOString(),
    metadata: {
      prNumber: pr.prNumber,
      author: pr.authorLogin,
    },
  }));

  const syncItems: ActivityItem[] = syncs.map((sync) => ({
    id: sync.id,
    type: "repo_sync" as const,
    title: `Repository Sync: ${sync.repoFullName}`,
    repoFullName: sync.repoFullName,
    status: sync.status,
    timestamp: sync.updatedAt.toISOString(),
    metadata: {
      branch: sync.branch,
      chunkCount: sync.chunkCount,
    },
  }));

  // Merge and sort by timestamp descending
  const allItems = [...prItems, ...syncItems].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return allItems.slice(0, 10);
}
