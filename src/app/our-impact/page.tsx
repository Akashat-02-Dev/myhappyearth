// src/app/our-impact/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/impact/HeroSection';
import ImpactDashboard from '@/components/impact/ImpactDashboard';
import TimelineSection from '@/components/impact/TimelineSection';
import FounderStory from '@/components/impact/FounderStory';

export default function OurImpactPage() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStory = () => {
    document.getElementById('impact-story')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative w-full bg-earth-deep">
      
      <div className="absolute top-0 w-full z-50">
        <Navbar invert={true} />
      </div>
      
      <HeroSection onOpenStory={scrollToStory} />
      
      <section id="impact-story" className="relative w-full bg-earth-deep z-20">
        <ImpactDashboard 
          isStoryOpen={hasScrolled} 
          onCloseStory={scrollToTop} 
        />
        
        <TimelineSection />

        <FounderStory />
        
        <Footer />
      </section>
    </main>
  );
}