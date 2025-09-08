import React from "react";
import { Plus } from "lucide-react";

type EmptySectionProps = {
  title?: string;
  onAddClick?: () => void;
};

const EmptySection: React.FC<EmptySectionProps> = ({
  title = "No data to display.",
  onAddClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
      <p className="text-lg mb-4">{title}</p>
      {onAddClick && (
        <button
          onClick={onAddClick}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add New Item
        </button>
      )}
    </div>
  );
};

export default EmptySection;
