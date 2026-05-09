"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DatabaseZap, MessagesSquare, MonitorSmartphone } from "lucide-react";

import PageHero from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { GuestbookEntry } from "@/data/guestbook";
import { formatVietnameseDateTime, getInitials } from "@/lib/utils";

interface ApiErrorPayload {
  message?: string;
  errors?: {
    name?: string[];
    message?: string[];
  };
}

const initialForm = {
  name: "",
  message: "",
};

export default function GuestbookClientPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ApiErrorPayload["errors"]>({});
  const [form, setForm] = useState(initialForm);

  async function fetchEntries() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/guestbook?limit=20");

      if (!response.ok) {
        throw new Error("Không thể tải guestbook từ API route.");
      }

      const data: GuestbookEntry[] = await response.json();
      setEntries(data);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
            : "Đã xảy ra lỗi khi tải dữ liệu."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let isActive = true;

    async function loadInitialEntries() {
      try {
        const response = await fetch("/api/guestbook?limit=20");

        if (!response.ok) {
          throw new Error("Không thể tải guestbook từ API route.");
        }

        const data: GuestbookEntry[] = await response.json();

        if (isActive) {
          setEntries(data);
          setError(null);
        }
      } catch (caughtError) {
        if (isActive) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
                : "Đã xảy ra lỗi khi tải dữ liệu."
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    void loadInitialEntries();

    return () => {
      isActive = false;
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as ApiErrorPayload;

      if (!response.ok) {
        setFieldErrors(payload.errors ?? {});
        throw new Error(payload.message ?? "Không thể gửi lời nhắn.");
      }

      setForm(initialForm);
      await fetchEntries();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
            : "Đã xảy ra lỗi khi gửi dữ liệu."
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Bạn có chắc muốn xoá lời nhắn này không?")) {
      return;
    }

    try {
      setDeletingId(id);
      setError(null);

      const response = await fetch(`/api/guestbook/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const payload = (await response.json()) as ApiErrorPayload;
        throw new Error(payload.message ?? "Không thể xoá lời nhắn.");
      }

      await fetchEntries();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
            : "Đã xảy ra lỗi khi xoá dữ liệu."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="container-shell py-12 sm:py-16">
      <PageHero
        eyebrow="Tương tác phía client"
        title="Sổ lưu bút theo hướng client-side"
        description="Trang này gọi API route bằng fetch trong browser, phù hợp cho thao tác thêm và xoá mà không cần tải lại trang. Đây là phiên bản đối chiếu với luồng server-first ở route bên cạnh."
        icon={MonitorSmartphone}
        tags={[
          { label: "Fetch phía client", variant: "secondary" },
          { label: "useEffect + fetch", variant: "outline" },
          { label: "API route", variant: "outline" },
        ]}
        stats={[
          { label: "lời nhắn hiện có", value: String(entries.length) },
          { label: "endpoint chính", value: "2" },
          { label: "refresh danh sách", value: "tức thời" },
        ]}
        asideTitle="Lựa chọn giàu tương tác"
        asideDescription="Phiên bản này cho cảm giác điều khiển trực tiếp hơn: dữ liệu đi qua API route, trạng thái lỗi và tải nằm hoàn toàn ở phía client, phù hợp với các giao diện cần phản hồi nhanh trong trình duyệt."
      />

      <div className="mb-8 flex justify-end">
        <Button asChild variant="outline">
          <Link href="/guestbook">Quay lại phiên bản ưu tiên server</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] lg:items-start">
        <Card>
          <CardHeader>
            <CardTitle>Gửi lời nhắn qua API</CardTitle>
            <CardDescription>
              Form này gọi POST /api/guestbook và tự làm mới danh sách ngay sau khi thành công.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="client-name">Tên của bạn</Label>
                <Input
                  id="client-name"
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="Ví dụ: Nguyễn Minh Anh"
                  required
                />
                {fieldErrors?.name?.[0] ? (
                  <p className="text-sm text-red-600">{fieldErrors.name[0]}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="client-message">Lời nhắn</Label>
                <Textarea
                  id="client-message"
                  value={form.message}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, message: event.target.value }))
                  }
                  placeholder="Viết một lời nhắn để kiểm thử API route..."
                  rows={5}
                  required
                />
                {fieldErrors?.message?.[0] ? (
                  <p className="text-sm text-red-600">{fieldErrors.message[0]}</p>
                ) : null}
              </div>

              <Button type="submit" disabled={submitting}>
                {submitting ? "Đang gửi..." : "Gửi lời nhắn"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Danh sách hiện tại</CardTitle>
                <CardDescription>
                  GET /api/guestbook?limit=20 đang trả về {entries.length} lời nhắn.
                </CardDescription>
              </div>
              <span className="flex size-11 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg shadow-zinc-900/10">
                <DatabaseZap className="size-5" />
              </span>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="rounded-2xl border border-black/8 bg-zinc-50/90 p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="size-11 animate-pulse rounded-2xl bg-zinc-200" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-32 animate-pulse rounded-full bg-zinc-200" />
                        <div className="h-3 w-40 animate-pulse rounded-full bg-zinc-100" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full animate-pulse rounded-full bg-zinc-100" />
                      <div className="h-3 w-11/12 animate-pulse rounded-full bg-zinc-100" />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {error ? (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50/90 p-4 text-sm leading-7 text-red-700">
                {error}
              </div>
            ) : null}

            {!loading && entries.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-zinc-300 bg-zinc-50/85 p-6 text-sm text-zinc-500">
                <div className="flex items-center gap-3 text-zinc-800">
                  <MessagesSquare className="size-5" />
                  <span className="font-semibold">Chưa có dữ liệu nào</span>
                </div>
                <p className="mt-3 leading-7">
                  Bạn có thể tạo entry mới ở cột bên trái để kiểm tra luồng thêm dữ liệu,
                  sau đó xoá ngay trên cùng trang mà không cần reload.
                </p>
              </div>
            ) : null}

            <div className="space-y-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-[1.5rem] border border-black/10 bg-zinc-50/90 p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex size-11 items-center justify-center rounded-2xl bg-zinc-900 text-sm font-semibold text-white">
                        {getInitials(entry.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900">{entry.name}</p>
                        <p className="text-sm text-zinc-500">
                          {formatVietnameseDateTime(entry.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => void handleDelete(entry.id)}
                      disabled={deletingId === entry.id}
                    >
                      {deletingId === entry.id ? "Đang xoá..." : "Xoá"}
                    </Button>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-zinc-700">{entry.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}