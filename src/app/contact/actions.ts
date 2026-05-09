"use server";

import { contactSchema } from "@/lib/schemas";

export interface ContactActionState {
  success: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
}

export async function sendContactMessage(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const rawData = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const result = contactSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: "Biểu mẫu chưa hợp lệ.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  console.log("Tin nhắn liên hệ mới:", result.data);

  return {
    success: true,
    message: "Gửi tin nhắn thành công. Tôi sẽ phản hồi sớm nhất có thể.",
  };
}