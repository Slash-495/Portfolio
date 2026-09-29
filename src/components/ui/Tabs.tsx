"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-6 sm:gap-8 border-b border-[#E5E5DF] overflow-x-auto",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative pb-3 text-xs uppercase tracking-wider transition-colors duration-150 whitespace-nowrap select-none",
              isActive
                ? "text-[#1A1A1A] font-medium border-b-2 border-[#1A1A1A] -mb-[1px]"
                : "text-[#8C8C85] hover:text-[#1A1A1A]"
            )}
          >
            <span className="flex items-center gap-1.5">
              {tab.icon}
              {tab.label}
              {tab.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EFEFEA] text-[#7A8B6B] font-mono">
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
