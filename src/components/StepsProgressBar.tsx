// components/TopProgressBar.tsx
import React from "react";

interface TopProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const StepsProgressBar: React.FC<TopProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full">
      <div
        className="h-full bg-[#607AFB] transition-all duration-300 ease-in-out rounded-full"
        style={{ width: `${progress}%` }}
      />
      <div>
        <span className="text-[#757575] font-[400] text-[.9rem]">
          Step {currentStep}/{totalSteps}
        </span>
      </div>
    </div>
  );
};

export default StepsProgressBar;
