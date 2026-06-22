import { prisma } from "@/lib/db";
import { getInstallationStatus, getUserInstallationId } from "@/features/github/server/installation";
import { getRepoSummary, RepoSummary } from "./repo-summary";
import { getRecentActivity, ActivityItem } from "./activity";

export type OverviewData = {
  installation: {
    connected: boolean;
    accountLogin: string | null;
    installedAt: string | null;
  };
  repoSummary: RepoSummary | null;
  prSummary: {
    total: number;
    reviewed: number;
    pending: number;
    processing: number;
  } | null;
  recentActivity: ActivityItem[];
};

export async function getOverview(userId: string): Promise<OverviewData> {
  const installation = await getInstallationStatus(userId);

  if (!installation.connected) {
    return {
      installation: {
        connected: false,
        accountLogin: null,
        installedAt: null,
      },
      repoSummary: null,
      prSummary: null,
      recentActivity: [],
    };
  }

  const installationId = await getUserInstallationId(userId);

  const [repoSummary, recentActivity, prCounts] = await Promise.all([
    getRepoSummary(userId),
    getRecentActivity(userId),
    prisma.pullRequest.groupBy({
      by: ["status"],
      where: { installationId: installationId! },
      _count: { _all: true },
    }),
  ]);

  const prSummary = {
    total: 0,
    reviewed: 0,
    pending: 0,
    processing: 0,
  };

  for (const group of prCounts) {
    const count = group._count._all;
    prSummary.total += count;
    if (group.status === "reviewed") {
      prSummary.reviewed += count;
    } else if (group.status === "processing") {
      prSummary.processing += count;
    } else if (group.status === "pending") {
      prSummary.pending += count;
    }
  }

  return {
    installation,
    repoSummary,
    prSummary,
    recentActivity,
  };
}
