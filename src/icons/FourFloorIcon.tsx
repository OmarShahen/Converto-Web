import React from "react";

interface FourFloorIconProps {
  className?: string;
}

const FourFloorIcon = ({ className = "w-5 h-5" }: FourFloorIconProps) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 2a1 1 0 011-1h14a1 1 0 011 1v2H2V2z" />
      <path d="M2 5h16v3H2V5z" />
      <path d="M2 9h16v3H2V9z" />
      <path d="M2 13h16v4a1 1 0 01-1 1H3a1 1 0 01-1-1v-4z" />
    </svg>
  );
};

export default FourFloorIcon;
