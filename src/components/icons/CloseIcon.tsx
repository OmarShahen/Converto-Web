import React from "react";

interface CloseIconProps {
  className?: string;
}

const CloseIcon = ({ className = "w-5 h-5" }: CloseIconProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
};

export default CloseIcon;
