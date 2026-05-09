import Link from "next/link";
import { BookHeart } from "lucide-react";

import DeleteButton from "@/components/delete-button";
import GuestbookForm from "@/components/guestbook-form";
import PageHero from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { guestbookEntries } from "@/data/guestbook";

export default function GuestbookPage() {
  const entries = guestbookEntries;

  return (
    <section className="container-shell py-12 sm:py-16">
      <PageHero
        eyebrow="Tương tác ưu tiên server"
        title="Sổ lưu bút theo hướng server-first"
        description="Danh sách lời nhắn được đọc trực tiếp trên server. Form gửi và thao tác xoá cùng đi qua Server Actions để bạn thấy rõ cách App Router xử lý một luồng tương tác hoàn chỉnh."
        icon={BookHeart}
        tags={[
          { label: "Server Actions", variant: "secondary" },
          { label: "Kiểm tra Zod", variant: "outline" },
          { label: "Lưu tạm trong bộ nhớ", variant: "outline" },
        ]}
        stats={[
          { label: "lời nhắn hiện có", value: String(entries.length) },
          { label: "luồng submit", value: "server" },
          { label: "luồng xoá", value: "server" },
        ]}
        asideTitle="So sánh cách tiếp cận"
        asideDescription="Đây là phiên bản giúp bạn cảm nhận rõ ưu thế của Server Actions: ít code phía client hơn, giảm lớp fetch thủ công và giữ trạng thái giao diện sạch hơn ở những form đơn giản."
      />

      <div className="mb-8 flex justify-end">
        <Button asChild variant="outline">
          <Link href="/guestbook-client">Mở phiên bản phía client</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] lg:items-start">
        <GuestbookForm />

        <Card>
          <CardHeader>
            <CardTitle>Sổ lưu bút</CardTitle>
            <CardDescription>
              Hiện có {entries.length} lời nhắn đang được lưu trong bộ nhớ tạm thời.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {entries.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm text-zinc-500">
                Chưa có lời nhắn nào. Hãy trở thành người đầu tiên để lại dấu ấn.
              </p>
            ) : (
              <div className="space-y-4">
                {entries.map((entry, index) => (
                  <div key={entry.id}>
                    <div className="rounded-2xl border border-black/10 bg-zinc-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-zinc-900">{entry.name}</p>
                          <p className="text-sm text-zinc-500">
                            {new Date(entry.createdAt).toLocaleString("vi-VN")}
                          </p>
                        </div>
                        <DeleteButton id={entry.id} />
                      </div>
                      <p className="mt-3 text-sm leading-7 text-zinc-700">{entry.message}</p>
                    </div>
                    {index < entries.length - 1 ? <Separator className="my-4" /> : null}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}