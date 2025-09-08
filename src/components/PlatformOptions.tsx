interface PlatformOptionProps {
  header: string;
  text: string;
  icon: any;
  isActive?: boolean;
  onClick: () => void;
}

export const PlatformOption = ({
  header,
  text,
  icon,
  isActive,
  onClick,
}: PlatformOptionProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-space p-4 gap-x-4 cursor-pointer ${
        isActive ? `border-[#607AFB] border-2` : `border-[#e1e5ea]`
      } border-1 rounded-[1rem] hover:ring-2 hover:ring-[#607AFB] hover:ring-opacity-50`}
    >
      <div>{icon}</div>
      <div>
        <strong className="text-[#232b39] font-semibold text-base">
          {header}
        </strong>
        <p className="text-[#5a677d] text-sm">{text}</p>
      </div>
    </div>
  );
};
