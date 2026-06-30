// src/components/impact/FounderStory.tsx
"use client";
import React from 'react';

export default function FounderStory() {
  return (
    <section className="w-full bg-earth-light py-24 md:py-32 px-6 md:px-12 lg:px-24 relative z-10 flex flex-col items-center overflow-hidden">
      
      <div className="max-w-6xl w-full relative">
        {/* Subtle Background Glows for Depth */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-earth-sage/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-earth-leaf/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Main Card Container */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-earth-deep/5 overflow-hidden relative z-10 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] transition-shadow duration-500">
          
          {/* Large Decorative Quote Icon */}
          <div className="absolute top-8 left-8 md:top-12 md:left-12 text-earth-sage/10 select-none pointer-events-none transform -scale-x-100">
            <svg width="140" height="140" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <div className="relative z-10 p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Left Column: Header Section */}
            <div className="lg:w-1/3 flex flex-col items-start pt-4">
              <div className="inline-block bg-earth-sage/10 px-4 py-2 rounded-full border border-earth-sage/20 mb-6">
                <span className="font-sans font-bold text-earth-forest tracking-widest uppercase text-xs md:text-sm">
                  Founder's Note
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold text-earth-deep leading-tight">
                The Story Behind <br className="hidden lg:block"/>My Happy Earth.
              </h2>
              
              <div className="hidden lg:block w-16 h-1 bg-earth-sage/50 rounded-full mt-10"></div>
            </div>

            {/* Right Column: Story Content */}
            <div className="lg:w-2/3 flex flex-col">
              <div className="space-y-6 text-lg md:text-xl text-earth-deep/80 font-medium leading-relaxed">
                
                {/* Lead-in paragraph with a distinct editorial style */}
                <p className="text-xl md:text-2xl font-serif text-earth-deep leading-relaxed">
                  In 2022, I was standing in a Sydney warehouse looking at 50 "eco-friendly" packaging samples. The supplier promised all of them were sustainable. When I tested them in an independent lab, 47 failed their own claims.
                </p>
                
                <p>
                  That was the moment My Happy Earth was born. Not as another eco-store, but as a verification-first brand. Every product we sell has been tested, audited, or independently verified. Every claim on our labels is true.
                </p>
                
                <p>
                  Three years later, we've grown to a team, serving 3,500+ businesses. But the founding principle hasn't changed: <strong className="text-earth-deep font-extrabold border-b-2 border-earth-sage/30 pb-0.5">If we can't verify it, we don't sell it.</strong>
                </p>
              </div>

              {/* Signature Block */}
              <div className="mt-12 pt-8 border-t border-earth-deep/10 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  
                  {/* Clean Initial Avatar */}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-earth-light border border-earth-sage/40 flex items-center justify-center text-earth-forest font-serif font-bold text-xl md:text-2xl shadow-inner select-none">
                    AM
                  </div>
                  
                  <div className="flex flex-col">
                    <h4 className="font-serif font-bold text-xl md:text-2xl text-earth-deep mb-1">
                      Arijit Maity
                    </h4>
                    <p className="font-sans font-semibold text-xs md:text-sm tracking-widest uppercase text-earth-sage">
                      Founder & CEO
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}