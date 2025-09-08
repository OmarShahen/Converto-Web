// components/FilterDropdown.tsx
import React, { useState } from "react";

type Option = {
  label: string;
  value: string;
};

type FilterDropdownProps = {
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
};

export const SearchFilter: React.FC<FilterDropdownProps> = ({
  options,
  onChange,
  placeholder = "Filter By Values",
  defaultValue,
  className,
}) => {
  const [selected, setSelected] = useState<string | null>(defaultValue || null);
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelected(value);
    setOpen(false);
    onChange(value);
  };

  const selectedLabel =
    options.find((opt) => opt.value === selected)?.label || placeholder;

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`${className} flex w-full items-center justify-between gap-2 rounded-sm border border-[#E5E7EB] shadow bg-white px-4 py-2 text-sm font-medium text-[#101418] min-w-[160px]`}
      >
        <span className="whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
          {selectedLabel}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 256 256"
          className="text-[#101418]"
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full min-w-[160px] rounded-md bg-white shadow-lg border border-gray-200 max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-sm text-gray-900 whitespace-nowrap"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
