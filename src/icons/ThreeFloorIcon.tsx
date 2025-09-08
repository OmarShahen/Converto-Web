import React from "react";

interface ThreeFloorIconProps {
  className?: string;
}

const ThreeFloorIcon = ({ className = "w-5 h-5" }: ThreeFloorIconProps) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 3a1 1 0 011-1h14a1 1 0 011 1v2H2V3z" />
      <path d="M2 7h16v3H2V7z" />
      <path d="M2 12h16v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5z" />
    </svg>
  );
};

export default ThreeFloorIcon;
