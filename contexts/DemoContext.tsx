"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { brand as defaultBrand, reviews as defaultReviews } from "../data/site";
import type { Brand, Review } from "../data/types";

// The Munyal backend API URL
const MUNYAL_API_BASE =
  process.env.NEXT_PUBLIC_MUNYAL_API_URL || "https://munyal-lead-bt67regc.manus.space";

export interface DemoReview {
  id: string;
  name: string;
  stars: number;
  text: string;
  breed?: string;
  service?: string;
  time?: string;
}

export interface DemoService {
  id: string;
  name: string;
  price?: string;
  description?: string;
}

export interface DemoContextValue {
  /** Whether we're in demo mode (slug page) */
  isDemo: boolean;
  /** Override brand data */
  brand: Brand;
  /** Override reviews */
  reviews: Review[];
  /** Override services (optional) */
  services?: DemoService[];
  /** Override photos (optional) */
  photos?: string[];
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: string | null;
}

const DemoContext = createContext<DemoContextValue>({
  isDemo: false,
  brand: defaultBrand,
  reviews: defaultReviews,
  isLoading: false,
  error: null,
});

export function useDemoContext() {
  return useContext(DemoContext);
}

interface DemoProviderProps {
  children: ReactNode;
  slug: string;
}

export function DemoProvider({ children, slug }: DemoProviderProps) {
  const [brand, setBrand] = useState<Brand>(defaultBrand);
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [services, setServices] = useState<DemoService[] | undefined>(undefined);
  const [photos, setPhotos] = useState<string[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDemoData() {
      try {
        const res = await fetch(`${MUNYAL_API_BASE}/api/demo/${slug}`);
        if (!res.ok) {
          setError("Demo not found");
          setIsLoading(false);
          return;
        }
        const json = await res.json();
        if (!json.success || !json.data) {
          setError("Invalid demo data");
          setIsLoading(false);
          return;
        }

        const d = json.data;

        // Build overridden brand object
        const suburb = extractSuburb(d.address) || defaultBrand.suburb;
        const overriddenBrand: Brand = {
          ...defaultBrand,
          name: d.businessName || defaultBrand.name,
          phone: d.phone || defaultBrand.phone,
          email: d.email || defaultBrand.email,
          address: d.address || defaultBrand.address,
          suburb,
          googleRating: d.googleRating ?? defaultBrand.googleRating,
          reviewCount: d.reviewCount ?? defaultBrand.reviewCount,
          hoursSummary: `${suburb} · Call ${d.phone || defaultBrand.phone}`,
          socials: {
            instagram: d.instagram || defaultBrand.socials.instagram,
            facebook: d.facebook || defaultBrand.socials.facebook,
            tiktok: d.tiktok || defaultBrand.socials.tiktok,
          },
          hours: formatHours(d.openingHours) || defaultBrand.hours,
        };
        setBrand(overriddenBrand);

        // Override reviews if we have real ones
        if (d.reviews && Array.isArray(d.reviews) && d.reviews.length > 0) {
          const mappedReviews: Review[] = d.reviews.slice(0, 8).map(
            (r: { author_name?: string; rating?: number; text?: string; relative_time_description?: string }, i: number) => ({
              id: `review-${i}`,
              name: r.author_name || "Happy Customer",
              stars: r.rating || 5,
              text: r.text || "Great service!",
              breed: undefined,
              service: undefined,
            })
          );
          setReviews(mappedReviews);
        }

        // Override services if we have real ones
        if (d.services && Array.isArray(d.services) && d.services.length > 0) {
          setServices(d.services);
        }

        // Override photos if we have real ones
        if (d.photos && Array.isArray(d.photos) && d.photos.length > 0) {
          setPhotos(d.photos);
        }
      } catch (err) {
        console.error("[DemoProvider] Fetch error:", err);
        setError("Failed to load demo data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchDemoData();
  }, [slug]);

  return (
    <DemoContext.Provider
      value={{
        isDemo: true,
        brand,
        reviews,
        services,
        photos,
        isLoading,
        error,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

function extractSuburb(address: string): string {
  if (!address) return "";
  const match = address.match(/,\s*([A-Za-z\s]+?)(?:\s+(?:NSW|VIC|QLD|SA|WA|TAS|NT|ACT))/i);
  if (match) return match[1].trim();
  const parts = address.split(",");
  if (parts.length > 1) return parts[1].trim().split(" ")[0];
  return "";
}

function formatHours(openingHours: Record<string, string> | null | undefined): string[] | null {
  if (!openingHours) return null;
  if (Array.isArray(openingHours)) return openingHours;
  return Object.entries(openingHours).map(([day, hours]) => `${day}: ${hours}`);
}
