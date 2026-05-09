import Link from "next/link";
import { Newspaper } from "lucide-react";

import PageHero from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Post } from "@/types/post";

async function getPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Không thể tải danh sách bài viết");
  }

  return response.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="container-shell py-12 sm:py-16">
      <PageHero
        eyebrow="Lấy dữ liệu phía server"
        title="Blog lấy dữ liệu thật từ JSONPlaceholder API"
        description="Danh sách bài viết được render trong Server Component, tối ưu cho khả năng đọc rồi tự làm mới mỗi 60 giây để thể hiện đúng tinh thần data fetching trong App Router."
        icon={Newspaper}
        tags={[
          { label: "JSONPlaceholder", variant: "secondary" },
          { label: "Làm mới mỗi 60 giây", variant: "outline" },
          { label: "Server Component", variant: "outline" },
        ]}
        stats={[
          { label: "bài viết từ API", value: String(posts.length) },
          { label: "bài viết hiển thị", value: "10" },
          { label: "trang chi tiết động", value: "1 route" },
        ]}
        asideTitle="Nhịp đọc rõ ràng"
        asideDescription="Trang blog được làm như một mặt báo kỹ thuật thu gọn: dẫn nhập rõ, thẻ bài viết dễ quét và đường dẫn chi tiết đủ sâu để xem tác giả cùng bình luận nổi bật."
      />

      <div className="grid gap-5">
        {posts.slice(0, 10).map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <Card className="transition hover:-translate-y-0.5 hover:shadow-xl">
              <CardHeader>
                <div className="mb-2 flex items-center gap-3">
                  <Badge variant="secondary">Tác giả #{post.userId}</Badge>
                  <span className="text-sm text-zinc-500">Bài #{post.id}</span>
                </div>
                <CardTitle className="capitalize">{post.title}</CardTitle>
                <CardDescription>
                  Nhấn vào để xem chi tiết bài viết và hồ sơ tác giả.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm leading-7 text-zinc-700">{post.body}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-teal-700">
                  Đọc thêm
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}