"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  sendContactMessage,
  type ContactActionState,
} from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/lib/profile";

const initialState: ContactActionState = {
  success: false,
};

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gửi liên hệ</CardTitle>
        <CardDescription>
          Biểu mẫu này gửi trực tiếp đến Server Action và được kiểm tra bằng Zod trước khi xử lý.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Họ và tên</Label>
            <Input id="contact-name" name="name" placeholder={profile.fullName} required />
            {state.errors?.name?.[0] ? (
              <p className="text-sm text-red-600">{state.errors.name[0]}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              placeholder="email@example.com"
              required
            />
            {state.errors?.email?.[0] ? (
              <p className="text-sm text-red-600">{state.errors.email[0]}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-subject">Tiêu đề</Label>
            <Input
              id="contact-subject"
              name="subject"
              placeholder="Bạn muốn trao đổi về điều gì?"
              required
            />
            {state.errors?.subject?.[0] ? (
              <p className="text-sm text-red-600">{state.errors.subject[0]}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Nội dung</Label>
            <Textarea
              id="contact-message"
              name="message"
              rows={6}
              placeholder="Hãy mô tả đủ chi tiết để tôi có thể phản hồi chính xác và hữu ích hơn..."
              required
            />
            {state.errors?.message?.[0] ? (
              <p className="text-sm text-red-600">{state.errors.message[0]}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Đang gửi..." : "Gửi tin nhắn"}
            </Button>
            {state.message ? (
              <p className={state.success ? "text-sm text-emerald-700" : "text-sm text-red-600"}>
                {state.message}
              </p>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}