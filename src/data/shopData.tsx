// src/data/shopData.tsx
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase'; 

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  imageUrl: string; 
  imageUrls?: string[]; 
  badge: string;
  category: string;
  material: string; // Kept for legacy database compatibility
  materials?: string[]; // NEW: Array for multiple materials
  sizes?: string[]; // NEW: Array for available sizes
  stock?: number | ''; 
}

const COLLECTION_NAME = "products";

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

export async function uploadProductImage(productId: string, index: number, file: File): Promise<string> {
  const fileExtension = file.name.split('.').pop();
  const fileName = `products/${productId}/image_${index}_${Date.now()}.${fileExtension}`;
  const storageRef = ref(storage, fileName);
  
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}