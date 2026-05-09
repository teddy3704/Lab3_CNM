"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { profile } from "@/lib/profile";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Trang chủ" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Dự án" },
  { href: "/guestbook", label: "Lưu bút" },
  { href: "/contact", label: "Liên hệ" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[color:rgba(255,252,246,0.72)] backdrop-blur-2xl">
      <div className="container-shell flex min-h-18 flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="group inline-flex items-center gap-3 text-zinc-900">
            <span className="flex size-11 items-center justify-center rounded-2xl border border-teal-900/10 bg-teal-900/5 text-sm font-semibold text-teal-800 transition group-hover:-translate-y-0.5 group-hover:bg-teal-900/8">
              {profile.initials}
            </span>
            <span>
              <span className="font-display block text-2xl font-semibold tracking-tight">
                {profile.fullName}
              </span>
              <span className="block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                MSSV {profile.studentId} • Lớp {profile.className}
              </span>
            </span>
          </Link>

          <span className="hidden rounded-full border border-emerald-800/10 bg-emerald-800/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900 md:inline-flex">
            Đã kiểm thử trực tiếp
          </span>
        </div>

        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-zinc-700">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-2.5 transition",
                pathname === link.href
                  ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/12"
                  : "hover:bg-white hover:text-zinc-950"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}