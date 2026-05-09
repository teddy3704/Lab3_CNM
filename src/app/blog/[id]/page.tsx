import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, MessageSquareQuote } from "lucide-react";

import PageHero from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Comment, Post, User } from "@/types/post";
import { getInitials } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

async function getPost(id: string): Promise<Post> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

async function getUser(userId: number): Promise<User> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Không thể tải thông tin tác giả");
  }

  return response.json();
}

async function getComments(postId: number): Promise<Comment[]> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error("Không thể tải bình luận");
  }

  return response.json();
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const post = await getPost(id);
  const [author, comments] = await Promise.all([
    getUser(post.userId),
    getComments(post.id).catch(() => []),
  ]);

  return (
    <section className="container-shell py-12 sm:py-16">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/blog">Quay lại danh sách bài viết</Link>
      </Button>

      <PageHero
        eyebrow="Trang chi tiết động"
        title={post.title}
        description="Trang chi tiết kết hợp bài viết, thông tin tác giả và bình luận nổi bật trong cùng một bố cục để người xem có thể đi từ tiêu đề đến ngữ cảnh xung quanh một cách liền mạch."
        icon={FileText}
        tags={[
          { label: `Bài #${post.id}`, variant: "secondary" },
          { label: `Tác giả #${post.userId}`, variant: "outline" },
          { label: author.company.name, variant: "outline" },
        ]}
        stats={[
          { label: "bình luận lấy về", value: String(comments.length) },
          { label: "điểm đọc chính", value: "3 khối" },
          { label: "kiểu điều hướng", value: "động" },
        ]}
        asideTitle="Một bài viết, nhiều lớp ngữ cảnh"
        asideDescription="Thay vì chỉ hiển thị nội dung thô, trang chi tiết này đặt bài viết vào bối cảnh đầy đủ hơn: ai viết, phản hồi ra sao và vì sao route động lại hữu ích trong một website nội dung."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)] lg:items-start">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg shadow-zinc-900/10">
                <FileText className="size-5" />
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">Tác giả #{post.userId}</Badge>
                <Badge variant="outline">Bài viết #{post.id}</Badge>
              </div>
            </div>
            <CardTitle className="text-3xl capitalize leading-tight">Nội dung bài viết</CardTitle>
            <CardDescription>
              Nội dung được lấy trực tiếp từ JSONPlaceholder và hiển thị bằng Server Component.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-[1.5rem] bg-zinc-50/75 p-6 whitespace-pre-line text-base leading-8 text-zinc-700">
              {post.body}
            </div>

            <Separator className="my-8" />

            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg shadow-zinc-900/10">
                  <MessageSquareQuote className="size-5" />
                </span>
                <h2 className="font-display text-2xl font-semibold text-zinc-900">Bình luận nổi bật</h2>
              </div>
              <div className="mt-4 grid gap-4">
                {comments.slice(0, 3).map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-[1.5rem] border border-black/10 bg-zinc-50/90 p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex size-11 items-center justify-center rounded-2xl bg-zinc-900 text-sm font-semibold text-white">
                        {getInitials(comment.name)}
                      </div>
                      <div>
                        <p className="font-medium text-zinc-900">{comment.name}</p>
                        <p className="text-sm text-zinc-500">{comment.email}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-zinc-700">{comment.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Về tác giả</CardTitle>
            <CardDescription>Thông tin người viết bài được lấy từ endpoint users.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-zinc-700">
            <div className="flex items-start gap-3 rounded-[1.5rem] bg-zinc-50/80 p-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-zinc-900 text-sm font-semibold text-white">
                {getInitials(author.name)}
              </div>
              <div>
                <p className="font-semibold text-zinc-900">{author.name}</p>
                <p>@{author.username}</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-zinc-900">Email</p>
              <p>{author.email}</p>
            </div>
            <div>
              <p className="font-medium text-zinc-900">Điện thoại</p>
              <p>{author.phone}</p>
            </div>
            <div>
              <p className="font-medium text-zinc-900">Website</p>
              <p>{author.website}</p>
            </div>
            <div>
              <p className="font-medium text-zinc-900">Công ty</p>
              <p>{author.company.name}</p>
              <p className="mt-1 italic text-zinc-500">{author.company.catchPhrase}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}