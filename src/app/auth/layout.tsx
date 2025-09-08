"use client";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className="">
      <div className="flex justify-center items-center pt-12">
        <div className="flex flex-col gap-6 p-8 w-full max-w-md rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
