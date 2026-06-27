"use client";

import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type AnalyticsChartsProps = {
  data: {
    reviewsOverTime: Array<{ date: string; count: number }>;
    reviewsByRepo: Array<{ name: string; count: number }>;
    statusBreakdown: Array<{ name: string; value: number; color: string }>;
    totals: { total: number; reviewed: number; pending: number; failed: number };
  };
};

export function AnalyticsCharts({ data }: AnalyticsChartsProps) {
  const { reviewsOverTime, reviewsByRepo, statusBreakdown, totals } = data;

  return (
    <div className="flex flex-col gap-6">
      {/* Metrics Cards Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totals.total}</div>
            <p className="text-xs text-muted-foreground mt-1">Total PRs Synced</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {totals.reviewed}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Successfully Reviewed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-500">{totals.pending}</div>
            <p className="text-xs text-muted-foreground mt-1">Pending Queue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-rose-500">{totals.failed}</div>
            <p className="text-xs text-muted-foreground mt-1">Failed / Cancelled</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Chart 1: Reviews Over Time */}
        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle className="text-base">Review Volume (Last 7 Days)</CardTitle>
            <CardDescription>Number of automated PR reviews executed per day</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reviewsOverTime}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/40" />
                <XAxis dataKey="date" className="text-[10px]" />
                <YAxis className="text-[10px]" allowDecimals={false} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#f97316" fillOpacity={1} fill="url(#colorCount)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chart 2: Status Breakdown Pie */}
        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle className="text-base">Review Status Ratio</CardTitle>
            <CardDescription>Distribution of PR statuses across all repositories</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            {statusBreakdown.length === 0 ? (
              <p className="text-sm text-muted-foreground">No review history available.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Chart 3: Reviews By Repo Bar */}
        <Card className="h-[400px] md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Reviews by Repository</CardTitle>
            <CardDescription>Review volume breakdown across linked GitHub repositories</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {reviewsByRepo.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No repository syncs recorded yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reviewsByRepo}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/40" />
                  <XAxis dataKey="name" className="text-[10px]" />
                  <YAxis className="text-[10px]" allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
