"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "glow";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center text-xs tracking-wide transition-all duration-150 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 select-none",
          {
            // Variants
            "bg-[#1A1A1A] text-[#F9F9F6] hover:bg-[#7A8B6B] border border-transparent rounded-full shadow-xs":
              variant === "default",
            "border border-[#E5E5DF] bg-transparent text-[#1A1A1A] hover:border-[#7A8B6B] hover:text-[#7A8B6B] rounded-full":
              variant === "outline",
            "text-[#666662] hover:text-[#1A1A1A] bg-transparent":
              variant === "ghost",
            "bg-[#F0F0EB] text-[#1A1A1A] hover:bg-[#E5E5DF] rounded-full":
              variant === "secondary",
            "bg-[#1A1A1A] text-white hover:bg-[#7A8B6B] rounded-full":
              variant === "glow",

            // Sizes
            "h-8 px-3 text-xs gap-1.5": size === "sm",
            "h-10 px-4 text-xs gap-2": size === "md",
            "h-12 px-6 text-sm gap-2.5": size === "lg",
            "h-9 w-9 rounded-full": size === "icon",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
