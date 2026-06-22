import { prisma } from "@/lib/db";
import { getUserInstallationId } from "@/features/github/server/installation";
import { getInstallationReposPage } from "@/features/github/server/repo";

export type RepoSummary = {
  totalRepos: number;
  syncedRepos: number;
  syncingRepos: number;
  failedRepos: number;
};

export async function getRepoSummary(userId: string): Promise<RepoSummary> {
  const installationId = await getUserInstallationId(userId);

  if (!installationId) {
    return { totalRepos: 0, syncedRepos: 0, syncingRepos: 0, failedRepos: 0 };
  }

  let totalRepos = 0;
  try {
    // Fetch total repos currently authorized in the GitHub App
    const reposPage = await getInstallationReposPage(installationId, 1);
    totalRepos = reposPage.totalCount;
  } catch (error) {
    console.error("Failed to fetch repository list from GitHub API:", error);
  }

  // Fetch status of codebases tracked in our DB
  const syncs = await prisma.repoSync.findMany({
    where: { installationId },
    select: { status: true },
  });

  const syncedRepos = syncs.filter((s) => s.status === "synced").length;
  const syncingRepos = syncs.filter((s) => s.status === "syncing" || s.status === "pending").length;
  const failedRepos = syncs.filter((s) => s.status === "failed").length;

  return {
    // Fallback to DB count if GitHub API request fails or is rate limited
    totalRepos: Math.max(totalRepos, syncs.length),
    syncedRepos,
    syncingRepos,
    failedRepos,
  };
}
