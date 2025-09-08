"use client";

import { BotMessageSquare } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex flex-col items-center text-center px-2">
      {/* Logo Row */}
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-[#607AFB] rounded-xl shadow-md">
          <BotMessageSquare size={24} color="white" />
        </div>
        <span className="font-bold text-lg text-[#607AFB] whitespace-nowrap">
          Converto
        </span>
      </div>
    </div>
  );
}
