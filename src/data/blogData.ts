// src/data/blogData.ts

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  image?: string;
}

export interface BlogPost {
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

// 1. Fallback Mock Data
const fallbackPosts: BlogPost[] = [
  {
    slug: "fallback-article",
    category: "News",
    title: "Stay Tuned: Connecting to LinkedIn",
    heroImage: "/images/blog/beach-sunset.jpg", 
    authorName: "My Happy Earth",
    authorImage: "/images/authors/sarah.jpg",
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    readTime: "1 min read",
    sections: [
      {
        heading: "We are syncing our feed!",
        paragraphs: ["Please check back shortly while we connect our live LinkedIn feed to this page."]
      }
    ]
  }
];

const generateSlug = (text: string) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '').substring(0, 50);
};

// 3. --- THE MAIN FETCH FUNCTION ---
export async function getLinkedInPosts(): Promise<BlogPost[]> {
  const rawClientId = process.env.LINKEDIN_CLIENT_ID;
  const rawClientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const rawAccessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const rawAuthorUrn = process.env.LINKEDIN_AUTHOR_URN; 

  if (!rawAccessToken || !rawAuthorUrn) {
    console.warn("⚠️ LinkedIn ACCESS_TOKEN or AUTHOR_URN is missing in .env.local. Serving fallback data.");
    return fallbackPosts;
  }

  // Clean variables to prevent header fetch errors
  const cleanAccessToken = rawAccessToken.replace(/['"]/g, '').trim();
  const cleanAuthorUrn = rawAuthorUrn.replace(/['"]/g, '').trim();
  const encodedUrn = encodeURIComponent(cleanAuthorUrn);

  try {
    const endpoint = `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=${encodedUrn}&sortBy=CREATED`;

    const res = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${cleanAccessToken}`,
        'X-Restli-Protocol-Version': '2.0.0',
      },
      // THE FIX: Bypassing the cache temporarily so you can see fresh posts immediately
      cache: 'no-store' 
    });

    if (!res.ok) {
      console.error(`❌ LinkedIn API Error: ${res.status} ${res.statusText}. Your token might be expired.`);
      return fallbackPosts;
    }

    const data = await res.json();
    const elements = data.elements || [];

    // --- DEBUG LOGGING ---
    // Check your VS Code Terminal to see this output!
    console.log(`\n=== LINKEDIN API SUCCESS: Found ${elements.length} posts ===`);
    if (elements.length > 0) {
       // Printing the first post's raw structure to the terminal to see exactly where the data is hiding
       console.log("Raw Post Data Snapshot:", JSON.stringify(elements[0].specificContent, null, 2));
    }
    console.log("========================================================\n");
    // ---------------------

    if (elements.length === 0) {
      console.warn("⚠️ LinkedIn API returned successfully, but found 0 posts for this URN.");
      return fallbackPosts;
    }

    // Map the messy LinkedIn JSON into our clean BlogPost interface
    return elements.map((post: any): BlogPost => {
      const specificContent = post.specificContent || {};
      
      // LinkedIn stores different post types (standard, articles, videos) in different objects
      const shareContent = specificContent['com.linkedin.ugc.ShareContent'];
      const articleContent = specificContent['com.linkedin.ugc.ArticleContent'];

      // THE FIX: Robust Text Extraction
      // Try multiple paths to find the text depending on what type of post it is
      let textContent = shareContent?.shareCommentary?.text 
                     || articleContent?.description 
                     || shareContent?.media?.[0]?.description?.text
                     || "New update from our team.";
      
      const title = textContent.split('\n')[0].substring(0, 60).trim() + "..."; 
      const paragraphs = textContent.split('\n').filter((p: string) => p.trim() !== '');

      // THE FIX: Robust Image Extraction
      // Look for the original URL, but fallback to thumbnails if it is a carousel/video
      const mediaUrl = shareContent?.media?.[0]?.originalUrl 
                    || shareContent?.media?.[0]?.thumbnails?.[0]?.url
                    || "/images/blog/beach-sunset.jpg";

      const dateObj = new Date(post.created.time);
      const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

      return {
        slug: generateSlug(title) || `post-${post.created.time}`,
        category: "Updates", 
        title: title,
        heroImage: mediaUrl,
        authorName: "My Happy Earth", 
        authorImage: "/images/authors/sarah.jpg", 
        date: formattedDate,
        readTime: `${Math.max(1, Math.ceil(textContent.length / 1000))} min read`, 
        sections: [
          {
            heading: "Latest Update",
            paragraphs: paragraphs,
          }
        ]
      };
    });

  } catch (error) {
    console.error("❌ Failed to fetch LinkedIn posts:", error);
    return fallbackPosts;
  }
}

// 4. Data Helpers for the Detail Pages
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getLinkedInPosts();
  return posts.find(post => post.slug === slug);
}

export async function getRelatedPosts(currentSlug: string): Promise<BlogPost[]> {
  const posts = await getLinkedInPosts();
  return posts.filter(post => post.slug !== currentSlug).slice(0, 3);
}