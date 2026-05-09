import { Layers3 } from "lucide-react";

import PageHero from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const projects = [
  {
    title: "Website Portfolio",
    description: "Portfolio cá nhân xây dựng bằng Next.js App Router, Tailwind CSS và TypeScript.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    status: "Đang phát triển",
  },
  {
    title: "Ứng dụng quản lý công việc",
    description: "Ứng dụng theo dõi công việc với React, local storage và bộ lọc trạng thái.",
    tech: ["React", "JavaScript", "CSS Modules"],
    status: "Hoàn thành",
  },
  {
    title: "API RESTful",
    description: "API quản lý sản phẩm và người dùng với Node.js, Express và MongoDB.",
    tech: ["Node.js", "Express", "MongoDB"],
    status: "Hoàn thành",
  },
  {
    title: "Chat Realtime",
    description: "Ứng dụng chat thời gian thực có phòng riêng, sự kiện typing và lịch sử tin nhắn.",
    tech: ["React", "Socket.IO", "Node.js"],
    status: "Đang phát triển",
  },
];

export default function ProjectsPage() {
  return (
    <section className="container-shell py-12 sm:py-16">
      <PageHero
        eyebrow="Giao diện định hướng theo component"
        title="Các dự án được trình bày như một portfolio chỉn chu"
        description="Trang này dùng Card và Badge để trình bày các dự án theo cùng một ngôn ngữ thị giác với blog, guestbook và contact, giúp toàn bộ website có cảm giác thống nhất như một sản phẩm hoàn chỉnh."
        icon={Layers3}
        tags={[
          { label: "Hệ card", variant: "secondary" },
          { label: "Ánh xạ badge", variant: "outline" },
          { label: "Lưới responsive", variant: "outline" },
        ]}
        stats={[
          { label: "dự án mô phỏng", value: String(projects.length) },
          { label: "nhóm công nghệ", value: "12+" },
          { label: "trạng thái theo dõi", value: "2 mức" },
        ]}
        asideTitle="Portfolio có chủ đích"
        asideDescription="Mỗi thẻ dự án được xem như một ô trưng bày mini: tiêu đề rõ, trạng thái dễ đọc và công nghệ được gắn nhãn ngắn gọn để người xem quét nhanh mà vẫn nắm được chiều sâu."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.title} className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <CardTitle>{project.title}</CardTitle>
                <Badge variant={project.status === "Hoàn thành" ? "success" : "secondary"}>
                  {project.status}
                </Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}