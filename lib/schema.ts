import { brand, services, faq } from "@/data/site";

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://pawsomeandco.com.au",
    name: brand.name,
    description:
      "Premium dog grooming studio in Balmain, Sydney. Expert grooming for all breeds with gentle care and tail-wagging results.",
    url: "https://pawsomeandco.com.au",
    telephone: brand.phone,
    email: brand.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "12 Darling Street",
      addressLocality: "Balmain",
      addressRegion: "NSW",
      postalCode: "2041",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.8567,
      longitude: 151.1793,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "15:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: brand.googleRating,
      reviewCount: brand.reviewCount,
      bestRating: 5,
    },
    priceRange: "$55 - $299",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80",
    sameAs: [
      brand.socials.instagram,
      brand.socials.facebook,
      brand.socials.tiktok,
    ],
  };
}

export function getServiceSchema() {
  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: brand.name,
    },
    offers: {
      "@type": "Offer",
      price: service.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "AUD",
    },
  }));
}

export function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
