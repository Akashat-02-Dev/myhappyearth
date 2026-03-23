"use client";

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import ContactHeader from '@/components/contact/ContactHeader';
import ContactIconsGrid from '@/components/contact/ContactIconsGrid';
import ContactHeroDetails from '@/components/contact/ContactHeroDetails';
import ContactFormWrapper from '@/components/contact/ContactFormWrapper';

export default function ContactUsPage() {
  
  const scrollToForm = () => {
    document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative w-full bg-earth-deep">
      
      <div className="absolute top-0 w-full z-50">
        <Navbar invert={true} />
      </div>

      {/* SECTION 1: Standard Static Hero */}
      <section className="relative w-full h-screen flex flex-col bg-earth-deep z-10">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-outdoor-sunlit.jpeg" 
            alt="My Happy Earth outdoor patio"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-earth-forest/20 backdrop-brightness-[.80]"></div>
        </div>

        <div className="relative z-20 h-full flex flex-col pt-32 pb-12 px-6 md:px-12 lg:px-24 items-center justify-between">
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <ContactHeader />
            <ContactIconsGrid />
          </div>

          <div className="flex flex-col items-center gap-8 mt-auto">
            <ContactHeroDetails />
            <button 
              onClick={scrollToForm}
              className="animate-bounce flex flex-col items-center gap-2 text-earth-light/80 hover:text-white transition-colors cursor-pointer"
            >
              <span className="font-sans text-xs md:text-sm tracking-widest uppercase">Send a Message</span>
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: Stacked Form Section */}
      <section id="contact-form-section" className="relative w-full bg-earth-deep z-20">
        
        {/* Back to top button positioned within the form flow */}
        <div className="absolute top-12 md:top-24 left-6 md:left-12 z-50">
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-earth-light hover:text-white font-sans font-semibold transition-colors cursor-pointer bg-earth-deep p-2 md:px-4 rounded-lg backdrop-blur-sm shadow-md"
          >
            <svg className="w-5 h-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden md:inline">Back to Top</span>
            <span className="md:hidden">Top</span>
          </button>
        </div>

        <ContactFormWrapper />
        <Footer />
        
      </section>

    </main>
  );
}