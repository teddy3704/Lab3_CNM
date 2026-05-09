import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function BlogNotFound() {
  return (
    <section className="container-shell py-16">
      <div className="glass-panel rounded-[1.75rem] p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-zinc-900">Bài viết không tồn tại</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
          Có thể bài viết này không hợp lệ hoặc không còn được JSONPlaceholder cung cấp.
        </p>
        <Button asChild className="mt-6">
          <Link href="/blog">Quay lại blog</Link>
        </Button>
      </div>
    </section>
  );
}