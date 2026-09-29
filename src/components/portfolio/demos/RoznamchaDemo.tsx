"use client";

import * as React from "react";
import { Users, Calendar, Award, ArrowUpRight } from "lucide-react";

export function RoznamchaDemo() {
  const [selectedCohort, setSelectedCohort] = React.useState<"champions" | "loyal" | "at_risk">("champions");

  const segments = {
    champions: {
      label: "Champions (R=5, F=5, M=5)",
      description: "Highest recency, frequency, and monetary spend quintiles. Bought recently, buy often, and spend the most.",
      action: "Reward with exclusive early-access programs and VIP concierge support.",
      share: "14.2% of customer base",
      aov: "₹4,850",
    },
    loyal: {
      label: "Loyal Customers (R=3-4, F=4-5, M=3-4)",
      description: "Consistent repeat purchasers with steady order frequency across quarterly buying cycles.",
      action: "Upsell premium tiers and incentivize loyalty program milestones.",
      share: "26.8% of customer base",
      aov: "₹2,620",
    },
    at_risk: {
      label: "At-Risk Customers (R=1-2, F=3-5, M=3-5)",
      description: "Previously high-frequency or high-spend buyers who haven't ordered in >90 days.",
      action: "Trigger automated win-back SMS/email campaigns with personalized reactivation discounts.",
      share: "18.5% of customer base",
      aov: "₹3,150",
    },
  };

  const active = segments[selectedCohort];

  return (
    <div className="flex flex-col gap-5 p-5 rounded-xl border border-[#E5E5DF] bg-[#F9F9F6] text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E5DF] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#455A30] font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>PostgreSQL NTILE(5) RFM Segmentation</span>
          </div>
          <h4 className="text-sm font-medium mt-0.5 text-[#1A1A1A]">
            Roznamcha Customer Analytics & Retention Engine
          </h4>
        </div>

        <a
          href="https://roznamcha-ivj4.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[#455A30] hover:text-[#1A1A1A] font-mono font-medium underline underline-offset-4"
        >
          <span>Open Live App</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Segment Selector */}
      <div className="flex flex-wrap gap-2">
        {(["champions", "loyal", "at_risk"] as const).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedCohort(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
              selectedCohort === key
                ? "border-[#455A30] bg-[#455A30]/10 text-[#455A30] font-semibold"
                : "border-[#E5E5DF] bg-white text-[#666662] hover:text-[#1A1A1A]"
            }`}
          >
            {key === "champions" && "Champions"}
            {key === "loyal" && "Loyal Buyers"}
            {key === "at_risk" && "At-Risk Cohort"}
          </button>
        ))}
      </div>

      {/* Segment Breakdown */}
      <div className="p-4 rounded-xl border border-[#E5E5DF] bg-white space-y-3">
        <div className="flex justify-between items-baseline">
          <span className="text-xs font-mono font-bold text-[#1A1A1A]">{active.label}</span>
          <span className="text-xs font-mono text-[#455A30]">{active.share}</span>
        </div>
        <p className="text-xs text-[#666662] leading-relaxed">
          {active.description}
        </p>

        <div className="p-3 bg-[#F9F9F6] border border-[#E5E5DF] rounded-lg text-xs">
          <span className="font-mono text-[#8C8C85] text-[10px] uppercase block mb-1">
            Recommended Actionable Playbook:
          </span>
          <span className="text-[#1A1A1A] font-medium">{active.action}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E5E5DF] text-center font-mono">
          <div>
            <div className="text-[10px] text-[#8C8C85] uppercase">Average Order Value</div>
            <div className="text-sm font-bold text-[#1A1A1A]">{active.aov}</div>
          </div>
          <div>
            <div className="text-[10px] text-[#8C8C85] uppercase">Database Engine</div>
            <div className="text-sm font-bold text-[#455A30]">PostgreSQL Views</div>
          </div>
        </div>
      </div>
    </div>
  );
}
