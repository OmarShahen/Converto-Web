import React from "react";

interface ToggleSwitchProps {
  id?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export default function ToggleSwitch({
  id,
  checked,
  onChange,
  disabled = false,
  className = "",
  label,
}: ToggleSwitchProps) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-3 cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {label && (
        <span className="text-sm font-medium text-[#101418]">{label}</span>
      )}
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <div
          className={`w-10 h-5 rounded-full transition-colors duration-300 ${
            checked ? "bg-[#607AFB]" : "bg-[#eaedf1]"
          }`}
        />
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </div>
    </label>
  );
}
