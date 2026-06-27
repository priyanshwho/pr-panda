// Repos page skeleton
export default function ReposLoading() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header skeleton */}
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
        <div className="h-7 w-7 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-px bg-border mx-2" />
        <div className="flex flex-col gap-1">
          <div className="h-3.5 w-28 animate-pulse rounded bg-muted" />
          <div className="h-2.5 w-52 animate-pulse rounded bg-muted" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-8 lg:p-10">
        {/* Filters + search bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-8 w-24 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
          <div className="h-9 w-64 animate-pulse rounded-lg bg-muted" />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-7 gap-4 border-b border-border px-4 py-3">
            {["Repository", "Visibility", "Branch", "Language", "Stars", "Updated", "Codebase"].map((h) => (
              <div key={h} className="h-3 w-full max-w-[80px] animate-pulse rounded bg-muted" />
            ))}
          </div>
          {/* Table rows */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="grid grid-cols-7 gap-4 border-b border-border/50 px-4 py-4 last:border-0">
              <div className="space-y-1.5">
                <div className="h-3.5 w-32 animate-pulse rounded bg-muted" />
                <div className="h-2.5 w-40 animate-pulse rounded bg-muted/70" />
              </div>
              <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
              <div className="h-3 w-14 animate-pulse rounded bg-muted" />
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
              <div className="h-3 w-8 animate-pulse rounded bg-muted ml-auto" />
              <div className="h-3 w-16 animate-pulse rounded bg-muted ml-auto" />
              <div className="h-7 w-20 animate-pulse rounded-lg bg-muted ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
