// src/data/blogData.ts
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  image?: string;
}

export interface BlogPost {
  id?: string; // Firebase Document ID
  slug: string;
  category: string;
  title: string;
  heroImage: string;
  authorName: string;
  authorImage: string;
  date: string;
  readTime: string;
  sections: BlogSection[];
}

const COLLECTION_NAME = "blogs";

// 1. Generate URL-friendly slug
export const generateSlug = (text: string) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '').substring(0, 50);
};

// 2. Fetch All Posts (For the main blog page)
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
  } catch (error) {
    console.error("Error fetching blogs from Firebase:", error);
    return []; // Return empty array on failure so UI doesn't crash
  }
}

// 3. Fetch Single Post (For the detail page)
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getBlogPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching single blog:", error);
    return null;
  }
}

// 4. Fetch Related Posts
export async function getRelatedPosts(currentSlug: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter(post => post.slug !== currentSlug).slice(0, 3);
}

// --- ADMIN CRUD OPERATIONS ---

export async function addBlogPost(post: Omit<BlogPost, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), post);
    return docRef.id;
  } catch (error) {
    console.error("Error adding blog post:", error);
    throw error;
  }
}

export async function updateBlogPost(id: string, updatedPost: Partial<BlogPost>) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, updatedPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }
}

export async function deleteBlogPost(id: string) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
}