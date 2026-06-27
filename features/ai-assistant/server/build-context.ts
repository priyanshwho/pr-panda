import { prisma } from "@/lib/db";
import { getInstallationStatus } from "@/features/github/server/installation";
import { getUserSubscription } from "@/features/billing/server/subscription";
import { getUsageSummary } from "@/features/billing/server/usage";

/**
 * Builds a rich system prompt context block from the user's live data.
 * Injected as the AI assistant's system message so it knows everything
 * about the user's workspace without needing to ask.
 */
export async function buildAssistantContext(userId: string): Promise<string> {
  const [installation, subscription, usage] = await Promise.all([
    getInstallationStatus(userId),
    getUserSubscription(userId),
    getUsageSummary(userId),
  ]);

  const lines: string[] = [];

  // --- Identity & Plan ---
  lines.push("## User Workspace Context");
  lines.push(`- **Plan**: ${subscription.plan === "pro" ? "Pro (paid)" : "Free"}`);
  lines.push(`- **Subscription status**: ${subscription.status}`);
  if (subscription.renewsAt) {
    lines.push(`- **Renews at**: ${subscription.renewsAt}`);
  }
  lines.push(`- **AI reviews used this month**: ${usage.used} / ${usage.limit ?? "unlimited"}`);

  // --- GitHub Installation ---
  lines.push("\n## GitHub App");
  if (!installation.connected) {
    lines.push("- **Status**: NOT connected — GitHub App is not installed");
  } else {
    lines.push(`- **Status**: Connected`);
    lines.push(`- **Account**: ${installation.accountLogin ?? "unknown"}`);
    lines.push(`- **Installed at**: ${installation.installedAt ?? "unknown"}`);
  }

  if (!installation.connected) {
    return lines.join("\n");
  }

  // --- Repositories ---
  const repos = await prisma.repoSync.findMany({
    where: {
      repoFullName: {
        startsWith: installation.accountLogin ? `${installation.accountLogin}/` : undefined,
      },
    },
    orderBy: { updatedAt: "desc" },
    take: 20,
  });

  lines.push("\n## Tracked Repositories");
  if (repos.length === 0) {
    lines.push("- No repositories synced yet.");
  } else {
    for (const repo of repos) {
      lines.push(
        `- **${repo.repoFullName}** | branch: \`${repo.branch}\` | sync: ${repo.status} | chunks: ${repo.chunkCount}`
      );
    }
  }

  // --- Pull Request Summary ---
  const githubInstallation = await prisma.githubInstallation.findUnique({
    where: { userId },
    select: { installationId: true },
  });

  if (githubInstallation) {
    const prCounts = await prisma.pullRequest.groupBy({
      by: ["status"],
      where: { installationId: githubInstallation.installationId },
      _count: { _all: true },
    });

    const summary = { total: 0, reviewed: 0, pending: 0, processing: 0, rateLimited: 0 };
    for (const g of prCounts) {
      summary.total += g._count._all;
      if (g.status === "reviewed") summary.reviewed += g._count._all;
      else if (g.status === "pending") summary.pending += g._count._all;
      else if (g.status === "processing") summary.processing += g._count._all;
      else if (g.status === "rate_limited") summary.rateLimited += g._count._all;
    }

    lines.push("\n## Pull Request Summary");
    lines.push(`- Total: ${summary.total}`);
    lines.push(`- Reviewed: ${summary.reviewed}`);
    lines.push(`- Pending review: ${summary.pending}`);
    lines.push(`- Processing: ${summary.processing}`);
    if (summary.rateLimited > 0) lines.push(`- Rate limited: ${summary.rateLimited}`);

    // Recent 8 PRs
    const recentPRs = await prisma.pullRequest.findMany({
      where: { installationId: githubInstallation.installationId },
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        prNumber: true,
        title: true,
        repoFullName: true,
        status: true,
        authorLogin: true,
        createdAt: true,
      },
    });

    if (recentPRs.length > 0) {
      lines.push("\n## Recent Pull Requests");
      for (const pr of recentPRs) {
        const age = Math.round(
          (Date.now() - new Date(pr.createdAt).getTime()) / (1000 * 60 * 60)
        );
        const ageLabel = age < 24 ? `${age}h ago` : `${Math.round(age / 24)}d ago`;
        lines.push(
          `- PR #${pr.prNumber} in **${pr.repoFullName}** — "${pr.title}" | status: ${pr.status} | ${ageLabel}`
        );
      }
    }
  }

  return lines.join("\n");
}
