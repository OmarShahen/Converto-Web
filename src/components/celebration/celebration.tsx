"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function ConfettiEffect({
  duration = 5000,
}: {
  duration?: number;
}) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    const timer = setTimeout(() => setShowConfetti(false), duration);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateSize);
    };
  }, [duration]);

  if (!showConfetti) return null;

  return <Confetti width={dimensions.width} height={dimensions.height} />;
}
