"use client";

import CountUp from "react-countup";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { formatDaysRange } from "@/utils/text-formatter";

interface StatsCardProps {
  title: string;
  value: number;
  unit?: string; // e.g. "sec", "ms", "orders"
  icon?: React.ReactNode;
  iconBg?: string;
  change?: number;
  rangePeriod?: number;
}

export default function StatsCard({
  title,
  value,
  unit,
  icon,
  iconBg = "bg-gray-100",
  change,
  rangePeriod = 0,
}: StatsCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <div className="bg-white rounded-sm p-4 shadow transition-shadow">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs md:text-sm font-medium text-[#6B7280]">
          {title}
        </span>
        {icon && (
          <div
            className={clsx(
              iconBg,
              "p-2 rounded-md flex items-center justify-center text-gray-600"
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Value + Unit */}
      <div className="flex items-baseline gap-1 text-[1.5rem] font-semibold text-[#1F2937]">
        {(value && isFinite(value) && !isNaN(value)) ? <CountUp end={value} duration={1.5} separator="," /> : 0}
        {unit && <span className="text-sm text-gray-500">{unit}</span>}
      </div>

      {/* Change Indicator */}
      {change !== undefined && (
        <div
          className={clsx(
            "flex items-center text-xs md:text-sm mt-2 font-medium",
            isPositive ? "text-green-600" : "text-red-600"
          )}
        >
          <ArrowUpRight
            className={clsx("w-4 h-4", !isPositive && "rotate-90")}
          />
          {isPositive ? "+" : ""}
          {(isFinite(change) && !isNaN(change)) ? change.toFixed(0) : 0}%
          <span className="ml-1 text-gray-400 font-normal">
            vs {formatDaysRange(rangePeriod)}
          </span>
        </div>
      )}
    </div>
  );
}
