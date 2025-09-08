import React, { ReactNode } from "react";
import { InputLabel } from "./InputLabel";

interface MainInputProps {
  id?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  autoComplete?: string;
  name?: string;
  defaultValue?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  label?: string;
  error?: string;
  step?: string;
}

export default function InputField({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  className = "",
  autoComplete,
  name,
  defaultValue,
  icon,
  iconPosition = "left",
  label,
  error,
  step,
}: MainInputProps) {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="space-y-1">
      {label && (
        <InputLabel htmlFor={inputId}>
          {label}
        </InputLabel>
      )}
      
      <div
        className={`shadow flex items-center px-3 py-2 rounded-sm bg-white border transition-colors duration-200 
          ${error 
            ? "border-red-300 focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-opacity-50" 
            : "border-[#E5E7EB] focus-within:ring-2 focus-within:ring-[#607AFB] focus-within:ring-opacity-50"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
          ${className}`}
      >
        {icon && iconPosition === "left" && (
          <span className="mr-2 text-gray-500">{icon}</span>
        )}

        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          name={name}
          defaultValue={defaultValue}
          step={step}
          className="flex-1 bg-transparent outline-none text-sm font-medium text-[#101418]"
        />

        {icon && iconPosition === "right" && (
          <span className="ml-2 text-gray-500">{icon}</span>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
