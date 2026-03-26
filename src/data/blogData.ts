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

// 1. Fallback Mock Data (Protects your UI if the API goes down or tokens expire)
const fallbackPosts: BlogPost[] = [
  {
    slug: "fallback-article",
    category: "News",
    title: "Stay Tuned: Connecting to LinkedIn",
    heroImage: "/images/blog/beach-sunset.jpg", // Ensure this fallback image exists in public/images/blog/
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

// 2. Helper to generate a URL-friendly slug from the LinkedIn post text
const generateSlug = (text: string) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '').substring(0, 50);
};

// 3. --- THE MAIN FETCH FUNCTION ---
export async function getLinkedInPosts(): Promise<BlogPost[]> {
  // Map your environment variables
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const authorUrn = process.env.LINKEDIN_AUTHOR_URN; // Format: urn:li:organization:123456789

  // Defensive check: Ensure the critical fetching keys exist
  if (!accessToken || !authorUrn) {
    console.warn("⚠️ LinkedIn ACCESS_TOKEN or AUTHOR_URN is missing in .env.local. Serving fallback data.");
    return fallbackPosts;
  }

  try {
    // LinkedIn UGC Posts API Endpoint
    // Note: If your LinkedIn app uses the newer 'Posts' API, the endpoint would be https://api.linkedin.com/rest/posts
    const endpoint = `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=${authorUrn}&sortBy=CREATED`;

    const res = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0',
        // 'LinkedIn-Version': '202401' // Uncomment if using the newer /rest/ endpoints
      },
      next: { revalidate: 3600 } // Cache results for 1 hour to prevent hitting LinkedIn API rate limits
    });

    if (!res.ok) {
      console.error(`❌ LinkedIn API Error: ${res.status} ${res.statusText}. Your token might be expired.`);
      return fallbackPosts;
    }

    const data = await res.json();
    const elements = data.elements || [];

    if (elements.length === 0) {
      console.warn("⚠️ LinkedIn API returned successfully, but found 0 posts for this URN.");
      return fallbackPosts;
    }

    // Map the messy LinkedIn JSON into our clean BlogPost interface
    return elements.map((post: any): BlogPost => {
      const shareContent = post.specificContent?.['com.linkedin.ugc.ShareContent'];
      const textContent = shareContent?.shareCommentary?.text || "New update from our team.";
      
      // Extract title (first line) and body from the LinkedIn text
      const title = textContent.split('\n')[0].substring(0, 60).trim() + "..."; 
      const paragraphs = textContent.split('\n').filter((p: string) => p.trim() !== '');

      // Extract image if the post has media attached
      const mediaUrl = shareContent?.media?.[0]?.originalUrl || "/images/blog/beach-sunset.jpg";

      // Convert LinkedIn Epoch timestamp to readable date
      const dateObj = new Date(post.created.time);
      const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

      return {
        slug: generateSlug(title) || `post-${post.created.time}`,
        category: "Updates", // LinkedIn doesn't have native categories
        title: title,
        heroImage: mediaUrl,
        authorName: "My Happy Earth", 
        authorImage: "/images/authors/sarah.jpg", 
        date: formattedDate,
        readTime: `${Math.max(1, Math.ceil(textContent.length / 1000))} min read`, // Rough estimation based on text length
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