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
  avgReviewTimeMinutes: number;
  mostActiveRepo: string | null;
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
      avgReviewTimeMinutes: 0,
      mostActiveRepo: null,
    };
  }

  const installationId = await getUserInstallationId(userId);

  const [repoSummary, recentActivity, prCounts, reviewedPrs, activeRepo] = await Promise.all([
    getRepoSummary(userId),
    getRecentActivity(userId),
    prisma.pullRequest.groupBy({
      by: ["status"],
      where: { installationId: installationId! },
      _count: { _all: true },
    }),
    prisma.pullRequest.findMany({
      where: {
        installationId: installationId!,
        status: "reviewed",
        reviewedAt: { not: null },
      },
      select: {
        createdAt: true,
        reviewedAt: true,
      },
    }),
    prisma.pullRequest.groupBy({
      by: ["repoFullName"],
      where: {
        installationId: installationId!,
        status: "reviewed",
        reviewedAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
      _count: {
        _all: true,
      },
      orderBy: {
        _count: {
          repoFullName: "desc",
        },
      },
      take: 1,
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

  // Calculate average review duration
  let avgReviewTimeMinutes = 0;
  if (reviewedPrs.length > 0) {
    const totalTimeMs = reviewedPrs.reduce((acc, pr) => {
      const duration = new Date(pr.reviewedAt!).getTime() - new Date(pr.createdAt).getTime();
      return acc + duration;
    }, 0);
    avgReviewTimeMinutes = Math.round(totalTimeMs / (1000 * 60) / reviewedPrs.length);
  }

  const mostActiveRepo = activeRepo.length > 0 ? activeRepo[0].repoFullName : null;

  return {
    installation,
    repoSummary,
    prSummary,
    recentActivity,
    avgReviewTimeMinutes,
    mostActiveRepo,
  };
}
