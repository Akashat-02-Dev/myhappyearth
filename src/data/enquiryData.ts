// src/data/enquiryData.ts
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface EnquiryData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reference: string; // Used for Product Name or Order Number
  message: string;
}

export async function submitEnquiry(data: EnquiryData) {
  try {
    const docRef = await addDoc(collection(db, "enquiries"), {
      ...data,
      status: 'unread',
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    throw error;
  }
}