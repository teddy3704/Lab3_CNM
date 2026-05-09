export default function BlogLoading() {
  return (
    <section className="container-shell py-12 sm:py-16">
      <div className="glass-panel mb-10 rounded-[2rem] p-7 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="size-12 animate-pulse rounded-2xl bg-zinc-200" />
          <div className="h-6 w-44 animate-pulse rounded-full bg-zinc-200" />
        </div>
        <div className="space-y-3">
          <div className="h-4 w-48 animate-pulse rounded-full bg-zinc-200" />
          <div className="h-12 w-full max-w-3xl animate-pulse rounded-2xl bg-zinc-200" />
          <div className="h-5 w-full max-w-2xl animate-pulse rounded-full bg-zinc-100" />
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-20 animate-pulse rounded-2xl bg-zinc-50" />
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="glass-panel rounded-[1.5rem] p-6"
          >
            <div className="mb-4 h-6 w-28 animate-pulse rounded-full bg-zinc-200" />
            <div className="mb-3 h-8 w-2/3 animate-pulse rounded-xl bg-zinc-200" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded-full bg-zinc-100" />
              <div className="h-4 w-11/12 animate-pulse rounded-full bg-zinc-100" />
              <div className="h-4 w-8/12 animate-pulse rounded-full bg-zinc-100" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}