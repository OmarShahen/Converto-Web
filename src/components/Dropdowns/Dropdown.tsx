"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronsUpDown } from "lucide-react";

type Item = {
  label: string;
  value: string | null;
};

type DropdownProps = {
  items: Item[];
  selected: Item;
  onSelect: (value: Item) => void;
};

export default function Dropdown({ items, selected, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {/* Trigger */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="text-[#171717] font-[500] flex items-center gap-x-1 ml-2 cursor-pointer bg-gray-100 px-2 py-1 rounded-sm hover:opacity-75"
      >
        {selected.label}
        <ChevronsUpDown size={15} />
      </div>

      {/* Menu */}
      {open && (
        <div className="absolute left-0 mt-1 w-auto rounded-sm border border-[#E5E7EB] shadow bg-white border z-50">
          {items.map((item) => (
            <div
              key={item.value}
              onClick={() => {
                onSelect(item);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex-1 truncate ${
                item.value === selected.value ? "bg-gray-50 font-medium" : ""
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
