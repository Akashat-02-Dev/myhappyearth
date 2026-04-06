// src/data/settingsData.ts
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const SETTINGS_DOC_ID = 'shop_attributes';
const SETTINGS_COLLECTION = 'settings';

export interface ShopSettings {
  categories: string[];
  materials: string[];
}

// Default fallback data if the database is empty
const defaultSettings: ShopSettings = {
  categories: ['Home & Living', 'Kitchen', 'Personal Care', 'Health', 'Office', 'Outdoors', 'Kids'],
  materials: ['Bamboo', 'Recycled', 'Organic Cotton', 'Natural']
};

export async function getShopSettings(): Promise<ShopSettings> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as ShopSettings;
    } else {
      // If no settings exist yet, create the document with the defaults
      await setDoc(docRef, defaultSettings);
      return defaultSettings;
    }
  } catch (error) {
    console.error("Error fetching settings:", error);
    return defaultSettings;
  }
}

export async function saveShopSettings(settings: ShopSettings): Promise<void> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    await setDoc(docRef, settings, { merge: true });
  } catch (error) {
    console.error("Error saving settings:", error);
    throw error;
  }
}