"use client";

import * as React from "react";
import { Database, TrendingUp, AlertTriangle, Truck, Layers } from "lucide-react";

export function OlistAnalyticsDemo() {
  const [selectedLayer, setSelectedLayer] = React.useState<"raw" | "staging" | "intermediate" | "marts">("marts");
  const [selectedMart, setSelectedMart] = React.useState<"logistics" | "seller" | "customer">("logistics");

  return (
    <div className="flex flex-col gap-5 p-5 rounded-xl border border-[#E5E5DF] bg-[#F9F9F6] text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E5DF] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#455A30] font-semibold">
            <Database className="w-3.5 h-3.5" />
            <span>ELT Warehouse Simulator • 100k+ Olist Orders</span>
          </div>
          <h4 className="text-sm font-medium mt-0.5 text-[#1A1A1A]">
            PostgreSQL 15 + Metabase BI Analytics Pipeline
          </h4>
        </div>

        {/* 4-Layer Selector */}
        <div className="flex items-center gap-1 bg-[#EFEFEA] p-1 rounded-lg text-xs font-mono">
          {(["raw", "staging", "intermediate", "marts"] as const).map((layer) => (
            <button
              key={layer}
              onClick={() => setSelectedLayer(layer)}
              className={`px-2.5 py-1 rounded text-xs transition-colors capitalize ${
                selectedLayer === layer
                  ? "bg-white text-[#1A1A1A] font-semibold shadow-xs"
                  : "text-[#666662] hover:text-[#1A1A1A]"
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      {/* Layer Description */}
      <div className="text-xs text-[#666662] font-mono flex items-center gap-2">
        <Layers className="w-3.5 h-3.5 text-[#455A30]" />
        {selectedLayer === "raw" && "Layer 01: Raw CSV ingestion via Kaggle API directly into raw_data schema."}
        {selectedLayer === "staging" && "Layer 02: Type casting, timestamp parsing, and duplicate deduplication in staging schema."}
        {selectedLayer === "intermediate" && "Layer 03: Relational joins (orders + order_items + payments + sellers) with business logic."}
        {selectedLayer === "marts" && "Layer 04: Denormalized dimensional marts optimized for sub-50ms Metabase BI queries."}
      </div>

      {selectedLayer === "marts" && (
        <div className="flex flex-col gap-4">
          {/* Mart Tabs */}
          <div className="flex gap-2">
            {[
              { id: "logistics", label: "Logistics Impact", icon: Truck },
              { id: "seller", label: "Seller Performance", icon: AlertTriangle },
              { id: "customer", label: "Customer Segments", icon: TrendingUp },
            ].map((mart) => {
              const Icon = mart.icon;
              return (
                <button
                  key={mart.id}
                  onClick={() => setSelectedMart(mart.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                    selectedMart === mart.id
                      ? "border-[#455A30] bg-[#455A30]/10 text-[#455A30] font-semibold"
                      : "border-[#E5E5DF] bg-white text-[#666662] hover:text-[#1A1A1A]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {mart.label}
                </button>
              );
            })}
          </div>

          {/* Key Findings Card */}
          <div className="p-4 rounded-xl border border-[#E5E5DF] bg-white">
            {selectedMart === "logistics" && (
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-[#666662] font-mono">mart_logistics_impact</span>
                  <span className="text-xs font-mono font-bold text-[#B91C1C]">R$ 1.73M Churn Risk</span>
                </div>
                <p className="text-xs text-[#2D2D2D] leading-relaxed">
                  Quantified that shipping delays cause average review scores to drop by <strong>2.4 stars</strong> (from 4.2 to 1.8), creating an estimated <strong>R$ 1.73M</strong> in lost revenue from customer attrition.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E5E5DF] text-center">
                  <div>
                    <div className="text-[10px] text-[#8C8C85] uppercase">Delay Penalty</div>
                    <div className="text-sm font-bold text-[#1A1A1A]">-2.4 ★</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8C8C85] uppercase">Impacted States</div>
                    <div className="text-sm font-bold text-[#1A1A1A]">AP, RR, AL</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8C8C85] uppercase">Lost Revenue</div>
                    <div className="text-sm font-bold text-[#B91C1C]">R$ 1.73M</div>
                  </div>
                </div>
              </div>
            )}

            {selectedMart === "seller" && (
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-[#666662] font-mono">mart_seller_performance</span>
                  <span className="text-xs font-mono font-bold text-[#455A30]">Operational Bottlenecks</span>
                </div>
                <p className="text-xs text-[#2D2D2D] leading-relaxed">
                  Isolated seller categories suffering from severe delivery duration anomalies (&gt;12 day averages) and low ratings (&lt;3.2), enabling targeted SLA enforcement.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E5E5DF] text-center">
                  <div>
                    <div className="text-[10px] text-[#8C8C85] uppercase">Avg Delivery</div>
                    <div className="text-sm font-bold text-[#1A1A1A]">12.4 Days</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8C8C85] uppercase">High Delay Vendors</div>
                    <div className="text-sm font-bold text-[#1A1A1A]">15.2%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8C8C85] uppercase">Rating Impact</div>
                    <div className="text-sm font-bold text-[#1A1A1A]">&lt; 3.2 ★</div>
                  </div>
                </div>
              </div>
            )}

            {selectedMart === "customer" && (
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-[#666662] font-mono">mart_customer_segments</span>
                  <span className="text-xs font-mono font-bold text-[#455A30]">2.4x Repeat AOV Lift</span>
                </div>
                <p className="text-xs text-[#2D2D2D] leading-relaxed">
                  Repeat buyers account for only 3.1% of customer volume but generate <strong>2.4x higher Average Order Value (AOV)</strong> than one-time shoppers.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E5E5DF] text-center">
                  <div>
                    <div className="text-[10px] text-[#8C8C85] uppercase">Repeat Base</div>
                    <div className="text-sm font-bold text-[#1A1A1A]">3.1%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8C8C85] uppercase">AOV Multiplier</div>
                    <div className="text-sm font-bold text-[#455A30]">2.4x</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8C8C85] uppercase">Primary Cohort</div>
                    <div className="text-sm font-bold text-[#1A1A1A]">São Paulo (SP)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
