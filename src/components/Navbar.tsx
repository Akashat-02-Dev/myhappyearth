// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar({
  invert = false,
  forceScrolledState = false,
  permanentInvert = false,
  isLockedDark = false, // Locks to earth-deep background / earth-light text
}: {
  invert?: boolean;
  forceScrolledState?: boolean;
  permanentInvert?: boolean;
  isLockedDark?: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Preserved your exact original scroll logic
      const heroSectionHeight = window.innerHeight - 80;
      if (window.scrollY > heroSectionHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeScrolled = isScrolled || forceScrolledState;

  // LOGIC: If isLockedDark is true (FAQ view), bypass all scrolling/inversion logic
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

  // Text color logic mirroring the background logic
  const isDarkText = !isLockedDark && (permanentInvert || (invert && !activeScrolled));

  return (
    <nav
      className={`flex justify-between items-center py-6 px-6 md:px-12 fixed w-full top-0 z-50 transition-all duration-500 ${navBackground}`}
    >
      {/* Logo Section - Fixed width to balance the spacer on the right */}
      <Link
        href="/"
        className={`flex items-center gap-3 font-bold text-xl cursor-pointer transition-colors duration-500 w-28 flex-shrink-0 ${
          isDarkText ? "text-earth-deep" : "text-earth-light"
        }`}
      >
        <Image
          src="/logo.png"
          alt="My Happy Earth Logo"
          width={96} // Fetch a higher resolution source for crispness on high-DPI screens
          height={96}
          quality={100} // Prevent Next.js from heavily compressing the logo
          priority // Load immediately as it is a crucial LCP (Largest Contentful Paint) element
          className="w-60 h-12 object-contain" // Render beautifully at 48x48 pixels
        />
        
      </Link>

      {/* Navigation Links & CTA */}
      <div className="hidden md:flex gap-8 font-medium items-center">
        {/* DYNAMIC ROUTING LOGIC */}
        {pathname !== "/" && (
          <Link
            href="/"
            className="hover:text-earth-sage transition-colors duration-300"
          >
            Home
          </Link>
        )}

        {pathname !== "/our-impact" && (
          <Link
            href="/our-impact"
            className="hover:text-earth-sage transition-colors duration-300"
          >
            Our Impact
          </Link>
        )}

        <Link
          href="/products"
          className="hover:text-earth-sage transition-colors duration-300"
        >
          Products
        </Link>
        <Link
          href="/impact"
          className="hover:text-earth-sage transition-colors duration-300"
        >
          Blog
        </Link>

        {/* Contact Us - Dropdown Container */}
        <div className="relative group">
          <Link
            href="/contact?view=form"
            className="hover:text-earth-sage transition-colors duration-300 py-4"
          >
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
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-500 shadow-md hover:scale-105 ${
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

      {/* Invisible Spacer - Scaled up to w-28 to perfectly balance the slightly larger logo area */}
      <div className="hidden md:block w-28"></div>
    </nav>
  );
}