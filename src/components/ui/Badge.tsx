import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "active" | "metric" | "subtle";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-tight transition-colors duration-150",
        {
          "bg-zinc-200/70 text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200 border border-zinc-300/50 dark:border-zinc-700/60":
            variant === "default",
          "border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-transparent":
            variant === "outline",
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium":
            variant === "active",
          "bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 font-semibold":
            variant === "metric",
          "bg-zinc-100 text-zinc-500 dark:bg-zinc-900/60 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800":
            variant === "subtle",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
