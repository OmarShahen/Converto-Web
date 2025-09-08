import React from "react";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  form?: string;
}

export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  fullWidth = true,
  variant = "primary",
  className,
  form,
}: ButtonProps) {
  const base =
    "text-[.9rem] inline-flex items-center justify-center font-semibold rounded-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";
  const widthClass = fullWidth ? "w-full" : "w-fit";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  const variants: Record<typeof variant, string> = {
    primary: "bg-[#607AFB] text-white hover:bg-brand-hover",
    secondary: "border border-gray-300 bg-gray-100",
    ghost: "bg-transparent text-[#10A37F] hover:bg-[#F9FAFB]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      form={form}
      className={clsx(
        base,
        widthClass,
        disabledClass,
        variants[variant],
        "px-4 py-2",
        "shadow-sm",
        className
      )}
    >
      {children}
    </button>
  );
}
