// GitHub App page skeleton
export default function GithubLoading() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header skeleton */}
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
        <div className="h-7 w-7 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-px bg-border mx-2" />
        <div className="flex flex-col gap-1">
          <div className="h-3.5 w-24 animate-pulse rounded bg-muted" />
          <div className="h-2.5 w-44 animate-pulse rounded bg-muted" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-8 lg:p-10">
        {/* Installation status card */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />
            <div className="space-y-1.5">
              <div className="h-4 w-36 animate-pulse rounded bg-muted" />
              <div className="h-3 w-52 animate-pulse rounded bg-muted" />
            </div>
          </div>
          <div className="h-px w-full bg-border" />
          <div className="space-y-2">
            <div className="h-3 w-40 animate-pulse rounded bg-muted" />
            <div className="h-3 w-56 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-9 w-40 animate-pulse rounded-lg bg-muted" />
        </div>

        {/* Permissions card */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-4 max-w-2xl">
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-4 w-4 animate-pulse rounded bg-muted" />
                <div className="h-3 w-44 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
