// Pull Requests page skeleton
export default function PullRequestsLoading() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header skeleton */}
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
        <div className="h-7 w-7 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-px bg-border mx-2" />
        <div className="flex flex-col gap-1">
          <div className="h-3.5 w-28 animate-pulse rounded bg-muted" />
          <div className="h-2.5 w-56 animate-pulse rounded bg-muted" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-8 lg:p-10">
        {/* Filter chips */}
        <div className="flex gap-2">
          {["All", "Pending", "Reviewed", "Processing"].map((f) => (
            <div key={f} className="h-8 w-24 animate-pulse rounded-full bg-muted" />
          ))}
        </div>

        {/* PR list */}
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
              {/* Status dot */}
              <div className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-muted" />
              {/* PR info */}
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/5 animate-pulse rounded bg-muted" />
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-32 animate-pulse rounded bg-muted" />
                  <div className="h-2.5 w-20 animate-pulse rounded bg-muted" />
                </div>
              </div>
              {/* Badge + age */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
                <div className="h-5 w-12 animate-pulse rounded-full bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
