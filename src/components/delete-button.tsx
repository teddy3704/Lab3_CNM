"use client";

import { useTransition } from "react";

import { deleteGuestbookEntry } from "@/app/guestbook/actions";
import { Button } from "@/components/ui/button";

interface DeleteButtonProps {
  id: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!window.confirm("Bạn có chắc muốn xoá lời nhắn này không?")) {
      return;
    }

    startTransition(async () => {
      await deleteGuestbookEntry(id);
    });
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-600 hover:bg-red-50 hover:text-red-700"
    >
      {isPending ? "Đang xoá..." : "Xoá"}
    </Button>
  );
}