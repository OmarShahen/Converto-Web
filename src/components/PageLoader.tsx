"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // Adjust to your transition speed

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`fixed top-0 left-0 h-[3px] bg-[#607AFB] z-50 transition-transform duration-300 ease-out ${
        loading ? "w-full scale-x-100" : "w-0 scale-x-0"
      }`}
      style={{ transformOrigin: "left" }}
    />
  );
}
