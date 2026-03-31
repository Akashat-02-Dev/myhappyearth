"use client";

import Link from 'next/link';

// Helper function to handle routing logic dynamically while preserving the custom Contact page views
const getHrefForLink = (linkName: string) => {
  switch (linkName) {
    case 'Contact Us':
    case 'Enquiry':
      return '/contact?view=form';
    case 'FAQs':
      return '/contact?view=faq';
    case 'Blog':
      return '/impact';
    default:
      // Standard dynamic routing for shop and other pages
      return `/${linkName.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-')}`;
  }
};

// Sub-component for a list of links
function FooterLinkColumn({ title, links }: { title: string, links: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-xl font-bold uppercase tracking-wider text-earth-light/90 mb-2">
        {title}
      </h4>
      {links.map((link, index) => (
        <Link 
          key={index} 
          href={getHrefForLink(link)} 
          className="text-white hover:text-earth-sage hover:translate-x-1 transition-all duration-300 w-fit"
        >
          {link}
        </Link>
      ))}
    </div>
  );
}

// Payment method icons component
function PaymentMethods() {
  const iconClasses = "w-10 h-6 text-white";

  return (
    <div className="flex items-center gap-4">
      <svg className={iconClasses} viewBox="0 0 32 32">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm10 10c0 .356-.013.708-.038 1.057l-1.921-.96a1 1 0 0 1-.41-.715L19 11h-1l-.37-.828a1 1 0 0 1-.035-.788L18 8.167A9.957 9.957 0 0 0 12 6c-.463 0-.918.032-1.365.093l.365.73A1 1 0 0 1 11 8l-1.2 1.2a1 1 0 0 1-.723.277L8.03 9.47A9.972 9.972 0 0 0 4 12c0 2.21 1.79 4 4 4s4-1.79 4-4H8v-1.6l1.2-.6a1 1 0 0 1 .8-.2l2 .5a1 1 0 0 1 .715.715l.2 1.2a1 1 0 0 1-.2 1.2l-.6.6a1 1 0 0 1-.8.2h-1l-.5-2h-1v2h1v1.6l-.6.6a1 1 0 0 1-.8.2h-1l-.5-2h-1v2h1c.075 0 .151-.005.226-.015a9.975 9.975 0 0 0 5.174 4.015L11 21h-1l-1.2 2.4A9.956 9.956 0 0 0 12 24c.792 0 1.566-.093 2.316-.27l-.316-1.58A1 1 0 0 1 14 21h1v-.8a1 1 0 0 1 1-1h1v-.8a1 1 0 0 1 1-1h1v-.8a1 1 0 0 1 1-1zm3.89 3.82L23 21h-1a1 1 0 0 1-1-1h-1a1 1 0 0 1-1-1h-1v-1l1-.5a1 1 0 0 1 .8-.2h1a1 1 0 0 1 1 1v1h1a1 1 0 0 1 1 1h1a1 1 0 0 1 1 1z" fill="currentColor"/>
      </svg>
    </div>
  );
}

// Social media icons component
function SocialMedia() {
  const iconClasses = "w-6 h-6 text-white hover:text-earth-sage hover:-translate-y-1 transition-all duration-300";

  return (
    <div className="flex items-center gap-5 my-6">
      <Link href="#"><svg className={iconClasses} viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/></svg></Link>
      <Link href="#"><svg className={iconClasses} viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z" fill="currentColor"/></svg></Link>
      <Link href="#"><svg className={iconClasses} viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" fill="currentColor"/></svg></Link>
      <Link href="#"><svg className={iconClasses} viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" fill="currentColor"/></svg></Link>
    </div>
  );
}

export default function Footer() {
  const shopLinks = ["All Products", "Home & Living", "Fashion & Accessories", "Beauty & Wellness", "Kids & Baby", "Gifts & Bundles", "Sale"];
  const companyLinks = ["Our Impact", "Products", "Blog", "Contact Us", "Enquiry"];
  const supportLinks = ["FAQs", "Privacy Policy", "Terms & Conditions"];

  return (
    <footer className="w-full !bg-earth-deep !text-white pt-16 pb-12 px-12 md:px-24 relative z-50 border-t-4 border-earth-forest">
      <div className="max-w-[100rem] mx-auto">
        
        {/* Top Section: Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-5 border-b border-white/10 pb-10">
          
          {/* Column 1: Logo & Socials */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 text-white font-bold text-2xl group cursor-pointer">
              <span className="text-earth-sage group-hover:rotate-12 transition-transform duration-300">🌿</span> 
              <span className="group-hover:text-earth-light transition-colors duration-300">My Happy Earth</span>
            </div>
            <p className="text-lg leading-relaxed text-white/90">
              Australia's Home of Sustainable Living
            </p>
            <SocialMedia />
          </div>
          
          {/* Column 2: Shop Links */}
          <div className="hidden lg:block">
            <FooterLinkColumn title="Shop" links={shopLinks} />
          </div>
          
          {/* Column 3: Company Links */}
          <div className="hidden lg:block">
            <FooterLinkColumn title="Company" links={companyLinks} />
          </div>

          {/* Column 4: Support Links */}
          <div className="hidden lg:block">
            <FooterLinkColumn title="Support" links={supportLinks} />
          </div>

          {/* Column 5: Subscription */}
          <div className="flex flex-col items-start gap-4 group lg:col-span-2 xl:col-span-1">
            <h4 className="text-xl font-bold uppercase tracking-wider text-earth-light/90 mb-2 transition-colors duration-300">
              Join Our Community
            </h4>
            <p className="text-lg text-white/90 leading-relaxed mb-4">
              Receive exclusive offers and sustainable living tips
            </p>
            <div className="flex w-full gap-3">
              
              <input 
                type="email" 
                placeholder="Enter your email" 
                suppressHydrationWarning={true}
                className="flex-grow bg-white px-5 py-3 rounded-full text-earth-deep placeholder:text-earth-forest/60 focus:ring-2 focus:ring-earth-sage outline-none transition-shadow duration-300"
              />

              <button className="bg-earth-light text-earth-deep px-6 py-3 rounded-full font-semibold hover:bg-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 active:translate-y-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Support Links & Logos */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 pt-4">
          
          {/* Bottom Left: Support Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {supportLinks.map((link, index) => (
              <Link 
                key={index} 
                href={getHrefForLink(link)} 
                className="relative text-white/80 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-earth-sage hover:after:w-full after:transition-all after:duration-300"
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Bottom Middle: Logos */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 text-center text-xs text-white/70">
              <span>
                Proudly Australia Owned
              </span>
            </div>
            {/* <PaymentMethods /> */}
          </div>

          {/* Bottom Right: Copyright */}
          <div className="flex flex-col items-start md:items-end text-sm text-white/80 gap-1">
            <p>© 2026 My Happy Earth. All sustainable rights reserved.</p>
            <p>Australia's leading zero waste online shop</p>
          </div>
        </div>

      </div>
    </footer>
  );
}