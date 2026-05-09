"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface BlogErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogError({ error, reset }: BlogErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-shell py-16">
      <div className="rounded-[1.75rem] border border-red-200 bg-red-50 p-8 text-red-950 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-700">
          Lỗi tải dữ liệu
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold">Không thể tải danh sách bài viết</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-red-900/80">
          Hệ thống không lấy được dữ liệu từ JSONPlaceholder ở thời điểm hiện tại.
          Bạn có thể thử lại ngay bây giờ.
        </p>
        <Button className="mt-6" onClick={reset}>
          Thử lại
        </Button>
      </div>
    </section>
  );
}