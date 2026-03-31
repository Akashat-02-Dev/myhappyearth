"use client";

import { useState, useEffect, useRef, FC, JSX } from 'react';

interface Metric {
  id: number;
  number: string;
  label: string;
  icon: JSX.Element;
}

const metricsData: Metric[] = [
  {
    id: 1,
    number: "500+",
    label: "Products Recycled",
    icon: (
      <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    )
  },
  {
    id: 2,
    number: "1,200+",
    label: "Trees Planted",
    icon: (
      <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    )
  },
  {
    id: 3,
    number: "800kg",
    label: "Plastic Diverted",
    icon: (
      <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5c2.5-1.5 5.5-1.5 8 0s5.5 1.5 8 0m-16-6c2.5-1.5 5.5-1.5 8 0s5.5 1.5 8 0" />
      </svg>
    )
  },
  {
    id: 4,
    number: "3,500+",
    label: "Happy Customers",
    icon: (
      <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    )
  }
];

const ImpactMetrics: FC = () => {
  // Triple the data array to allow for seamless infinite sliding left and right
  const extendedMetrics = [...metricsData, ...metricsData, ...metricsData];
  
  // Start at index 4 (the beginning of the middle set) to allow sliding in both directions
  const [currentIndex, setCurrentIndex] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef<'left' | 'right' | null>(null);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Handle the seamless infinite snapping
  useEffect(() => {
    const transitionDuration = 500; // Matches Tailwind's duration-500

    // If we slide far enough right (index 9 looks identical to index 5)
    if (currentIndex === 9) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false); // Turn off animation
        setCurrentIndex(5); // Instantly snap back to the middle
      }, transitionDuration);
      return () => clearTimeout(timeout);
    }

    // If we slide far enough left (index 0 looks identical to index 4)
    if (currentIndex === 0) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false); // Turn off animation
        setCurrentIndex(4); // Instantly snap back to the middle
      }, transitionDuration);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const startScrolling = (direction: 'left' | 'right') => {
    if (directionRef.current === direction) return;
    directionRef.current = direction;

    // Slide immediately on initial hover
    if (direction === 'right') nextSlide();
    else prevSlide();

    // Set an interval to keep sliding exactly 1 item every 1.5 seconds while hovering
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (direction === 'right') nextSlide();
      else prevSlide();
    }, 1500);
  };

  const stopScrolling = () => {
    directionRef.current = null;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const threshold = width / 2;

    if (mouseX > threshold) {
      startScrolling('right');
    } else {
      startScrolling('left');
    }
  };

  return (
    <section
      className="w-full bg-[#588157] text-[#FAF3DD] py-12 overflow-hidden flex items-center border-y border-[#FAF3DD]/10"
      onMouseMove={handleMouseMove}
      onMouseLeave={stopScrolling}
    >
      {/* The track translates left or right based on the currentIndex.
        We translate by exactly 33.333% because exactly 3 items fit on the screen.
      */}
      <div
        className={`flex w-full ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${currentIndex * 33.333333}%)` }}
      >
        {extendedMetrics.map((metric, index) => (
          <div
            key={index}
            // Strict w-1/3 ensures exactly 3 items are always visible
            className="w-1/3 flex-shrink-0 flex items-center justify-center gap-2 md:gap-4 px-2 md:px-8 hover:cursor-default"
          >
            <div className="opacity-90 flex items-center justify-center">
              {metric.icon}
            </div>
            
            {/* Flex column on small screens so the text doesn't overflow the 1/3 boundary */}
            <div className="flex flex-col xl:flex-row xl:items-baseline gap-1 xl:gap-2 text-center xl:text-left">
              <span className="font-sans font-extrabold text-xl md:text-3xl lg:text-4xl tracking-tight">
                {metric.number}
              </span>
              <span className="font-sans font-medium text-[10px] md:text-xs lg:text-sm tracking-widest uppercase opacity-90 whitespace-nowrap">
                {metric.label}
              </span>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactMetrics;