"use server";

import { requireAuth } from "@/features/auth/actions";
import { prisma } from "@/lib/db";
import { inngest } from "@/features/inngest/client";
import { getUserInstallationId } from "@/features/github/server/installation";
import { revalidatePath } from "next/cache";

export async function reReviewPullRequest(prId: string) {
  const session = await requireAuth();
  const userInstallationId = await getUserInstallationId(session.user.id);

  if (!userInstallationId) {
    throw new Error("GitHub installation not found.");
  }

  const pr = await prisma.pullRequest.findUnique({
    where: { id: prId },
  });

  if (!pr) {
    throw new Error("Pull request not found.");
  }

  if (pr.installationId !== userInstallationId) {
    throw new Error("Unauthorized to access this pull request.");
  }

  // Update PR status to pending to clear previous state
  await prisma.pullRequest.update({
    where: { id: prId },
    data: {
      status: "pending",
      reviewComment: null,
      reviewedAt: null,
    },
  });

  // Trigger Inngest function for re-review
  await inngest.send({
    name: "github/pr.received",
    data: { pullRequestId: prId },
  });

  revalidatePath(`/dashboard/pull-requests/${prId}`);
  revalidatePath("/dashboard/pull-requests");
  revalidatePath("/dashboard");

  return { success: true };
}
