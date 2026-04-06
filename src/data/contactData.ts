// src/data/contactData.ts
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface ContactInquiry {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactInquiry(data: ContactInquiry) {
  try {
    // This creates a new collection called "contact_inquiries" in your Firebase database
    const docRef = await addDoc(collection(db, "contact_inquiries"), {
      ...data,
      status: 'unread', // Useful for an admin panel later!
      createdAt: serverTimestamp() // Adds the exact server time
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting inquiry to Firebase:", error);
    throw error;
  }
}