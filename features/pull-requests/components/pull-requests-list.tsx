"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={filter} onValueChange={(val) => setFilter(val as Filter)}>
          <TabsList>
            <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="reviewed">Reviewed ({counts.reviewed})</TabsTrigger>
            <TabsTrigger value="processing">Processing ({counts.processing})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
          </TabsList>
        </Tabs>
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
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No pull requests found.
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
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(pr.createdAt), { addSuffix: true })}
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
