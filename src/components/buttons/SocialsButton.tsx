interface ButtonProp {
  text: string;
  icon: any;
  onClick: () => void;
  style?: string;
  textStyle?: string;
}

export const SocialsButton = ({
  text,
  icon,
  onClick,
  style,
  textStyle,
}: ButtonProp) => {
  return (
    <button
      onClick={onClick}
      className={`${style} shadow flex items-center justify-center border border-[#E5E7EB] w-full rounded-sm py-2.5 px-4 cursor-pointer`}
    >
      {icon}
      <span
        className={`${textStyle} text-[.9rem] color-[#232B39] font-normal ml-2`}
      >
        {text}
      </span>
    </button>
  );
};
