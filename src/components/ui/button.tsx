import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/20 active:scale-[0.99] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-zinc-950/90 bg-[linear-gradient(180deg,rgba(29,36,51,1),rgba(15,23,42,1))] !text-white shadow-[0_18px_40px_rgba(15,23,42,0.22),inset_0_1px_0_rgba(255,255,255,0.09)] hover:-translate-y-0.5 hover:bg-[linear-gradient(180deg,rgba(39,47,63,1),rgba(17,24,39,1))]",
        secondary:
          "border border-teal-900/10 bg-[linear-gradient(180deg,rgba(15,118,110,0.16),rgba(15,118,110,0.1))] !text-teal-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] hover:-translate-y-0.5 hover:bg-[linear-gradient(180deg,rgba(15,118,110,0.2),rgba(15,118,110,0.12))]",
        outline:
          "border border-zinc-300/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,244,237,0.92))] !text-zinc-950 shadow-[0_12px_28px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(251,248,243,0.96))]",
        ghost: "!text-zinc-700 hover:bg-white hover:!text-zinc-950",
        destructive: "border border-red-700 bg-[linear-gradient(180deg,rgba(220,38,38,1),rgba(185,28,28,1))] !text-white shadow-[0_14px_30px_rgba(127,29,29,0.18)] hover:-translate-y-0.5 hover:bg-[linear-gradient(180deg,rgba(239,68,68,1),rgba(185,28,28,1))]",
        link: "h-auto rounded-none px-0 py-0 !text-teal-700 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-3.5 text-xs",
        lg: "h-12 px-6 text-sm",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };