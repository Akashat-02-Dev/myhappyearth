// src/data/shopData.tsx
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Product {
  id?: string; // Firebase IDs are strings
  name: string;
  description: string;
  price: string;
  rating: number;
  imageUrl: string;
  badge: string;
  category: string;
  material: string;
  stock?: number | ''; // Made optional
}

const COLLECTION_NAME = "products";

// Fetch all products from Firebase
export async function getProducts(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  } catch (error) {
    console.error("Error fetching products from Firebase:", error);
    return [];
  }
}

export async function addProduct(product: Omit<Product, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), product);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

export async function updateProduct(id: string, updatedProduct: Partial<Product>) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}