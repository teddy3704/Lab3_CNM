export default function BlogPostLoading() {
  return (
    <section className="container-shell py-12 sm:py-16">
      <div className="mb-6 h-11 w-60 animate-pulse rounded-full bg-zinc-200" />
      <div className="glass-panel mb-8 rounded-[2rem] p-7 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="size-12 animate-pulse rounded-2xl bg-zinc-200" />
          <div className="h-6 w-40 animate-pulse rounded-full bg-zinc-200" />
        </div>
        <div className="space-y-3">
          <div className="h-4 w-44 animate-pulse rounded-full bg-zinc-200" />
          <div className="h-12 w-full max-w-4xl animate-pulse rounded-2xl bg-zinc-200" />
          <div className="h-5 w-full max-w-3xl animate-pulse rounded-full bg-zinc-100" />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
        <div className="glass-panel rounded-[1.5rem] p-6">
          <div className="mb-4 h-6 w-36 animate-pulse rounded-full bg-zinc-200" />
          <div className="mb-3 h-10 w-4/5 animate-pulse rounded-2xl bg-zinc-200" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-4 animate-pulse rounded-full bg-zinc-100" />
            ))}
          </div>
        </div>
        <div className="glass-panel rounded-[1.5rem] p-6">
          <div className="mb-3 h-8 w-40 animate-pulse rounded-xl bg-zinc-200" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-4 animate-pulse rounded-full bg-zinc-100" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}