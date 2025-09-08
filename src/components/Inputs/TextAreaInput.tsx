import React from "react";
import { InputLabel } from "./InputLabel";

interface TextAreaFieldProps {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name?: string;
  rows?: number;
  defaultValue?: string;
  label?: string;
  error?: string;
}

export default function TextAreaInput({
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  className = "",
  name,
  defaultValue,
  rows = 4,
  label,
  error,
}: TextAreaFieldProps) {
  const textareaId = id || name || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="space-y-1">
      {label && (
        <InputLabel htmlFor={textareaId}>
          {label}
        </InputLabel>
      )}
      
      <textarea
        id={textareaId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className={`px-4 py-2 w-full rounded-sm outline-none border transition-colors duration-200 resize-none ${
          error 
            ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" 
            : "border-[#E5E7EB] focus:ring-2 focus:ring-[#607AFB] focus:ring-opacity-50"
        } ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : ""
        } text-sm font-medium text-[#101418] ${className}`}
      />
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
