export const contactHeadlines = {
  headline: "We’d Love to Hear From You", // <-- Fixed typo Form -> From
  subheadline: "Whether you're a customer, a business or just earth-lover,— our friendly team is here.",
};

export const mainContactNodes = [
  {
    icon: (
      // SVG for Envelope
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-1.5.659m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-1.5.659m16.5 12h-13.5a1.5 1.5 0 01-1.5-1.5V9" />
      </svg>
    ),
    text: "hello@myhappyearth.com.au", // <-- Fixed typo happee -> happy
    isLink: true,
    href: "mailto:hello@myhappyearth.com.au",
  },
  {
    icon: (
      // SVG for Location Pin
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    // Added '\n' to data for consistent rendering inside the modular component
    text: "Thornleigh, Sydney\nNSW 2120 ", 
  },
  {
    icon: (
      // SVG for Phone
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-1.34 1.785a16.562 16.562 0 01-7.045-7.045l1.785-1.34c.362-.272.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    text: "+61 46 974 6076\n+61 48 135 7909",
    isLink: true,
    href: "tel:130032784",
  },
];

export const heroAddressList = [
  "Sydney: Thornleigh NSW 2120",
  "Brisbane: Holmview QLD 4207", // <-- Fixed typo Sret -> Street
];

export const heroBusinessHours = "Business Hours: Mon - Fri: 9am - 5pm AEST";