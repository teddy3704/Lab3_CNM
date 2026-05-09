import { z } from "zod";

export const guestbookSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được quá 50 ký tự"),
  message: z
    .string()
    .trim()
    .min(10, "Lời nhắn phải có ít nhất 10 ký tự")
    .max(500, "Lời nhắn không được quá 500 ký tự"),
});

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(100, "Tên không được quá 100 ký tự"),
  email: z.string().trim().email("Email không hợp lệ"),
  subject: z
    .string()
    .trim()
    .min(5, "Tiêu đề phải có ít nhất 5 ký tự")
    .max(200, "Tiêu đề không được quá 200 ký tự"),
  message: z
    .string()
    .trim()
    .min(10, "Nội dung phải có ít nhất 10 ký tự")
    .max(2000, "Nội dung không được quá 2000 ký tự"),
});

export type GuestbookInput = z.infer<typeof guestbookSchema>;
export type ContactInput = z.infer<typeof contactSchema>;