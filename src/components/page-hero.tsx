import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface HeroStat {
  label: string;
  value: string;
}

interface HeroTag {
  label: string;
  variant?: "default" | "secondary" | "outline" | "success";
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tags?: HeroTag[];
  stats?: HeroStat[];
  asideTitle?: string;
  asideDescription?: string;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  icon: Icon,
  tags = [],
  stats = [],
  asideTitle,
  asideDescription,
}: PageHeroProps) {
  return (
    <div className="mb-10 grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:items-end">
      <div className="glass-panel rounded-[2rem] p-7 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg shadow-zinc-900/10">
            <Icon className="size-5" />
          </span>
          {tags.map((tag) => (
            <Badge key={tag.label} variant={tag.variant ?? "outline"}>
              {tag.label}
            </Badge>
          ))}
        </div>

        <p className="section-label mt-7">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-zinc-950">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-600">{description}</p>

        {stats.length > 0 ? (
          <div className="mt-7 grid gap-3 border-t border-black/10 pt-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-semibold text-zinc-950">{stat.value}</p>
                <p className="mt-1 text-sm leading-6 text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {asideTitle || asideDescription ? (
        <Card className="h-full">
          <CardContent className="flex h-full flex-col justify-between gap-6">
            <div>
              {asideTitle ? (
                <p className="font-display text-2xl font-semibold text-zinc-950">{asideTitle}</p>
              ) : null}
              {asideDescription ? (
                <p className="mt-3 text-sm leading-7 text-zinc-600">{asideDescription}</p>
              ) : null}
            </div>
            <div className="rounded-2xl bg-zinc-50/85 p-4 text-sm leading-7 text-zinc-700">
              Thiết kế theo hướng trình bày sản phẩm: có nhịp điệu thị giác, có trọng tâm nội dung và giữ cùng một chất liệu trên toàn website.
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}