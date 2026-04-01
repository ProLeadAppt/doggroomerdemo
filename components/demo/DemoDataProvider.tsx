"use client";

import { useEffect, useState } from "react";

// The Munyal backend API URL - this will be the published domain
const MUNYAL_API_BASE = process.env.NEXT_PUBLIC_MUNYAL_API_URL || "https://munyal-lead-bt67regc.manus.space";

interface DemoData {
  businessName: string;
  businessCategory: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  googleRating: number;
  reviewCount: number;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  linkedin?: string;
  openingHours?: Record<string, string>;
  qualityScore: number;
}

/**
 * DemoDataProvider fetches lead data from the Munyal API
 * and replaces hardcoded placeholder content throughout the page.
 */
export function DemoDataProvider({ slug }: { slug: string }) {
  const [data, setData] = useState<DemoData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDemoData() {
      try {
        const res = await fetch(`${MUNYAL_API_BASE}/api/demo/${slug}`);
        if (!res.ok) {
          setError("Demo not found");
          return;
        }
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        } else {
          setError("Invalid demo data");
        }
      } catch (err) {
        console.error("[DemoDataProvider] Fetch error:", err);
        setError("Failed to load demo data");
      }
    }

    fetchDemoData();
  }, [slug]);

  useEffect(() => {
    if (!data) return;

    // Replace all instances of the placeholder business data with real lead data
    const replacements: [string | RegExp, string][] = [
      // Business name
      ["Pawsome & Co.", data.businessName],
      ["Pawsome &amp; Co.", data.businessName],
      ["Pawsome and Co.", data.businessName],
      ["Pawsome", data.businessName.split(" ")[0]],
      
      // Address
      ["12 Darling Street, Balmain NSW 2041", data.address],
      ["12 Darling St, Balmain NSW 2041", data.address],
      
      // Suburb
      ["Balmain", extractSuburb(data.address)],
      
      // Phone
      ["(02) 8912 3456", data.phone || "(02) 8912 3456"],
      ["+61289123456", data.phone?.replace(/\s/g, "").replace(/^\(0/, "+61").replace(/\)/, "") || "+61289123456"],
      
      // Email
      ["hello@pawsomeandco.com.au", data.email || `hello@${slugify(data.businessName)}.com.au`],
      
      // Rating
      [/4\.9/g, data.googleRating?.toFixed(1) || "4.9"],
      
      // Review count
      [/127\+?\s*reviews/gi, `${data.reviewCount}+ reviews`],
      [/127\+?\s*Reviews/gi, `${data.reviewCount}+ Reviews`],
      ["127+", `${data.reviewCount}+`],
      ["127 five-star reviews", `${data.reviewCount} five-star reviews`],
    ];

    // Wait for DOM to be fully rendered
    requestAnimationFrame(() => {
      setTimeout(() => {
        replaceTextInDOM(document.body, replacements);
        
        // Update page title
        document.title = `${data.businessName} | Premium Dog Grooming`;
        
        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute("content", 
            `${data.businessName} - Professional dog grooming services. ${data.googleRating} star rating with ${data.reviewCount}+ reviews. ${data.address}`
          );
        }

        // Update social links if available
        if (data.instagram) {
          document.querySelectorAll('a[href*="instagram.com/pawsomeandco"]').forEach(el => {
            (el as HTMLAnchorElement).href = data.instagram!;
          });
        }
        if (data.facebook) {
          document.querySelectorAll('a[href*="facebook.com/pawsomeandco"]').forEach(el => {
            (el as HTMLAnchorElement).href = data.facebook!;
          });
        }
      }, 100);
    });
  }, [data]);

  if (error) {
    return null; // Silently fail - show the default template
  }

  return null; // This component only performs side effects
}

/**
 * Walk the DOM tree and replace text content
 */
function replaceTextInDOM(
  node: Node,
  replacements: [string | RegExp, string][]
) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.textContent || "";
    let changed = false;
    
    for (const [find, replace] of replacements) {
      if (typeof find === "string") {
        if (text.includes(find)) {
          text = text.split(find).join(replace);
          changed = true;
        }
      } else {
        if (find.test(text)) {
          text = text.replace(find, replace);
          changed = true;
        }
      }
    }
    
    if (changed) {
      node.textContent = text;
    }
  } else {
    // Skip script and style elements
    if (
      node.nodeName === "SCRIPT" ||
      node.nodeName === "STYLE" ||
      node.nodeName === "NOSCRIPT"
    ) {
      return;
    }
    
    for (const child of Array.from(node.childNodes)) {
      replaceTextInDOM(child, replacements);
    }
  }
}

/**
 * Extract suburb from a full address string
 */
function extractSuburb(address: string): string {
  // Try to extract suburb from Australian address format
  // e.g. "5 Duke St, Kensington NSW 2033" → "Kensington"
  const match = address.match(/,\s*([A-Za-z\s]+?)(?:\s+(?:NSW|VIC|QLD|SA|WA|TAS|NT|ACT))/i);
  if (match) return match[1].trim();
  
  // Fallback: take the part after the first comma
  const parts = address.split(",");
  if (parts.length > 1) return parts[1].trim().split(" ")[0];
  
  return address;
}

/**
 * Convert a business name to a URL-safe slug
 */
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
