"use client";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import CountUp from "react-countup";
import SelectField from "../Inputs/SelectInputField";
import clsx from "clsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartCardProps {
  title: string;
  labels: string[];
  dataPoints: number[];
  color?: string; // main line color
  className?: string;
  setGroupBy: (val: any) => void;
  groupBy?: string;
}

export default function LineChart({
  title,
  labels,
  dataPoints,
  color = "#4F46E5",
  className = "h-60 p-4 py-8",
  setGroupBy,
  groupBy,
}: LineChartCardProps) {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        borderColor: color,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return `${color}33`;
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, `${color}33`);
          gradient.addColorStop(1, `${color}05`);
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: color,
        pointBorderWidth: 2,
        pointBorderColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            family: "Poppins", // 👈 use Poppins here
            size: 12,
          },
          color: "#4B5563",
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#111",
        bodyColor: "#4B5563",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            // Make sure tooltip also shows integers only
            return `${context.dataset.label}: ${Math.round(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#6B7280", font: { size: 12 } },
        grid: { color: "#F3F4F6" },
      },
      y: {
        ticks: {
          color: "#6B7280",
          font: { size: 12 },
          callback: function (value: any) {
            return Number.isInteger(value) ? value : ""; // only show whole numbers
          },
        },
        grid: { color: "#F3F4F6" },
      },
    },
  };

  const groupOptions = [
    { label: "Yearly", value: "year" },
    { label: "Monthly", value: "month" },
    { label: "Daily", value: "day" },
  ];

  return (
    <div className="rounded-sm bg-white shadow">
      {/* Header */}
      <div className="flex items-center justify-between p-4 mb-4 border-b border-[#E5E7EB]">
        <h2 className="text-[.9rem] md:text-[1.1rem] font-[600] text-[#1F2937]">
          {title}
        </h2>
        <div className="flex items-center md:gap-x-2 text-[#4B5563] text-[.9rem] font-[400]">
          {groupOptions.map((option) => {
            return (
              <div
                className={clsx(
                  "group hover:bg-indigo-100 py-1 px-2 hover:rounded-sm hover:font-[500] cursor-pointer",
                  option.value === groupBy &&
                    "bg-indigo-100 py-1 px-2 rounded-sm"
                )}
                onClick={() => setGroupBy(option.value)}
              >
                <span
                  className={clsx(
                    "group-hover:text-blue-500",
                    option.value === groupBy && "text-indigo-500 font-[500]"
                  )}
                >
                  {option.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={className}>
        <Line data={data as any} options={options} />
      </div>
    </div>
  );
}
