import React from "react";

interface MainButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export default function CancelButton({
  children,
  onClick,
  className = "",
  fullWidth = true,
}: MainButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer px-4 py-2 font-semibold rounded-sm border border-gray-300 bg-white hover:bg-gray-100 ${className} ${
        fullWidth ? "w-full" : "w-fit"
      }`}
    >
      {children}
    </button>
  );
}
