// src/data/settingsData.ts
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Ensure this points to your initialized Firebase

export interface ShopSettings {
  categories: string[];
  materials: string[];
}

const SETTINGS_DOC_ID = "shop_settings";

// Consolidated categories for Admin Panel dropdown
export const DEFAULT_SETTINGS: ShopSettings = {
  categories: [
    // B2C
    "Carry Green", "The Table Edit", "Mindful Mealtime", "Daily Rituals", "Sip Sustainably", "Kind Kitchen", "Bare Essentials",
    // B2B
    "The Welcome Suite", "The Healing Kit", "The Comfort Collection", "The Dining Range", "The Gather Pack", "The Stay Essentials", "Build Your Bundle"
  ],
  materials: [
    "Bamboo", "Jute", "Juco", "Hemp", "Cotton", "Areca Leaf", "Bagasse", "Wood", "Glass", "Stainless Steel", "Beeswax", "Paper", "Recycled Plastic", "Coconut Shell"
  ]
};

export async function getShopSettings(): Promise<ShopSettings> {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as ShopSettings;
    } else {
      await setDoc(docRef, DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    }
  } catch (error) {
    console.error("Error fetching shop settings:", error);
    return DEFAULT_SETTINGS; 
  }
}

export async function saveShopSettings(settings: ShopSettings): Promise<void> {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    await setDoc(docRef, settings);
  } catch (error) {
    console.error("Error saving shop settings:", error);
    throw error;
  }
}