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
          "inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 select-none",
          {
            // Variants
            "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 border border-transparent shadow-sm active:scale-[0.98]":
              variant === "default",
            "border border-zinc-300 dark:border-zinc-800 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900/60 text-zinc-900 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-700 active:scale-[0.98]":
              variant === "outline",
            "hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100":
              variant === "ghost",
            "bg-zinc-200/80 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 active:scale-[0.98]":
              variant === "secondary",
            "bg-zinc-900 text-zinc-100 border border-zinc-700 shadow-[0_0_15px_rgba(255,255,255,0.08)] dark:shadow-[0_0_20px_rgba(255,255,255,0.12)] hover:border-zinc-500 active:scale-[0.98]":
              variant === "glow",

            // Sizes
            "h-8 px-3 text-[11px] rounded-md gap-1.5": size === "sm",
            "h-10 px-4 text-xs rounded-md gap-2": size === "md",
            "h-12 px-6 text-sm rounded-lg gap-2.5": size === "lg",
            "h-9 w-9 rounded-md": size === "icon",
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
