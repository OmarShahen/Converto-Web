"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartCardProps {
  title: string;
  labels: string[];
  dataPoints: number[];
  color?: string; // bar color
  className?: string;
}

export default function BarChart({
  title,
  labels,
  dataPoints,
  color = "#4F46E5",
  className = "h-60 p-4 py-8",
}: BarChartCardProps) {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        backgroundColor: color,
        borderRadius: 6, // rounded bars
        barPercentage: 0.6,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#111",
        bodyColor: "#4B5563",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
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
            return Number.isInteger(value) ? value : "";
          },
        },
        grid: { color: "#F3F4F6" },
      },
    },
  };

  return (
    <div className="rounded-lg bg-white shadow">
      {/* Header */}
      <div className="flex items-center justify-between p-4 mb-4 border-b border-[#E5E7EB]">
        <h2 className="text-[1.1rem] font-[600] text-[#1F2937]">{title}</h2>
      </div>
      <div className={className}>
        <Bar data={data as any} options={options} />
      </div>
    </div>
  );
}
