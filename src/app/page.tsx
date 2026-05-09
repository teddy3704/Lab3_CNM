import Link from "next/link";
import { ArrowUpRight, BookOpenText, Contact2, Globe2, GraduationCap, Mail, MessageSquareHeart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SystemCommandCenter from "@/components/system-command-center";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profile } from "@/lib/profile";

export default function Home() {
  return (
    <section className="container-shell py-12 sm:py-16 lg:py-20">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.85fr)] lg:items-start">
        <div className="glass-panel soft-grid shimmer-panel rounded-[2rem] p-8 sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">Bài thực hành 3</Badge>
            <Badge variant="outline">Next.js App Router</Badge>
            <Badge variant="outline">Thiết kế lại toàn diện</Badge>
            <Badge variant="outline">{profile.className}</Badge>
          </div>

          <p className="section-label mt-8">Hồ sơ năng lực học phần</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-6xl">
            Một website portfolio/blog có chiều sâu kỹ thuật và cảm giác trình bày chỉnh chu.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
            Đây là phiên bản website của {profile.fullName}, sinh viên lớp {profile.className},
            MSSV {profile.studentId}. Toàn bộ bài lab đã được nâng thành một sản phẩm đồng nhất
            về giao diện, mạch nội dung và trải nghiệm: dữ liệu thật, hành vi thật, kiểm thử thật.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/blog">Khám phá blog kỹ thuật</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/guestbook">Trải nghiệm lưu bút</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 border-t border-black/10 pt-8 sm:grid-cols-3">
            {[
              { value: profile.studentId, label: "mã số sinh viên", tone: "text-teal-800" },
              { value: "100", label: "bài viết từ public API", tone: "text-amber-800" },
              { value: profile.className, label: "lớp đang theo học", tone: "text-zinc-900" },
            ].map((metric) => (
              <div key={metric.label}>
                <p className={`font-display text-4xl font-semibold ${metric.tone}`}>{metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {[
            {
              title: "Blog kỹ thuật",
              description:
                "Server-side fetching, revalidation và trang chi tiết động với dữ liệu thật từ JSONPlaceholder.",
              href: "/blog",
              icon: BookOpenText,
            },
            {
              title: "Lưu bút với hai hướng tiếp cận",
              description:
                "So sánh rõ fetch phía client với Server Actions trên cùng một bài toán thêm, xoá và kiểm tra dữ liệu.",
              href: "/guestbook",
              icon: MessageSquareHeart,
            },
            {
              title: "Liên hệ có kiểm soát dữ liệu",
              description:
                "Form liên hệ dùng Zod để kiểm tra dữ liệu, phản hồi trạng thái submit và cấu trúc component tái sử dụng.",
              href: "/contact",
              icon: Contact2,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
            <Link key={item.href} href={item.href}>
              <Card className="h-full transition duration-200 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
                <CardHeader>
                  <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg shadow-zinc-900/10">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-sm leading-7 text-zinc-600">{item.description}</p>
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );})}
        </div>
      </div>

      <SystemCommandCenter />

      <div className="mt-8 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <Card>
          <CardHeader>
            <CardTitle>Mục tiêu hoàn thiện</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm leading-7 text-zinc-700">
            <div className="rounded-2xl bg-zinc-50/80 p-4">
              Cá nhân hoá toàn bộ website theo đúng hồ sơ của {profile.fullName}, tránh mọi thông tin mẫu còn sót lại.
            </div>
            <div className="rounded-2xl bg-zinc-50/80 p-4">
              Đồng bộ ngôn ngữ thị giác giữa trang chủ, blog, lưu bút, dự án và liên hệ bằng cùng một bộ component.
            </div>
            <div className="rounded-2xl bg-zinc-50/80 p-4">
              Ưu tiên cả chất lượng giao diện lẫn kiểm chứng hành vi thay vì chỉ “đủ tính năng”.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dấu ấn cá nhân</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-black/8 bg-white/70 p-5">
              <div className="flex items-center gap-3 text-zinc-900">
                <GraduationCap className="size-5" />
                <p className="font-semibold">Hồ sơ sinh viên</p>
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-zinc-600">
                <p><span className="font-medium text-zinc-900">Họ tên:</span> {profile.fullName}</p>
                <p><span className="font-medium text-zinc-900">MSSV:</span> {profile.studentId}</p>
                <p><span className="font-medium text-zinc-900">Lớp:</span> {profile.className}</p>
                <p><span className="font-medium text-zinc-900">Vai trò:</span> {profile.roleLabel}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-black/8 bg-white/70 p-5">
              <div className="flex items-center gap-3 text-zinc-900">
                <Mail className="size-5" />
                <p className="font-semibold">Liên kết nhanh</p>
              </div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-600">
                <a className="flex items-center justify-between gap-3 rounded-xl bg-zinc-50 px-4 py-3 hover:bg-zinc-100" href={`mailto:${profile.email}`}>
                  <span>{profile.email}</span>
                  <ArrowUpRight className="size-4 text-zinc-500" />
                </a>
                <a className="flex items-center justify-between gap-3 rounded-xl bg-zinc-50 px-4 py-3 hover:bg-zinc-100" href={profile.githubRepoUrl} target="_blank" rel="noreferrer">
                  <span className="flex items-center gap-2"><Globe2 className="size-4" /> {profile.githubRepoLabel}</span>
                  <ArrowUpRight className="size-4 text-zinc-500" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
