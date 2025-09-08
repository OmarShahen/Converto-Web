import React from "react";

interface TwoFloorIconProps {
  className?: string;
}

const TwoFloorIcon = ({ className = "w-5 h-5" }: TwoFloorIconProps) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v3H2V4z" />
      <path d="M2 9h16v7a2 2 0 01-2 2H4a2 2 0 01-2-2V9z" />
    </svg>
  );
};

export default TwoFloorIcon;
