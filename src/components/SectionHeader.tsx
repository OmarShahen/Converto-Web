import CountUp from "react-countup";
import Button from "./buttons/Button";
import { Plus, ArrowLeft } from "lucide-react";

type SectionHeaderProps = {
  title: string;
  addBtnText?: string;
  total?: number;
  onAction?: () => void;
  childComponent?: any;
  showBackButton?: boolean;
  onBackClick?: () => void;
};

export const SectionHeader = ({
  title,
  addBtnText,
  total = 0,
  onAction,
  childComponent,
  showBackButton = false,
  onBackClick,
}: SectionHeaderProps) => {
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-3 py-4">
        <div className="flex items-center">
          {showBackButton && (
            <button
              onClick={onBackClick}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 flex items-center justify-center"
              title="Go back"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
          )}
          <p className="text-[#181818] tracking-light text-[2rem] font-bold leading-tight flex items-center">
            {title}{" "}
            {total !== 0 && (
              <span className="bg-[#eaedf1] p-2 text-base rounded py-0 ml-2 flex items-center justify-center font-semibold">
                <CountUp end={total} duration={1.5} />
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {addBtnText && (
            <Button onClick={onAction} fullWidth={false}>
              <Plus size={20} />
              <span className="truncate ml-2 text-sm">{addBtnText}</span>
            </Button>
          )}
          {childComponent}
        </div>
      </div>
    </div>
  );
};
