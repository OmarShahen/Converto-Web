import clsx from "clsx";

export const SearchFilterWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx("grid grid-cols-1 md:grid-cols-3 gap-4 mb-4", className)}
    >
      {children}
    </div>
  );
};
