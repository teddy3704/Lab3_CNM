import { NextRequest, NextResponse } from "next/server";

import { guestbookEntries } from "@/data/guestbook";
import { guestbookSchema } from "@/lib/schemas";

export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get("limit");
  const parsedLimit = limit ? Number.parseInt(limit, 10) : undefined;

  const data =
    parsedLimit && Number.isFinite(parsedLimit) && parsedLimit > 0
      ? guestbookEntries.slice(0, parsedLimit)
      : guestbookEntries;

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const result = guestbookSchema.safeParse(payload);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Dữ liệu không hợp lệ",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const newEntry = {
      id: Date.now().toString(),
      ...result.data,
      createdAt: new Date().toISOString(),
    };

    guestbookEntries.unshift(newEntry);

    return NextResponse.json(newEntry, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Không thể đọc dữ liệu được gửi lên" },
      { status: 400 }
    );
  }
}