"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmptyStateIllustration } from "@/components/ui/empty-state";

type PullRequest = {
  id: string;
  repoFullName: string;
  prNumber: number;
  title: string;
  authorLogin: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

type PullRequestsListProps = {
  pullRequests: PullRequest[];
};

type Filter = "all" | "reviewed" | "processing" | "pending";

export function PullRequestsList({ pullRequests }: PullRequestsListProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const counts = useMemo(() => {
    return {
      all: pullRequests.length,
      reviewed: pullRequests.filter((pr) => pr.status === "reviewed").length,
      processing: pullRequests.filter((pr) => pr.status === "processing").length,
      pending: pullRequests.filter((pr) => pr.status === "pending").length,
    };
  }, [pullRequests]);

  const filteredPrs = useMemo(() => {
    const query = search.toLowerCase();

    return pullRequests.filter((pr) => {
      if (filter !== "all" && pr.status !== filter) {
        return false;
      }

      if (
        query &&
        !pr.repoFullName.toLowerCase().includes(query) &&
        !pr.title.toLowerCase().includes(query)
      ) {
        return false;
      }

      return true;
    });
  }, [pullRequests, filter, search]);

  return (
    <div className="flex flex-col gap-6 p-8 lg:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["all", "reviewed", "processing", "pending"] as Filter[]).map((f) => {
            const active = filter === f;
            const count = counts[f];
            const label = f.charAt(0).toUpperCase() + f.slice(1);
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-all select-none cursor-pointer",
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground"
                )}
              >
                <span>{label}</span>
                <span className={cn(
                  "inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                  active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <Input
          placeholder="Search pull requests…"
          className="max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-none border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Repository</TableHead>
              <TableHead>Pull Request</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <EmptyStateIllustration />
                    <div className="flex flex-col items-center gap-1 mt-2">
                      <span className="font-semibold text-sm text-foreground">No pull requests found</span>
                      <span className="text-xs text-muted-foreground max-w-sm">
                        There are no pull requests that match the selected filter query.
                      </span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredPrs.map((pr) => (
                <TableRow key={pr.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{pr.repoFullName}</span>
                      <span className="text-xs text-muted-foreground">#{pr.prNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md truncate">
                    <span className="text-sm font-medium">{pr.title}</span>
                  </TableCell>
                  <TableCell className="text-sm text-foreground/80">
                    {pr.authorLogin ? `@${pr.authorLogin}` : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        pr.status === "reviewed"
                          ? "default"
                          : pr.status === "failed"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {pr.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(pr.createdAt), { addSuffix: true })}
                      </span>
                      <AgeIndicator createdAt={pr.createdAt} />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      nativeButton={false}
                      size="sm"
                      variant="outline"
                      render={<Link href={`/dashboard/pull-requests/${pr.id}`} />}
                    >
                      View Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function AgeIndicator({ createdAt }: { createdAt: Date | string }) {
  const ageInMs = Date.now() - new Date(createdAt).getTime();
  const ageInDays = ageInMs / (1000 * 60 * 60 * 24);

  let colorClass = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/30";
  let label = "New";

  if (ageInDays > 3) {
    colorClass = "bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/30";
    label = "Stale";
  } else if (ageInDays > 1) {
    colorClass = "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/30";
    label = "Recent";
  }

  return (
    <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset ${colorClass}`}>
      {label}
    </span>
  );
}
