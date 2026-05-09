import { NextRequest, NextResponse } from "next/server";

import { guestbookEntries } from "@/data/guestbook";
import { guestbookSchema } from "@/lib/schemas";

interface GuestbookRouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(
  _request: NextRequest,
  { params }: GuestbookRouteContext
) {
  const { id } = await params;
  const index = guestbookEntries.findIndex((entry) => entry.id === id);

  if (index === -1) {
    return NextResponse.json({ message: "Không tìm thấy lời nhắn" }, { status: 404 });
  }

  const [deletedEntry] = guestbookEntries.splice(index, 1);

  return NextResponse.json(deletedEntry);
}

export async function PUT(
  request: NextRequest,
  { params }: GuestbookRouteContext
) {
  const { id } = await params;
  const index = guestbookEntries.findIndex((entry) => entry.id === id);

  if (index === -1) {
    return NextResponse.json({ message: "Không tìm thấy lời nhắn" }, { status: 404 });
  }

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

    guestbookEntries[index] = {
      ...guestbookEntries[index],
      ...result.data,
    };

    return NextResponse.json(guestbookEntries[index]);
  } catch {
    return NextResponse.json(
      { message: "Không thể đọc dữ liệu được gửi lên" },
      { status: 400 }
    );
  }
}