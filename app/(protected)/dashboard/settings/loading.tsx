// Settings page skeleton
export default function SettingsLoading() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header skeleton */}
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
        <div className="h-7 w-7 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-px bg-border mx-2" />
        <div className="flex flex-col gap-1">
          <div className="h-3.5 w-20 animate-pulse rounded bg-muted" />
          <div className="h-2.5 w-48 animate-pulse rounded bg-muted" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8 lg:p-10">
        <div className="w-full max-w-2xl space-y-6">
          {/* Tab list skeleton */}
          <div className="flex gap-2">
            <div className="h-9 w-20 animate-pulse rounded-lg bg-muted" />
            <div className="h-9 w-28 animate-pulse rounded-lg bg-muted" />
          </div>

          {/* Profile card skeleton */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-5">
            <div className="space-y-1">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-3 w-48 animate-pulse rounded bg-muted" />
            </div>

            {/* Avatar + name */}
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 animate-pulse rounded-full bg-muted" />
              <div className="space-y-1.5">
                <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                <div className="h-3 w-36 animate-pulse rounded bg-muted" />
                <div className="h-3 w-32 animate-pulse rounded bg-muted" />
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Fields */}
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                  <div className="h-9 w-full animate-pulse rounded-lg bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
