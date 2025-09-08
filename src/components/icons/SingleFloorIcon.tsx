import React from "react";

interface SingleFloorIconProps {
  className?: string;
}

const SingleFloorIcon = ({ className = "w-5 h-5" }: SingleFloorIconProps) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12V6H4v10h12z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default SingleFloorIcon;
