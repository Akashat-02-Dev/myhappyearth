"use client";

import { ReactNode, useEffect, useState } from "react";

export default function Template({ children }: { children: ReactNode }) {
  // 1. State to track if the animation is currently running
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // 2. Our CSS animation takes exactly 0.7s (700ms). 
    // We wait 750ms to be safe, then remove the animation class entirely.
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 750);

    return () => clearTimeout(timer);
  }, []);

  return (
    // 3. Conditionally apply the animation class. 
    // Once it is removed, the 'fixed' Navbar is completely freed!
    <div className={isAnimating ? "animate-page-enter" : ""}>
      {children}
    </div>
  );
}