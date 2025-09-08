import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectFieldProps {
  id: string;
  options: Option[];
  value?: string[]; // Controlled value from parent
  onChange?: (values: string[]) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function MultiSelectInputField({
  id,
  options,
  value = [],
  onChange,
  className = "",
  placeholder = "Select...",
  disabled = false,
}: MultiSelectFieldProps) {
  const [selected, setSelected] = useState<string[]>(value);

  // Sync prop `value` to local state when it changes
  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!selected.includes(val)) {
      const updated = [...selected, val];
      setSelected(updated);
      onChange?.(updated);
    }
  };

  const removeOption = (val: string) => {
    const updated = selected.filter((v) => v !== val);
    setSelected(updated);
    onChange?.(updated);
  };

  return (
    <div>
      <select
        id={id}
        onChange={handleSelect}
        className={`px-4 py-2 w-full rounded-sm outline-none border border-[#E5E7EB] text-sm font-medium text-[#101418] transition-colors duration-200
          focus:ring-2 focus:ring-[#607AFB] focus:ring-opacity-50 ${className} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        value=""
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options
          .filter((opt) => !selected.includes(opt.value))
          .map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </select>

      <div className="mt-2 flex flex-wrap gap-2">
        {selected.map((val) => {
          const label = options.find((opt) => opt.value === val)?.label || val;
          return (
            <span
              key={val}
              className="bg-[#607AFB] text-white px-3 py-1 rounded-[1rem] flex items-center text-sm"
            >
              {label}
              <button
                type="button"
                onClick={() => removeOption(val)}
                className="ml-2 focus:outline-none hover:text-gray-300"
              >
                <X size={14} />
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}
