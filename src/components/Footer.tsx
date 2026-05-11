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

// Dynamic routing helper for standard pages
const getHrefForLink = (linkName: string) => {
  switch (linkName) {
    case 'Contact Us':
    case 'Enquiry':
      return '/contact?view=form';
    case 'FAQs':
      return '/contact?view=faq';
    case 'Blog':
      return '/impact';
    case 'Privacy Policy':
    case 'Terms & Conditions':
      return '/legal';
    case 'Our Story':
    case 'Sustainability Report':
    case 'Our Impact':
      return `/${linkName.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-')}`;
    default:
      return `/${linkName.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-')}`;
  }
};

// Trust Signal Banner Component
function TrustSignals() {
  const signals = [
    { icon: Leaf, title: "100% Sustainable", desc: "Ethically sourced materials" },
    { icon: Truck, title: "Carbon Neutral Shipping", desc: "Free delivery on orders over $100" },
    { icon: ShieldCheck, title: "Secure Checkout", desc: "Encrypted & safe payments" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-b border-[#FAF3DD]/10 mb-16">
      {signals.map((signal, idx) => (
        <div key={idx} className="flex items-center gap-4 group">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FAF3DD]/5 border border-[#FAF3DD]/10 text-[#A3B18A] group-hover:bg-[#A3B18A] group-hover:text-[#344E41] transition-all duration-500 ease-out shadow-sm">
            <signal.icon className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-[#FAF3DD] font-semibold text-sm tracking-wide">{signal.title}</h4>
            <p className="text-[#FAF3DD]/60 text-xs mt-0.5">{signal.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Enhanced Link Column with animated underlines and dynamic category routing
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
          // Determine routing: Category filter vs Standard page
          const targetHref = isShopCategory 
            ? (link === 'All Products' ? '/products/shop' : `/products/shop?category=${encodeURIComponent(link)}`)
            : getHrefForLink(link);

          return (
            <Link 
              key={index} 
              href={targetHref} 
              className="group relative text-[#FAF3DD]/70 hover:text-[#FAF3DD] text-sm transition-colors duration-300 w-fit flex items-center gap-2"
            >
              <span className="relative overflow-hidden">
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

// Social media
function SocialMedia() {
  const iconWrapperClasses = "flex items-center justify-center w-10 h-10 rounded-full bg-[#FAF3DD]/5 border border-[#FAF3DD]/10 text-[#FAF3DD] hover:bg-[#A3B18A] hover:border-[#A3B18A] hover:text-[#344E41] hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(163,177,138,0.3)] transition-all duration-300 ease-out";
  return (
    <div className="flex items-center gap-3">
      <Link href="#" className={iconWrapperClasses} aria-label="Facebook">
        <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/></svg>
      </Link>
      <Link href="#" className={iconWrapperClasses} aria-label="Instagram">
        <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z" fill="currentColor"/></svg>
      </Link>
      <Link href="#" className={iconWrapperClasses} aria-label="Twitter">
        <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" fill="currentColor"/></svg>
      </Link>
    </div>
  );
}

export default function Footer() {
  const shopLinks = [
    "All Products", 
    "Sustainable Bags", 
    "Compostable Products", 
    "Biodegradable Products", 
    "Table Products", 
    "Natura Dine", 
    "Zero Waste", 
    "EcoServe", 
    "Recycled Plastic"
  ];
  
  const companyLinks = ["Our Story", "Our Impact", "Blog", "Sustainability Report"];
  const supportLinks = ["FAQs", "Privacy Policy", "Terms & Conditions"];
  
  return (
    <footer className="w-full bg-[#344E41] text-[#FAF3DD] pt-10 pb-8 px-6 md:px-12 lg:px-24 font-sans border-t border-[#FAF3DD]/5 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A3B18A]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Top: Trust Signals */}
        <TrustSignals />
        
        {/* Middle: Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Contact (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div>
              <div className="flex items-center text-[#FAF3DD] font-extrabold text-2xl group cursor-pointer mb-4">
                <Image
                  src="/logo.png"
                  alt="My Happy Earth Logo"
                  width={400} // High resolution source width to prevent any blur
                  height={100} // High resolution source height
                  quality={100}
                  priority 
                  className="w-auto h-20 object-contain" // Tailwind 'h-20' class applied here
                /> 
              </div>
              <p className="text-[#FAF3DD]/70 leading-relaxed text-sm max-w-sm">
                Curating sustainable, eco-friendly products that are kind to you and gentle on the planet. Small changes, massive impact.
              </p>
            </div>

            {/* Detailed Contact Info */}
            <div className="flex flex-col gap-4 text-sm text-[#FAF3DD]/70">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-[#A3B18A] shrink-0 mt-0.5" />
                <span className="group-hover:text-[#FAF3DD] transition-colors">123 Eco Way, Melbourne<br/>VIC 3000, Australia</span>
              </div>
              <a href="mailto:hello@myhappyearth.com.au" className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-[#A3B18A] shrink-0" />
                <span className="group-hover:text-[#FAF3DD] transition-colors">hello@myhappyearth.com.au</span>
              </a>
              <a href="tel:1800123456" className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-[#A3B18A] shrink-0" />
                <span className="group-hover:text-[#FAF3DD] transition-colors">1800 123 456</span>
              </a>
            </div>

            <SocialMedia />
          </div>
          
          {/* Link Columns (Span 2 columns each) */}
          <div className="lg:col-span-2 lg:ml-8">
            <FooterLinkColumn title="Shop" links={shopLinks} isShopCategory={true} />
          </div>
          
          <div className="lg:col-span-2">
            <FooterLinkColumn title="About Us" links={companyLinks} />
            <div className="mt-8">
              <FooterLinkColumn title="Support" links={supportLinks} />
            </div>
          </div>

          {/* Newsletter Column (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:pl-8">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#FAF3DD]">
              Stay Connected
            </h4>
            <p className="text-[#FAF3DD]/70 text-sm leading-relaxed">
              Join 50,000+ eco-warriors. Get exclusive offers, new arrivals, and zero-waste tips delivered to your inbox.
            </p>
            
            <form className="relative flex flex-col gap-3 group" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  required
                  suppressHydrationWarning={true}
                  className="w-full bg-[#FAF3DD]/5 border border-[#FAF3DD]/10 px-5 py-3.5 pr-14 rounded-2xl text-sm text-[#FAF3DD] placeholder:text-[#FAF3DD]/40 focus:border-[#A3B18A] focus:bg-[#FAF3DD]/10 outline-none transition-all duration-300"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 aspect-square bg-[#A3B18A] text-[#344E41] rounded-xl flex items-center justify-center hover:bg-[#FAF3DD] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4 font-bold" />
                </button>
              </div>
              <p className="text-[11px] text-[#FAF3DD]/50 px-1">
                By subscribing, you agree to our <Link href="/legal" className="underline hover:text-[#FAF3DD] transition-colors">Privacy Policy</Link>.
              </p>
            </form>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#FAF3DD]/10 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#FAF3DD]/60">
          
          {/* Copyright & Legal */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p>© {new Date().getFullYear()} My Happy Earth. All rights reserved.</p>
            <div className="hidden md:block w-1 h-1 rounded-full bg-[#FAF3DD]/20"></div>
            <div className="flex items-center gap-4">
              <Link href="/legal" className="hover:text-[#FAF3DD] transition-colors">Privacy Policy</Link>
              <Link href="/legal" className="hover:text-[#FAF3DD] transition-colors">Terms of Service</Link>
            </div>
          </div>
          
        </div>

      </div>
    </footer>
  );
}