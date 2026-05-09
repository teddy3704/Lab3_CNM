import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm transition placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/15",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };