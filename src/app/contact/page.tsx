import { Contact2 } from "lucide-react";

import ContactForm from "@/components/contact-form";
import PageHero from "@/components/page-hero";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { profile } from "@/lib/profile";

export default function ContactPage() {
  return (
    <section className="container-shell py-12 sm:py-16">
      <PageHero
        eyebrow="Server Actions kết hợp Zod"
        title="Liên hệ với cấu trúc rõ ràng và phản hồi chuyên nghiệp"
        description="Trang này biến một khối thông tin tĩnh thành form liên hệ thật sự: có kiểm tra dữ liệu rõ ràng, có phản hồi trạng thái submit và đủ chất lượng để dùng làm giao diện giới thiệu cá nhân."
        icon={Contact2}
        tags={[
          { label: "Biểu mẫu thật", variant: "secondary" },
          { label: "Kiểm tra dữ liệu rõ ràng", variant: "outline" },
          { label: "Xử lý phía server", variant: "outline" },
        ]}
        stats={[
          { label: "trường dữ liệu", value: "4" },
          { label: "đầu ra phản hồi", value: "2 trạng thái" },
          { label: "email liên hệ", value: "1 kênh" },
        ]}
        asideTitle="Tạo cảm giác tin cậy"
        asideDescription="Một trang liên hệ cao cấp không chỉ là một form. Nó cần có ngữ cảnh, thông tin nền và tín hiệu rõ ràng rằng dữ liệu của người dùng đang được xử lý nghiêm túc."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] lg:items-start">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Email</CardTitle>
              <CardDescription>Kênh liên lạc ưu tiên cho trao đổi học tập và hợp tác dự án.</CardDescription>
            </CardHeader>
            <CardContent>
              <a className="text-sm font-medium text-teal-700 hover:underline" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GitHub</CardTitle>
              <CardDescription>Kho mã nguồn, bài tập thực hành và các nhánh triển khai.</CardDescription>
            </CardHeader>
            <CardContent>
              <a
                className="text-sm font-medium text-teal-700 hover:underline"
                href={profile.githubRepoUrl}
                target="_blank"
                rel="noreferrer"
              >
                {profile.githubRepoLabel}
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin học tập</CardTitle>
              <CardDescription>Thông tin sinh viên được đưa trực tiếp vào website để sẵn sàng nộp bài.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm leading-7 text-zinc-700">
                <p><span className="font-medium text-zinc-900">Họ tên:</span> {profile.fullName}</p>
                <p><span className="font-medium text-zinc-900">MSSV:</span> {profile.studentId}</p>
                <p><span className="font-medium text-zinc-900">Lớp:</span> {profile.className}</p>
                <p><span className="font-medium text-zinc-900">Vai trò:</span> {profile.roleLabel}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}