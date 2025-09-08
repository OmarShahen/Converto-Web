"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface LegalPageHeaderProps {
  title: string;
  subtitle?: string;
}

export const LegalPageHeader = ({ title, subtitle }: LegalPageHeaderProps) => {
  const router = useRouter();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#607AFB] hover:text-[#4F46E5] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0d151c]">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};