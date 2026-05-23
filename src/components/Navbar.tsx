// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; 

export default function Navbar({
  invert = false,
  forceScrolledState = false,
  permanentInvert = false,
  isLockedDark = false, 
}: {
  invert?: boolean;
  forceScrolledState?: boolean;
  permanentInvert?: boolean;
  isLockedDark?: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const activeScrolled = isScrolled || forceScrolledState;

  const navBackground = isLockedDark
    ? "bg-earth-deep text-earth-light shadow-lg"
    : permanentInvert
      ? activeScrolled
        ? "bg-earth-light/95 backdrop-blur-md text-earth-deep shadow-sm"
        : "bg-transparent text-earth-deep shadow-none"
      : activeScrolled
        ? "bg-earth-deep/95 backdrop-blur-md text-earth-light shadow-lg"
        : invert
          ? "bg-transparent text-earth-deep shadow-none"
          : "bg-transparent text-earth-light shadow-none";

  const isDarkText = !isLockedDark && (permanentInvert || (invert && !activeScrolled));

  const toggleIconColor = isMobileMenuOpen 
    ? "text-earth-deep" 
    : isDarkText 
      ? "text-earth-deep" 
      : "text-earth-light";

  return (
    <>
      <nav
        className={`flex justify-between items-center py-5 md:py-6 px-6 md:px-12 fixed w-full top-0 z-50 transition-all duration-500 ${
          isMobileMenuOpen ? "bg-transparent shadow-none" : navBackground
        }`}
      >
        {/* --- BRANDING / LOGO SECTION --- */}
        <Link
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`flex items-center gap-2 md:gap-3 cursor-pointer transition-colors duration-500 w-auto flex-shrink-0 relative z-50 ${
            isMobileMenuOpen ? "text-earth-deep" : isDarkText ? "text-earth-deep" : "text-earth-light"
          }`}
        >
          {/* Icon Logo */}
          <Image
            src="/logo.png"
            alt="My Happy Earth Logo"
            width={96}
            height={96}
            quality={100}
            priority
            className={`w-auto h-8 md:h-10 lg:h-12 object-contain transition-all duration-300 ${isMobileMenuOpen ? 'brightness-0' : ''}`}
          />
          
          {/* Text/Tag Logo */}
          <Image
            src="/tag.png"
            alt="My Happy Earth Brand Text"
            width={300} // Set a safe base width for Next.js to optimize
            height={96}
            quality={100}
            priority
            className={`w-auto h-6 md:h-8 lg:h-10 object-contain transition-all duration-300 ${isMobileMenuOpen ? 'brightness-0' : ''}`}
          />
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden lg:flex gap-8 font-medium items-center">
          {pathname !== "/" && (
            <Link href="/" className="hover:text-earth-sage transition-colors duration-300">
              Home
            </Link>
          )}
          {pathname !== "/our-impact" && (
            <Link href="/our-impact" className="hover:text-earth-sage transition-colors duration-300">
              Our Impact
            </Link>
          )}

          <Link href="/products" className="hover:text-earth-sage transition-colors duration-300">
            Products
          </Link>
          <Link href="/impact" className="hover:text-earth-sage transition-colors duration-300">
            Blog
          </Link>

          {/* Contact Us - Dropdown Container */}
          <div className="relative group">
            <Link href="/contact?view=form" className="hover:text-earth-sage transition-colors duration-300 py-4">
              Contact Us
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div
                className={`rounded-2xl shadow-xl py-2 flex flex-col overflow-hidden transition-colors duration-500 border ${
                  isLockedDark || activeScrolled
                    ? "bg-earth-deep border-earth-light/10"
                    : invert
                      ? "bg-white/80 backdrop-blur-md border-earth-forest/10"
                      : "bg-white/10 backdrop-blur-md border-white/20"
                }`}
              >
                <Link
                  href="/contact?view=faq"
                  className={`px-5 py-3 text-sm font-semibold text-center transition-colors duration-300 ${
                    isLockedDark || activeScrolled
                      ? "text-earth-light hover:bg-earth-forest"
                      : invert
                        ? "text-earth-deep hover:bg-earth-light"
                        : "text-earth-light hover:bg-white/20"
                  }`}
                >
                  FAQs
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/enquiry">
            <button
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-500 shadow-md hover:scale-105 ${
                isLockedDark || activeScrolled
                  ? "bg-earth-light text-earth-deep hover:bg-white"
                  : invert
                    ? "bg-earth-deep text-earth-light hover:bg-earth-forest"
                    : "bg-earth-light text-earth-deep hover:bg-white"
              }`}
            >
              Enquiry
            </button>
          </Link>
        </div>

        {/* --- MOBILE NAVIGATION TOGGLE --- */}
        <div className="lg:hidden flex items-center relative z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`focus:outline-none p-2 transition-colors duration-300 ${toggleIconColor}`}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Invisible Spacer to center navigation perfectly on Desktop */}
        <div className="hidden lg:block w-28"></div>
      </nav>

      {/* --- FULL SCREEN MOBILE MENU OVERLAY --- */}
      <div
        className={`fixed inset-0 z-40 bg-earth-light/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-8 w-full px-6">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif font-bold text-earth-deep hover:text-earth-sage transition-colors">
            Home
          </Link>
          <Link href="/our-impact" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif font-bold text-earth-deep hover:text-earth-sage transition-colors">
            Our Impact
          </Link>
          <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif font-bold text-earth-deep hover:text-earth-sage transition-colors">
            Products
          </Link>
          <Link href="/impact" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif font-bold text-earth-deep hover:text-earth-sage transition-colors">
            Blog
          </Link>
          <Link href="/contact?view=form" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif font-bold text-earth-deep hover:text-earth-sage transition-colors">
            Contact Us
          </Link>
          <Link href="/contact?view=faq" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif font-bold text-earth-deep hover:text-earth-sage transition-colors">
            FAQs
          </Link>
          
          <Link href="/enquiry" onClick={() => setIsMobileMenuOpen(false)} className="mt-4 w-full max-w-[250px]">
            <button className="w-full bg-earth-deep text-earth-light px-8 py-4 rounded-full font-bold text-lg hover:bg-earth-forest transition-colors shadow-lg">
              Send Enquiry
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}