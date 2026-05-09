"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  createGuestbookEntry,
  type GuestbookActionState,
} from "@/app/guestbook/actions";
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

const initialState: GuestbookActionState = {
  success: false,
};

export default function GuestbookForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    createGuestbookEntry,
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
        <CardTitle>Viết lời nhắn</CardTitle>
        <CardDescription>
          Biểu mẫu này dùng Server Actions và Zod để xử lý gọn phần gửi dữ liệu ngay trên server.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Tên của bạn</Label>
            <Input id="name" name="name" placeholder={profile.fullName} required />
            {state.errors?.name?.[0] ? (
              <p className="text-sm text-red-600">{state.errors.name[0]}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Lời nhắn</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Hãy để lại một lời nhắn chân thành về trải nghiệm của bạn..."
              rows={5}
              required
            />
            {state.errors?.message?.[0] ? (
              <p className="text-sm text-red-600">{state.errors.message[0]}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Đang gửi..." : "Gửi lời nhắn"}
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