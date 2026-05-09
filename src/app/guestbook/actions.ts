"use server";

import { revalidatePath } from "next/cache";

import { guestbookEntries } from "@/data/guestbook";
import { guestbookSchema } from "@/lib/schemas";

export interface GuestbookActionState {
  success: boolean;
  message?: string;
  errors?: {
    name?: string[];
    message?: string[];
  };
}

export async function createGuestbookEntry(
  _prevState: GuestbookActionState,
  formData: FormData
): Promise<GuestbookActionState> {
  const rawData = {
    name: String(formData.get("name") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const result = guestbookSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: "Vui lòng kiểm tra lại dữ liệu trước khi gửi.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  guestbookEntries.unshift({
    id: Date.now().toString(),
    ...result.data,
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/guestbook");
  revalidatePath("/guestbook-client");

  return {
    success: true,
    message: "Gửi lời nhắn thành công.",
  };
}

export async function deleteGuestbookEntry(id: string) {
  const index = guestbookEntries.findIndex((entry) => entry.id === id);

  if (index === -1) {
    return { success: false, message: "Không tìm thấy lời nhắn cần xoá." };
  }

  guestbookEntries.splice(index, 1);

  revalidatePath("/guestbook");
  revalidatePath("/guestbook-client");

  return { success: true };
}