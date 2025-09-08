interface InputLabelProps {
  htmlFor: string;
  children: any;
}

export const InputLabel = ({ htmlFor = "", children }: InputLabelProps) => {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold color-[#282828]">
      {children}
    </label>
  );
};
