"use server";

import { requireAuth } from "@/features/auth/actions";
import { prisma } from "@/lib/db";
import { getPullRequestFiles } from "@/features/reviews/server/pr-files";

export async function getPrFilesAction(prId: string) {
  const session = await requireAuth();

  const pr = await prisma.pullRequest.findUnique({
    where: { id: prId },
  });

  if (!pr) {
    throw new Error("Pull request not found.");
  }

  try {
    const files = await getPullRequestFiles(pr.installationId, pr.repoFullName, pr.prNumber);
    return files;
  } catch (err: any) {
    console.error("Failed to fetch PR files:", err);
    throw new Error("Failed to fetch files from GitHub. Please ensure the installation is valid.");
  }
}
