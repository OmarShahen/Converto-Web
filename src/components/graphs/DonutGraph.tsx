"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  title: string;
  labels: string[];
  dataPoints: number[];
  colors?: string[];
  className?: string;
}

export default function DonutChart({
  title,
  labels,
  dataPoints,
  colors = ["#4F46E5", "#22C55E", "#F97316", "#EF4444", "#06B6D4"],
  className = "h-60 p-4 py-8",
}: DonutChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        backgroundColor: colors,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // 👈 makes it a donut
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          font: {
            family: "Poppins",
            size: 12,
          },
          color: "#4B5563",
          padding: 16,
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
            const value = context.parsed;
            return `${context.label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="rounded-sm bg-white shadow">
      {/* Header */}
      <div className="flex items-center justify-between p-4 mb-4 border-b border-[#E5E7EB]">
        <h2 className="text-[.9rem] md:text-[1.1rem] font-[600] text-[#1F2937]">
          {title}
        </h2>
      </div>
      <div className={className}>
        <Doughnut data={data as any} options={options} />
      </div>
    </div>
  );
}
