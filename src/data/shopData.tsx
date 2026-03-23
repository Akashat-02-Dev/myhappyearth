// src/data/shopData.tsx

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  rating: number;
  imageUrl: string;
  badge: string;
  category: string;
  material: string;
  stock: number;
}

// Default Data Arrays
export const initialProducts: Product[] = [
  { id: 1, name: "Bamboo Toothbrush", description: "Sustainable oral care", price: "AUD 6.95", rating: 5, imageUrl: "/images/products/toothbrush.jpg", badge: "Bamboo", category: "Personal Care", material: "Bamboo", stock: 150 },
  { id: 2, name: "Reusable Water Bottle", description: "Hydrate consciously", price: "AUD 34.50", rating: 5, imageUrl: "/images/products/bottle.jpg", badge: "Eco-Glass", category: "Outdoors", material: "Recycled", stock: 85 },
  { id: 3, name: "Beeswax Food Wraps", description: "Natural food storage", price: "22.90", rating: 4, imageUrl: "/images/products/wraps.jpg", badge: "Reusable", category: "Kitchen", material: "Organic Cotton", stock: 200 },
];

export const initialCategories = ['Home & Living', 'Kitchen', 'Personal Care', 'Health', 'Office', 'Outdoors', 'Kids'];
export const initialMaterials = ['Bamboo', 'Recycled', 'Organic Cotton', 'Natural'];

// Helper Functions for Local Storage Management
const getFromStorage = <T,>(key: string, initialData: T): T => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  }
  return initialData;
};

const saveToStorage = <T,>(key: string, data: T) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

// Expose Getters and Setters
export const getProducts = () => getFromStorage("shop_products", initialProducts);
export const saveProducts = (data: Product[]) => saveToStorage("shop_products", data);

export const getCategories = () => getFromStorage("shop_categories", initialCategories);
export const saveCategories = (data: string[]) => saveToStorage("shop_categories", data);

export const getMaterials = () => getFromStorage("shop_materials", initialMaterials);
export const saveMaterials = (data: string[]) => saveToStorage("shop_materials", data);