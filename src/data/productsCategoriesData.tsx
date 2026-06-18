// src/data/productsCategoriesData.tsx

export interface ProductCategory {
  id: string;
  title: string;
  subtitle?: string; // Used for Personal
  industry?: string; // Used for Commercial
  description?: string;
  contents?: string; // Shows what's inside the bundle
  image: string;
  href: string;
}

// --- PATH 1: EVERYDAY EARTH (PERSONAL) ---
export const personalCategories: ProductCategory[] = [
  {
    id: "carry-green",
    title: "Carry Green",
    subtitle: "Sustainable Bags",
    description: "Bags that go everywhere you do — without costing the earth.",
    // Elegant tote bag in a natural setting
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop", 
    href: "/products/shop?category=Carry+Green&path=personal"
  },
  {
    id: "the-table-edit",
    title: "The Table Edit",
    subtitle: "Tableware",
    description: "Beautiful, earth-born dining ware that turns every meal into a statement.",
    // Beautiful ceramic/earthy table setting
    image: "https://images.unsplash.com/photo-1610935591854-478eb079c6d3?q=80&w=800&auto=format&fit=crop",
    href: "/products/shop?category=The+Table+Edit&path=personal"
  },
  {
    id: "mindful-mealtime",
    title: "Mindful Mealtime",
    subtitle: "Cutlery & Utensils",
    description: "Eat well, waste nothing — cutlery made for life on the go.",
    // Wooden/bamboo cutlery aesthetic
    image: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?q=80&w=800&auto=format&fit=crop",
    href: "/products/shop?category=Mindful+Mealtime&path=personal"
  },
  {
    id: "daily-rituals",
    title: "Daily Rituals",
    subtitle: "Personal Care",
    description: "The small morning swaps that add up to a big difference.",
    // Bamboo toothbrush and natural soap setup
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop",
    href: "/products/shop?category=Daily+Rituals&path=personal"
  },
  {
    id: "sip-sustainably",
    title: "Sip Sustainably",
    subtitle: "Drinkware & Bottles",
    description: "Hydration without the plastic guilt.",
    // Sleek reusable water bottle 
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop",
    href: "/products/shop?category=Sip+Sustainably&path=personal"
  },
  {
    id: "kind-kitchen",
    title: "Kind Kitchen",
    subtitle: "Kitchen & Home",
    description: "A greener heart of the home, one swap at a time.",
    // Natural kitchen aesthetic (brushes, jars)
    image: "https://images.unsplash.com/photo-1556910110-a5a63dfd393c?q=80&w=800&auto=format&fit=crop",
    href: "/products/shop?category=Kind+Kitchen&path=personal"
  },
  {
    id: "bare-essentials",
    title: "Bare Essentials",
    subtitle: "Biodegradable Everyday",
    description: "Everyday disposables that disappear — guilt-free.",
    // Eco-friendly paper packaging
    image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=800&auto=format&fit=crop",
    href: "/products/shop?category=Bare+Essentials&path=personal"
  }
];

// --- PATH 2: EARTH AT SCALE (COMMERCIAL) ---
export const commercialCategories: ProductCategory[] = [
  {
    id: "the-welcome-suite",
    title: "The Welcome Suite",
    industry: "Hotels & Hospitality",
    description: "Greet every guest with care they'll remember — and a planet they'll thank you for.",
    contents: "Wooden combs, bamboo toothbrush + paste, glass bottles, soap, slippers",
    // Premium hotel bedroom/bathroom
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    href: "/products/shop?category=The+Welcome+Suite&path=commercial"
  },
  {
    id: "the-healing-kit",
    title: "The Healing Kit",
    industry: "Hospitals & Medical",
    description: "Gentle on patients, gentle on the planet — dignity in every detail.",
    contents: "Wooden combs, soft bamboo toothbrushes, glass bottles, biodegradable cups, hygiene items",
    // Clean, reassuring natural aesthetic
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=800&auto=format&fit=crop",
    href: "/products/shop?category=The+Healing+Kit&path=commercial"
  },
  {
    id: "the-comfort-collection",
    title: "The Comfort Collection",
    industry: "Aged Care",
    description: "Easy-to-use, dignified essentials designed for everyday comfort.",
    contents: "Easy-grip combs, soft bamboo toothbrushes, glass bottles, gentle personal care items",
    // Warm, comforting natural elements
    image: "https://images.unsplash.com/photo-1516084347712-404fb855146c?q=80&w=800&auto=format&fit=crop",
    href: "/products/shop?category=The+Comfort+Collection&path=commercial"
  },
  {
    id: "the-dining-range",
    title: "The Dining Range",
    industry: "Restaurants & Cafés",
    description: "Serve sustainability — from first plate to final straw.",
    contents: "Wooden cutlery, areca/bagasse dining ware, bamboo trays, paper straws, compostable takeaway",
    // Bustling eco-friendly cafe/restaurant 
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    href: "/products/shop?category=The+Dining+Range&path=commercial"
  },
  {
    id: "the-gather-pack",
    title: "The Gather Pack",
    industry: "Offices & Events",
    description: "Sustainability that scales with your guest list.",
    contents: "Reusable cutlery sets, bamboo cups, compostable plates, jute giveaway bags",
    // Professional event / conference setting
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    href: "/products/shop?category=The+Gather+Pack&path=commercial"
  },
  {
    id: "the-stay-essentials",
    title: "The Stay Essentials",
    industry: "Airbnb / Short-Stay Hosts",
    description: "Five-star eco touches that earn five-star reviews.",
    contents: "Mini amenity kits, glass bottles, soap, reusable cutlery, welcome bag",
    // Beautiful, inviting Airbnb style bathroom/bedroom
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
    href: "/products/shop?category=The+Stay+Essentials&path=commercial"
  },
  {
    id: "build-your-bundle",
    title: "Build Your Bundle",
    industry: "Custom / Any Industry",
    description: "Mix, match, and brand your own sustainable kit — your business, your way.",
    contents: "Customisable selection + optional branded packaging",
    // Clean eco packaging / unboxing look
    image: "https://images.unsplash.com/photo-1563985357989-130ab78f5664?q=80&w=800&auto=format&fit=crop",
    href: "/enquiry?type=wholesale" 
  }
];