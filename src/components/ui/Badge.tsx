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
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-normal tracking-tight transition-colors",
        {
          "bg-[#F0F0EB] text-[#1A1A1A] border border-[#E5E5DF]":
            variant === "default",
          "border border-[#E5E5DF] text-[#666662] bg-transparent":
            variant === "outline",
          "bg-[#7A8B6B]/10 text-[#7A8B6B] border border-[#7A8B6B]/30 font-medium":
            variant === "active",
          "bg-[#1A1A1A] text-[#F9F9F6] font-medium":
            variant === "metric",
          "bg-transparent text-[#8C8C85] border border-[#E5E5DF]":
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
