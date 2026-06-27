"use client";

import React, { useTransition } from "react";
import { reReviewPullRequest } from "../actions/re-review";
import { Button } from "@/components/ui/button";
import { ArrowClockwise } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ReReviewButtonProps = {
  prId: string;
  disabled?: boolean;
};

export function ReReviewButton({ prId, disabled = false }: ReReviewButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleReReview = () => {
    startTransition(async () => {
      try {
        await reReviewPullRequest(prId);
        toast.success("Manual review triggered successfully!");
        router.refresh();
      } catch (error: any) {
        toast.error(error.message || "Failed to trigger review.");
      }
    });
  };

  return (
    <Button
      onClick={handleReReview}
      disabled={disabled || isPending}
      variant="outline"
      size="sm"
      className="gap-1.5 cursor-pointer select-none"
    >
      <ArrowClockwise className={`size-3.5 ${isPending ? "animate-spin" : ""}`} />
      <span>{isPending ? "Triggering..." : "Re-review PR"}</span>
    </Button>
  );
}
