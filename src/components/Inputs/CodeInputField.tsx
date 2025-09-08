import React, { useRef } from "react";

type Props = {
  length?: number;
  onChange: (code: string) => void;
};

export default function CodeInputField({ length = 6, onChange }: Props) {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updatedValues = inputsRef.current.map((input, i) =>
      i === index ? value : input?.value || ""
    );

    onChange(updatedValues.join(""));

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("Text").replace(/\D/g, ""); // remove non-digits
    if (!pasteData) return;

    const values = pasteData.slice(0, length).split("");

    values.forEach((val, i) => {
      const input = inputsRef.current[i];
      if (input) {
        input.value = val;
      }
    });

    // Update state
    onChange(values.join(""));

    // Focus the last filled input
    const last = values.length >= length ? length - 1 : values.length;
    inputsRef.current[last]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !inputsRef.current[index]?.value &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const setInputRef = (element: HTMLInputElement | null, index: number) => {
    if (element) {
      inputsRef.current[index] = element;
    }
  };

  return (
    <div className="flex gap-2 justify-between">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => setInputRef(el, i)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center rounded-sm outline-none bg-[#eaedf1] text-lg font-semibold text-gray-900 focus:ring-2 focus:ring-[#607AFB] focus:ring-opacity-50 transition-colors duration-200"
        />
      ))}
    </div>
  );
}
