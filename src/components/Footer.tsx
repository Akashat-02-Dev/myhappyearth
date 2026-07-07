"use client";

import Image from "next/image";
import Link from 'next/link';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Leaf, 
  Truck, 
  ShieldCheck 
} from 'lucide-react';
import { Playfair_Display, Montserrat } from 'next/font/google';

// 1. INITIALIZE FONTS
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['700', '800'], 
  style: ['normal', 'italic'] 
});

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['400', '500'] 
});

// 2. DYNAMIC ROUTING HELPER
const getHrefForLink = (linkName: string) => {
  switch (linkName) {
    case 'Join The Movement':
    case 'Take Action':
      return '/contact'; 
    case 'Enquiry':
      return '/enquiry';
    case 'FAQs':
      return '/contact#faq';
    case 'How To Order':
      return '/contact#how-to-order';
    case 'Impact Stories':
      return '/impact'; 
    case 'Our Mission':
      return '/our-impact'; 
    case 'Privacy Policy':
    case 'Terms & Conditions':
      return '/legal';
    default:
      return `/${linkName.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-')}`;
  }
};

// 3. ENHANCED LINK COLUMN (Dynamic category filtering & animated underlines)
function FooterLinkColumn({ 
  title, 
  links, 
  isShopCategory = false 
}: { 
  title: string; 
  links: string[]; 
  isShopCategory?: boolean 
}) {
  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-sm font-bold uppercase tracking-widest text-[#FAF3DD]">
        {title}
      </h4>
      <div className="flex flex-col gap-3.5">
        {links.map((link, index) => {
          // Shop categories use URL search params, standard links use Next.js paths
          const targetHref = isShopCategory 
            ? (link === 'All Products' ? '/products/shop' : `/products/shop?category=${encodeURIComponent(link)}`)
            : getHrefForLink(link);

          return (
            <Link 
              key={index} 
              href={targetHref} 
              className="group relative text-[#FAF3DD]/70 hover:text-[#FAF3DD] text-sm transition-colors duration-300 w-fit flex items-center gap-2"
            >
              <span className="relative overflow-hidden py-0.5">
                {link}
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#A3B18A] -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  );
}

// 4. SOCIAL MEDIA ICONS
function SocialMedia() {
  // Added backdrop-blur-md for a frosted glass effect on the icon backgrounds
  const iconWrapperClasses = "flex items-center justify-center w-10 h-10 rounded-full bg-[#FAF3DD]/5 backdrop-blur-md border border-[#FAF3DD]/10 text-[#FAF3DD] hover:bg-[#A3B18A] hover:border-[#A3B18A] hover:text-[#344E41] hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(163,177,138,0.4)] transition-all duration-300 ease-out";
  
  return (
    <div className="flex items-center gap-3 mt-2">
      <a href="#" className={iconWrapperClasses} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
        <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/></svg>
      </a>
      
      <a href="#" className={iconWrapperClasses} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
        <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z" fill="currentColor"/></svg>
      </a>
      
      <a href="#" className={iconWrapperClasses} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
        <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.378H5.078z" fill="currentColor"/></svg>
      </a>

      <a href="#" className={iconWrapperClasses} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
        <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="currentColor"/></svg>
      </a>
    </div>
  );
}

// 5. MAIN FOOTER COMPONENT
export default function Footer() {
  const shopLinks = [
    "Everyday Earth",
    "Earth At Scale"
  ];
  
  const companyLinks = ["Our Mission", "Take Action", "Impact Stories", "Join The Movement"];
  const supportLinks = ["FAQs", "How To Order", "Privacy Policy", "Terms & Conditions"];
  
  return (
    <footer className="w-full bg-[#344E41] text-[#FAF3DD] pt-20 pb-8 px-6 md:px-12 lg:px-24 font-sans border-t border-[#FAF3DD]/5 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A3B18A]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Middle: Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Contact (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div>
              <Link href="/" className="flex items-center text-[#FAF3DD] font-extrabold text-2xl group cursor-pointer mb-6 w-fit hover:scale-[1.02] transition-transform duration-300 ease-out">
                <Image
                  src="/logo.png"
                  alt="My Happy Earth Logo"
                  width={400} 
                  height={100} 
                  quality={100}
                  priority 
                  className="w-auto h-16 md:h-20 object-contain drop-shadow-md" 
                /> 
                <span className={`${playfair.className} ml-4 text-2xl md:text-[1.75rem] font-bold tracking-wide uppercase leading-none`}>
                  my happy earth
                </span>
              </Link>
              
              <p className={`${montserrat.className} text-[#FAF3DD]/80 font-medium text-sm md:text-[15px] leading-relaxed max-w-sm`}>
                Curating sustainable, eco-friendly products that are kind to you and gentle on the planet. Small changes, massive impact.
              </p>
            </div>

            {/* Detailed Contact Info */}
            <div className="flex flex-col gap-4 text-sm text-[#FAF3DD]/70">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-[#A3B18A] shrink-0 mt-0.5" />
                <span className="group-hover:text-[#FAF3DD] transition-colors leading-relaxed">
                  Sydney: Thornleigh NSW 2120<br/>
                  Brisbane: Holmview QLD 4207
                </span>
              </div>
              <a href="mailto:hello@myhappyearth.com.au" className="flex items-center gap-3 group w-fit">
                <Mail className="w-5 h-5 text-[#A3B18A] shrink-0" />
                <span className="group-hover:text-[#FAF3DD] transition-colors">hello@myhappyearth.com.au</span>
              </a>
              <a href="tel:1800123456" className="flex items-center gap-3 group w-fit">
                <Phone className="w-5 h-5 text-[#A3B18A] shrink-0" />
                <span className="group-hover:text-[#FAF3DD] transition-colors">+61 (0)469 746 076</span>
              </a>
            </div>

            <SocialMedia />
          </div>
          
          {/* Link Columns (Span 2 columns each) */}
          <div className="lg:col-span-2 lg:ml-8 mt-2 lg:mt-0">
            <FooterLinkColumn title="Shop" links={shopLinks} isShopCategory={true} />
          </div>
          
          <div className="lg:col-span-2 mt-2 lg:mt-0">
            <FooterLinkColumn title="About Us" links={companyLinks} />
            <div className="mt-12">
              <FooterLinkColumn title="Support" links={supportLinks} />
            </div>
          </div>

          {/* Newsletter Column (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:pl-8 mt-4 lg:mt-0">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#FAF3DD]">
              Stay Connected
            </h4>
            <p className="text-[#FAF3DD]/70 text-sm leading-relaxed">
              Join 50,000+ eco-warriors. Get exclusive offers, new arrivals, and zero-waste tips delivered to your inbox.
            </p>
            
            <form className="relative flex flex-col gap-3 group mt-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  required
                  suppressHydrationWarning={true}
                  className="w-full bg-[#FAF3DD]/5 backdrop-blur-md border border-[#FAF3DD]/10 px-5 py-4 pr-16 rounded-2xl text-sm text-[#FAF3DD] placeholder:text-[#FAF3DD]/40 focus:border-[#A3B18A] focus:ring-2 focus:ring-[#A3B18A]/20 focus:bg-[#FAF3DD]/10 outline-none transition-all duration-300 shadow-inner"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 aspect-square bg-[#A3B18A] text-[#344E41] rounded-xl flex items-center justify-center hover:bg-[#FAF3DD] hover:shadow-[0_4px_15px_rgba(163,177,138,0.4)] hover:-translate-y-0.5 transition-all duration-300 ease-out"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-5 h-5 font-bold" />
                </button>
              </div>
              <p className="text-[11px] text-[#FAF3DD]/50 px-2">
                By subscribing, you agree to our <Link href="/legal" className="underline hover:text-[#FAF3DD] transition-colors">Privacy Policy</Link>.
              </p>
            </form>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FAF3DD]/15 to-transparent mb-8"></div>

        {/* Bottom Bar - Fixed Flexbox for responsiveness */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#FAF3DD]/60 w-full">
          
          {/* Left Side: Brand & Region */}
          <div className="flex items-center gap-2 text-center md:text-left">
            <span>© {new Date().getFullYear()} My Happy Earth. All rights reserved.</span>
          </div>
          
          {/* Right Side: Legal Links */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 font-medium">
            <Link href="/legal" className="hover:text-[#FAF3DD] transition-colors">Privacy Policy</Link>
            <div className="w-1 h-1 rounded-full bg-[#FAF3DD]/30 hidden sm:block"></div>
            <Link href="/legal" className="hover:text-[#FAF3DD] transition-colors">Terms of Service</Link>
            <div className="w-1 h-1 rounded-full bg-[#FAF3DD]/30 hidden sm:block"></div>
            <Link href="/contact" className="hover:text-[#FAF3DD] transition-colors">Contact</Link>
          </div>
          
        </div>

      </div>
    </footer>
  );
}