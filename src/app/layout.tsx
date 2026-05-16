import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// 1. Import Next.js Script component for performance optimization
import Script from "next/script"; 
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Upgraded Metadata for SEO and professional presentation
export const metadata: Metadata = {
  title: "My Happy Earth | Sustainable Living",
  description: "Australia's Home of Sustainable Living. Curating sustainable, eco-friendly products that are kind to you and gentle on the planet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Your Navbar would typically go here */}
        
        {children}
        
        {/* Your Footer would typically go here */}

        {/* 3. THE RENDER-BLOCKING FIX:
          When you are ready to add Google Analytics, Meta Pixel, or other third-party tools, 
          uncomment this Script tag. The `strategy="lazyOnload"` tells the browser to wait 
          until the page is fully painted before downloading the script, completely eliminating 
          the render-blocking penalty!
        */}
        {/* <Script 
          src="https://www.googletagmanager.com/gtag/js?id=YOUR_TRACKING_ID" 
          strategy="lazyOnload" 
        />
        */}
      </body>
    </html>
  );
}