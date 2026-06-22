import { prisma } from "@/lib/db";
import { getUserInstallationId } from "@/features/github/server/installation";

export async function getPullRequests(userId: string) {
  const installationId = await getUserInstallationId(userId);

  if (!installationId) {
    return [];
  }

  return prisma.pullRequest.findMany({
    where: {
      installationId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPullRequest(userId: string, id: string) {
  const installationId = await getUserInstallationId(userId);

  if (!installationId) {
    return null;
  }

  return prisma.pullRequest.findFirst({
    where: {
      id,
      installationId,
    },
  });
}
