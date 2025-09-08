import React from "react";
import { InputLabel } from "./InputLabel";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  id?: string;
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  error?: string;
}

export default function SelectField({
  id,
  options,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  className = "",
  name,
  placeholder,
  label,
  error,
}: SelectFieldProps) {
  const selectId = id || name || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="space-y-1">
      {label && (
        <InputLabel htmlFor={selectId}>
          {label}
        </InputLabel>
      )}
      
      <select
        id={selectId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        className={`px-4 py-2 w-full rounded-sm shadow outline-none border transition-colors duration-200 ${
          error 
            ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" 
            : "border-[#E5E7EB] focus:ring-2 focus:ring-[#607AFB] focus:ring-opacity-50"
        } ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : ""
        } text-sm font-medium text-[#101418] ${className}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => {
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
