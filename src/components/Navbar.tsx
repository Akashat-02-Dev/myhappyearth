"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar({
  invert = false,
  forceScrolledState = false,
}: {
  invert?: boolean;
  forceScrolledState?: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
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

  return (
    <nav
      className={`flex justify-between items-center py-6 px-6 md:px-12 fixed w-full top-0 z-50 transition-all duration-500 ${
        activeScrolled
          ? "bg-earth-deep/95 backdrop-blur-md text-earth-light shadow-lg"
          : invert
            ? "bg-transparent text-earth-deep shadow-none"
            : "bg-transparent text-earth-light shadow-none"
      }`}
    >
      {/* Logo Section */}
      <Link
        href="/"
        className={`flex items-center gap-2 font-bold text-xl cursor-pointer transition-colors duration-500 ${
          invert && !activeScrolled ? "text-earth-deep" : ""
        }`}
      >
        <Image
          src="/logo.png"
          alt="Happy Earth Logo"
          width={32}
          height={32}
          className="w-10 h-10"
        />
      </Link>

      {/* Navigation Links */}
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
          {/* THE FIX: Updated to point to the form view */}
          <Link
            href="/contact?view=form"
            className="hover:text-earth-sage transition-colors duration-300 py-4"
          >
            Contact Us
          </Link>

          <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div
              className={`rounded-2xl shadow-xl py-2 flex flex-col overflow-hidden transition-colors duration-500 border ${
                activeScrolled
                  ? "bg-earth-deep border-earth-light/10"
                  : invert
                    ? "bg-white/80 backdrop-blur-md border-earth-forest/10"
                    : "bg-white/10 backdrop-blur-md border-white/20"
              }`}
            >
              {/* THE FIX: Updated to point to the faq view */}
              <Link
                href="/contact?view=faq"
                className={`px-5 py-3 text-sm font-semibold text-center transition-colors duration-300 ${
                  activeScrolled
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
      </div>

      {/* CTA Button */}
      <Link
        href="/enquiry">
          <button
        className={`px-6 py-2 rounded-full font-semibold transition-all duration-500 shadow-md hover:scale-105 ${
          activeScrolled
            ? "bg-earth-light text-earth-deep hover:bg-white"
            : invert
              ? "bg-earth-deep text-earth-light hover:bg-earth-forest"
              : "bg-earth-light text-earth-deep hover:bg-white"
        }`}
      >
        Enquiry
      </button>
        </Link>
    </nav>
  );
}
