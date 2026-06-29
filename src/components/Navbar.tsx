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
    ? "bg-earth-deep/50 backdrop-blur-lg text-earth-light shadow-lg"
    : permanentInvert
      ? activeScrolled
        ? "bg-earth-light/50 backdrop-blur-lg text-earth-deep shadow-sm"
        : "bg-transparent text-earth-deep shadow-none"
      : activeScrolled
        ? "bg-earth-deep/50 backdrop-blur-lg text-earth-light shadow-lg"
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
          <Image
            src="/logo.png"
            alt="My Happy Earth Logo"
            width={96}
            height={96}
            quality={100}
            priority
            className={`w-auto h-8 md:h-10 lg:h-12 object-contain transition-all duration-300 ${isMobileMenuOpen ? 'brightness-100' : ''}`}
          />
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden lg:flex gap-8 font-medium items-center">
          <Link href="/our-impact" className="hover:text-earth-sage transition-colors duration-300">
            Our Mission
          </Link>
          
          {/* Take Action - Dropdown Container */}
          <div className="relative group">
            <span className="hover:text-earth-sage transition-colors duration-300 py-4 cursor-pointer">
              Take Action
            </span>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div
                className={`rounded-2xl shadow-xl py-2 flex flex-col overflow-hidden transition-colors duration-500 border ${
                  isLockedDark || activeScrolled
                    ? "bg-earth-deep/60 backdrop-blur-lg border-earth-light/10"
                    : invert
                      ? "bg-white/80 backdrop-blur-md border-earth-forest/10"
                      : "bg-white/10 backdrop-blur-md border-white/20"
                }`}
              >
                {[
                  { name: "Find Your Swap", href: "/products" },
                  // { name: "Take the Pledge", href: "/pledge" },
                  // { name: "Impact Report", href: "/impact-report" },
                  // { name: "Volunteer", href: "/volunteer" }
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className={`px-5 py-3 text-sm font-semibold text-center transition-colors duration-300 ${
                      isLockedDark || activeScrolled
                        ? "text-earth-light hover:bg-earth-forest/80"
                        : invert
                          ? "text-earth-deep hover:bg-earth-light"
                          : "text-earth-light hover:bg-white/20"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/impact" className="hover:text-earth-sage transition-colors duration-300">
            Impact Stories
          </Link>
          <Link href="/contact" className="hover:text-earth-sage transition-colors duration-300">
            Join the Movement
          </Link>
          {/* <Link href="/contact" className="hover:text-earth-sage transition-colors duration-300">
            Contact
          </Link> */}
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
      </nav>

      {/* --- FULL SCREEN MOBILE MENU OVERLAY --- */}
      <div
        className={`fixed inset-0 z-40 bg-earth-light/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 lg:hidden overflow-y-auto ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-6 w-full px-6 py-20">
          <Link href="/our-impact" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif font-bold text-earth-deep hover:text-earth-sage transition-colors">
            Our Mission
          </Link>
          
          <div className="flex flex-col items-center gap-4 my-4 w-full border-y border-earth-deep/10 py-6">
            <span className="text-xl font-bold text-earth-deep/60 uppercase tracking-widest">Take Action</span>
            <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif font-bold text-earth-deep hover:text-earth-sage transition-colors">Find Your Swap</Link>
            {/* <Link href="/pledge" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif font-bold text-earth-deep hover:text-earth-sage transition-colors">Take the Pledge</Link>
            <Link href="/impact-report" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif font-bold text-earth-deep hover:text-earth-sage transition-colors">Impact Report</Link>
            <Link href="/volunteer" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif font-bold text-earth-deep hover:text-earth-sage transition-colors">Volunteer</Link> */}
          </div>

          <Link href="/impact-stories" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif font-bold text-earth-deep hover:text-earth-sage transition-colors">
            Impact Stories
          </Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif font-bold text-earth-deep hover:text-earth-sage transition-colors">
            Join the Movement
          </Link>
        </div>
      </div>
    </>
  );
}