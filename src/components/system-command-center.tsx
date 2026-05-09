import Link from "next/link";
import {
  ArrowUpRight,
  Gauge,
  Rocket,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from "lucide-react";

import { profile } from "@/lib/profile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const readinessSignals = [
  {
    icon: ShieldCheck,
    label: "Chuẩn mã nguồn",
    value: "Lint pass sạch",
    description: "Khoá các vòng tinh chỉnh bằng kiểm tra tĩnh để tránh trượt chất lượng.",
    accentClass: "bg-emerald-50 text-emerald-800",
  },
  {
    icon: Rocket,
    label: "Build production",
    value: "Sẵn sàng triển khai",
    description: "App Router, route động và các khối client đã compile ổn định.",
    accentClass: "bg-amber-50 text-amber-800",
  },
  {
    icon: Waypoints,
    label: "Luồng dữ liệu thật",
    value: "API + Actions",
    description: "Blog, lưu bút và liên hệ đều có hành vi thật thay vì chỉ là mock giao diện.",
    accentClass: "bg-teal-50 text-teal-800",
  },
];

const systemTracks = [
  "Blog dùng JSONPlaceholder và route chi tiết động để tạo chiều sâu nội dung.",
  "Lưu bút có cả hai hướng triển khai: Server Actions và API route client-side.",
  "Form liên hệ được kiểm tra bằng Zod để phản hồi rõ ràng trước khi xử lý.",
];

const premiumTraits = [
  "Nền ambient động tạo cảm giác sản phẩm cao cấp ngay từ cái nhìn đầu tiên.",
  "Card dùng vật liệu kính, highlight tinh tế và phân tầng ánh sáng rõ ràng.",
  "Hệ typography và khoảng thở được đồng bộ để trình diễn như portfolio thật.",
];

export default function SystemCommandCenter() {
  return (
    <section className="mt-10 grid gap-4 xl:grid-cols-[1.15fr_0.85fr] xl:items-start">
      <div className="glass-panel soft-grid shimmer-panel rounded-[2rem] p-7 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success">Sẵn sàng build production</Badge>
          <Badge variant="secondary">Command center</Badge>
          <Badge variant="outline">Premium system surface</Badge>
        </div>

        <p className="section-label mt-6">Trung tâm vận hành</p>
        <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
          Website được trình bày như một hệ thống đã sẵn sàng demo, kiểm chứng và triển khai.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-600">
          Không dừng ở mức đẹp mắt, phần này làm rõ rằng sản phẩm của {profile.fullName}
          đã có đủ các dấu hiệu của một hệ thống nghiêm túc: build production sạch, luồng dữ
          liệu thật, kiểm tra biểu mẫu rõ ràng và trải nghiệm đồng nhất trên toàn site.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {[
            "Triển khai một lệnh",
            "Kiểm chứng trước khi trình diễn",
            "Luồng dữ liệu có thật",
          ].map((item) => (
            <div
              key={item}
              className="status-surface inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium text-zinc-700"
            >
              <span className="signal-dot" />
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {readinessSignals.map((signal) => {
            const Icon = signal.icon;

            return (
              <div key={signal.label} className="premium-kpi rounded-[1.5rem] p-5">
                <div className={`inline-flex rounded-2xl p-3 ${signal.accentClass}`}>
                  <Icon className="size-5" />
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-zinc-500">
                  {signal.label}
                </p>
                <p className="mt-2 font-display text-2xl font-semibold text-zinc-950">
                  {signal.value}
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{signal.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4">
        <Card className="shimmer-panel">
          <CardHeader>
            <div className="mb-3 inline-flex size-12 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg shadow-zinc-900/10">
              <Gauge className="size-5" />
            </div>
            <CardTitle>Bản đồ luồng hệ thống</CardTitle>
            <CardDescription>
              Các phần quan trọng được xếp thành những tuyến trải nghiệm rõ ràng thay vì nằm rời rạc.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {systemTracks.map((track) => (
              <div key={track} className="status-surface rounded-[1.25rem] px-4 py-4 text-sm leading-7 text-zinc-700">
                {track}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="mb-3 inline-flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-800 shadow-inner">
              <Sparkles className="size-5" />
            </div>
            <CardTitle>Tầng hoàn thiện cao cấp</CardTitle>
            <CardDescription>
              Những quyết định làm website trông như một sản phẩm được chăm chút đến lớp cuối cùng.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm leading-7 text-zinc-700">
              {premiumTraits.map((trait) => (
                <div key={trait} className="rounded-[1.25rem] bg-zinc-50/85 px-4 py-4">
                  {trait}
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/projects">
                  Xem lớp trình bày dự án
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href={profile.githubRepoUrl} target="_blank" rel="noreferrer">
                  Mở kho mã nguồn
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}