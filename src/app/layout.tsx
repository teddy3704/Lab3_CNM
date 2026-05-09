import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Navbar from "@/components/navbar";
import { profile } from "@/lib/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${profile.fullName} | Hồ sơ năng lực & Blog kỹ thuật`,
    template: `%s | ${profile.fullName}`,
  },
  description:
    `Website portfolio/blog của ${profile.fullName} - MSSV ${profile.studentId}, lớp ${profile.className}, được xây dựng với App Router, data fetching, API Routes, Server Actions, Zod và giao diện component hóa.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <div className="relative flex min-h-screen flex-col overflow-x-clip">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(13,148,136,0.16),transparent_34%),radial-gradient(circle_at_15%_15%,rgba(180,83,9,0.14),transparent_22%)]" />
          <div className="ambient-orb left-[-10rem] top-[7rem] -z-10 size-[24rem] bg-[radial-gradient(circle,rgba(15,118,110,0.24),transparent_68%)]" />
          <div className="ambient-orb right-[-11rem] top-[15rem] -z-10 size-[28rem] bg-[radial-gradient(circle,rgba(180,83,9,0.2),transparent_70%)] [animation-delay:-6s]" />
          <div className="ambient-orb left-[42%] top-[34rem] -z-10 size-[20rem] bg-[radial-gradient(circle,rgba(14,165,233,0.14),transparent_70%)] [animation-delay:-11s]" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-black/10 bg-[color:rgba(255,253,248,0.82)] backdrop-blur-xl">
            <div className="container-shell grid gap-6 py-8 text-sm text-zinc-600 md:grid-cols-[1.3fr_0.9fr_0.8fr] md:items-start">
              <div>
                <p className="font-display text-2xl font-semibold text-zinc-900">
                  {profile.fullName}
                </p>
                <p className="mt-2 max-w-md leading-7">
                  MSSV {profile.studentId} - lớp {profile.className}. Đây là phiên bản bài lab
                  được hoàn thiện theo hướng sản phẩm: rõ ràng, có cấu trúc, có kiểm chứng
                  hành vi và có chủ đích thẩm mỹ.
                </p>
              </div>
              <div>
                <p className="font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Công nghệ
                </p>
                <p className="mt-3 leading-7">
                  Next.js App Router, TypeScript, Tailwind CSS, Zod, API Routes,
                  Server Actions.
                </p>
              </div>
              <div>
                <p className="font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Trạng thái
                </p>
                <p className="mt-3 leading-7">
                  Sẵn sàng để trình diễn, kiểm thử thủ công và nộp bài lên GitHub của sinh viên.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="status-surface inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-zinc-700">
                    <span className="signal-dot" /> Build sạch
                  </span>
                  <span className="status-surface inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-zinc-700">
                    <span className="signal-dot" /> Giao diện đồng bộ
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
