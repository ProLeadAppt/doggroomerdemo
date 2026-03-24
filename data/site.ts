import type {
  NavLink,
  Brand,
  Service,
  AddOnService,
  Package,
  HowItWorksStep,
  GalleryItem,
  Review,
  TeamMember,
  FAQ,
  BlogPostMeta,
} from "./types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const brand: Brand = {
  name: "Pawsome & Co.",
  tagline: "Where every dog leaves happy.",
  phone: "(02) 8912 3456",
  email: "hello@pawsomeandco.com.au",
  address: "12 Darling Street, Balmain NSW 2041",
  suburb: "Balmain",
  hours: [
    "Mon–Fri: 7:30am – 5:30pm",
    "Saturday: 8:00am – 3:00pm",
    "Sunday: Closed",
  ],
  hoursSummary: "Mon–Sat · 7:30am – 5:30pm",
  established: 2019,
  dogsGroomed: "4,000+",
  googleRating: 4.9,
  reviewCount: 127,
  googleMapsUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.9!2d151.1793!3d-33.8567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12afb3!2sBalmain%20NSW!5e0!3m2!1sen!2sau!4v1234567890",
  socials: {
    instagram: "https://www.instagram.com/pawsomeandco",
    facebook: "https://www.facebook.com/pawsomeandco",
    tiktok: "https://www.tiktok.com/@pawsomeandco",
  },
};

// Image paths — currently using Unsplash for placeholder images.
// TODO: Replace all Unsplash URLs with local paths under public/images/
// e.g. hero image → /images/hero/hero-dog-grooming-balmain.jpg
// Once replaced, remove the remotePatterns entry in next.config.mjs.

export const hero = {
  headline: "Balmain's Most-Loved Dog Grooming Studio",
  subheadline:
    "Premium grooming, gentle care, and tail-wagging results \u2014 trusted by 2,400+ Sydney pup parents since 2019.",
  tagline: "where every pup is a VIP",
  cta: { label: "Book Your Pup's Pamper Day", href: "/booking" },
  ctaSecondary: { label: "Call (02) 8912 3456", href: "tel:+61289123456" },
  trustLine: "\u2605 4.9 Google Rating \u00b7 127+ Reviews \u00b7 Est. 2019 \u00b7 Balmain",
  // TODO: Replace with /images/hero/hero-dog-grooming-balmain.jpg (1920×1080 minimum)
  image:
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920&q=80",
};

export const stats = {
  rating: brand.googleRating,
  reviewCount: brand.reviewCount,
  established: brand.established,
  dogsGroomed: "4,000+",
  credibilityPoints: [
    `${brand.reviewCount} five-star reviews`,
    "Balmain\u2019s #1 groomer",
    `${brand.dogsGroomed} dogs groomed`,
    `Est. ${brand.established}`,
    "All breeds welcome",
    "Certified groomers",
  ],
};

export const services: Service[] = [
  {
    id: "bath-tidy",
    name: "Bath & Tidy",
    tag: "Essential",
    description:
      "Give your pup a spa-quality clean with premium shampoos, a blow dry, nail trim, ear clean, sanitary trim, and a finishing cologne spritz. Fresh, happy, and tail-wagging in just one hour.",
    price: "$65",
    duration: "60 min",
    // TODO: Replace with /images/services/bath-and-tidy.jpg
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
  },
  {
    id: "full-groom-small",
    name: "Full Groom \u2014 Small",
    tag: "Under 10kg",
    description:
      "Your small pup gets the full VIP treatment — bath, blow dry, and a precision haircut styled to breed standard or your preference. A favourite with Cavoodle, Maltese, and Shih Tzu parents.",
    price: "$85",
    duration: "90 min",
    // TODO: Replace with /images/services/full-groom-small.jpg
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80",
    popular: true,
  },
  {
    id: "full-groom-medium",
    name: "Full Groom \u2014 Medium",
    tag: "10\u201325kg",
    description:
      "Tailored styling for medium breeds — Spoodles, Cocker Spaniels, Border Collies, and more. Every groom is adjusted for your dog's unique coat type and personality.",
    price: "$105",
    duration: "2 hrs",
    // TODO: Replace with /images/services/full-groom-medium.jpg
    image:
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&q=80",
  },
  {
    id: "full-groom-large",
    name: "Full Groom \u2014 Large",
    tag: "25kg+",
    description:
      "Big dogs deserve big love. Expert grooming for Golden Retrievers, Labradors, Huskies, and all large breeds — with pricing based on coat condition so you only pay for what your pup needs.",
    price: "From $130",
    duration: "2.5 hrs",
    // TODO: Replace with /images/services/full-groom-large.jpg
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80",
  },
  {
    id: "puppy-first",
    name: "Puppy\u2019s First Groom",
    tag: "Under 6 months",
    description:
      "Set your puppy up for a lifetime of stress-free grooming. A gentle first experience with a warm bath, light trim, nail clip, and plenty of treats \u2014 so they actually look forward to their next visit.",
    price: "$55",
    duration: "45 min",
    // TODO: Replace with /images/services/puppy-first-groom.jpg
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80",
  },
  {
    id: "the-works",
    name: "The Works",
    tag: "Premium",
    description:
      "The ultimate pamper session \u2014 full groom plus de-shed, teeth brushing, pawdicure, and blueberry facial. Our most-requested package for dogs who deserve the best.",
    price: "$150\u2013$180",
    duration: "3 hrs",
    // TODO: Replace with /images/services/the-works.jpg
    image:
      "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=600&q=80",
    popular: true,
  },
];

export const addOns: AddOnService[] = [
  {
    id: "deshed",
    name: "De-shedding Treatment",
    price: "$30\u2013$50",
    description: "Say goodbye to fur tumbleweeds \u2014 reduces shedding up to 80%. Price based on size.",
  },
  {
    id: "teeth",
    name: "Teeth Brushing",
    price: "$15",
    description: "Fresh breath and healthier gums.",
  },
  {
    id: "flea-tick",
    name: "Flea & Tick Wash",
    price: "$20",
    description: "Vet-grade medicated wash that keeps pests away and your pup comfortable.",
  },
  {
    id: "pawdicure",
    name: "Pawdicure",
    price: "$25",
    description: "Nail grind plus paw balm for smooth nails and moisturised pads.",
  },
  {
    id: "blueberry-facial",
    name: "Blueberry Facial",
    price: "$15",
    description: "Tear stain treatment that brightens white coats.",
  },
  {
    id: "coat-conditioning",
    name: "Coat Conditioning",
    price: "$20\u2013$35",
    description: "Restore shine and softness with deep hydration for dry or damaged coats.",
  },
];

export const packages: Package[] = [
  {
    id: "bath-tidy-pkg",
    name: "Bath & Tidy",
    price: "$65",
    description: "The essentials for a clean, fresh pup.",
    features: [
      "Premium shampoo wash",
      "Blow dry & brush out",
      "Nail trim",
      "Ear clean",
      "Sanitary trim",
      "Cologne spritz",
    ],
  },
  {
    id: "the-works-pkg",
    name: "The Works",
    price: "From $150",
    description: "The ultimate pamper \u2014 everything your dog deserves.",
    popular: true,
    badge: "Most Popular",
    features: [
      "Full breed-standard groom",
      "De-shedding treatment",
      "Teeth brushing",
      "Pawdicure with paw balm",
      "Blueberry facial",
      "Bandana & cologne",
      "Post-groom photo",
    ],
  },
  {
    id: "vip-membership",
    name: "VIP Monthly",
    price: "$299/mo",
    interval: "month",
    description: "For the dogs who deserve the best, every month.",
    badge: "Best Value",
    features: [
      "2 full grooms per month",
      "All add-ons included",
      "Priority booking",
      "10% off all retail",
      "Complimentary nail trims between visits",
      "Monthly progress photos",
    ],
  },
];

export const howItWorks: HowItWorksStep[] = [
  {
    number: 1,
    title: "Book Online",
    description:
      "Pick your service, choose a time that suits, and tell us about your pup.",
    icon: "Calendar",
  },
  {
    number: 2,
    title: "Drop Off Your Pup",
    description:
      "Bring your dog to our Balmain studio. We\u2019ll take it from here with a warm welcome.",
    icon: "PawPrint",
  },
  {
    number: 3,
    title: "The Pamper Session",
    description:
      "Your dog gets the full treatment \u2014 gentle care, expert hands, and plenty of love.",
    icon: "Sparkles",
  },
  {
    number: 4,
    title: "Pick Up a Happy Dog",
    description:
      "Collect your freshly groomed pup, tail wagging and looking their absolute best.",
    icon: "Heart",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "gallery-1",
    label: "Cavoodle Transformation",
    description: "From scruffy to stunning \u2014 a full groom for this cheeky Cavoodle.",
    // TODO: Replace with /images/gallery/cavoodle-transformation.jpg
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    category: "Small Dogs",
    dogName: "Luna",
    breed: "Cavoodle",
    ownerQuote: "She came home looking like a completely different dog!",
  },
  {
    id: "gallery-2",
    label: "Golden Retriever Glow-Up",
    description: "De-shed treatment and full groom for this beautiful Golden.",
    // TODO: Replace with /images/gallery/golden-retriever-glow-up.jpg
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80",
    category: "Large Dogs",
    dogName: "Charlie",
    breed: "Golden Retriever",
    ownerQuote: "The de-shedding treatment is a game changer for our house.",
  },
  {
    id: "gallery-3",
    label: "Frenchie Fresh",
    description: "Bath, nail trim, and ear clean for the most photogenic Frenchie.",
    // TODO: Replace with /images/gallery/frenchie-fresh.jpg
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80",
    category: "Small Dogs",
    dogName: "Hugo",
    breed: "French Bulldog",
    ownerQuote: "Hugo always comes back clean, happy, and smelling amazing.",
  },
  {
    id: "gallery-4",
    label: "Spoodle Style",
    description: "Breed-standard clip for this gorgeous Spoodle.",
    // TODO: Replace with /images/gallery/spoodle-style.jpg
    image:
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&q=80",
    category: "Medium Dogs",
    dogName: "Coco",
    breed: "Spoodle",
    ownerQuote: "Coco has never looked or felt better. Absolute professionals.",
  },
  {
    id: "gallery-5",
    label: "Puppy\u2019s First Visit",
    description: "Gentle introductory groom \u2014 building trust from day one.",
    // TODO: Replace with /images/gallery/puppy-first-visit.jpg
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80",
    category: "Small Dogs",
    dogName: "Biscuit",
    breed: "Mixed Breed",
    ownerQuote: "So much patience and treats — he loved his first visit!",
  },
  {
    id: "gallery-6",
    label: "The Studio",
    description: "Our bright, welcoming space on Darling Street.",
    // TODO: Replace with /images/gallery/studio-darling-street.jpg
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
    category: "Studio",
  },
];

export const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Sarah M.",
    text: "Honestly the best groomer we\u2019ve ever been to. Luna used to hate bath time but she actually gets excited when we pull into Darling Street now. The team is so patient and gentle \u2014 you can tell they genuinely love dogs.",
    stars: 5,
    dogName: "Luna",
    breed: "Cavoodle",
    service: "Full Groom",
  },
  {
    id: "rev-2",
    name: "James T.",
    text: "We bring our Golden Retriever here every 6 weeks and the de-shedding treatment is a game changer. Our house went from tumbleweeds of fur to almost nothing. Worth every cent.",
    stars: 5,
    dogName: "Charlie",
    breed: "Golden Retriever",
    service: "The Works",
  },
  {
    id: "rev-3",
    name: "Michelle K.",
    text: "Took our nervous rescue pup for his first ever groom and they were incredible. So much patience, treats, and positive energy. He came out looking like a completely different dog. Can\u2019t recommend enough!",
    stars: 5,
    dogName: "Biscuit",
    breed: "Mixed Breed",
    service: "Puppy\u2019s First Groom",
  },
  {
    id: "rev-4",
    name: "David L.",
    text: "Professional, friendly, and consistent. My Frenchie always comes back clean, happy, and smelling amazing. The online booking makes it so easy \u2014 no more phone tag trying to get an appointment.",
    stars: 5,
    dogName: "Hugo",
    breed: "French Bulldog",
    service: "Bath & Tidy",
  },
  {
    id: "rev-5",
    name: "Emma W.",
    text: "The VIP membership is the best decision we\u2019ve made. Two grooms a month, all the extras included, and priority booking. Our Spoodle has never looked or felt better. It\u2019s a no-brainer.",
    stars: 5,
    dogName: "Coco",
    breed: "Spoodle",
    service: "VIP Monthly",
  },
  {
    id: "rev-6",
    name: "Tom R.",
    text: "I\u2019ve tried three other groomers in the Inner West and none come close. The attention to detail is next level \u2014 they even sent me a photo of Cooper after his groom. Such a nice touch.",
    stars: 5,
    dogName: "Cooper",
    breed: "Border Collie",
    service: "Full Groom",
  },
  {
    id: "rev-7",
    name: "Lisa C.",
    text: "My Maltese has very sensitive skin and they use the perfect products. No irritation, coat is soft and fluffy every time. The blueberry facial keeps her white coat bright. Love this place!",
    stars: 4,
    dogName: "Bella",
    breed: "Maltese",
    service: "The Works",
  },
  {
    id: "rev-8",
    name: "Chris P.",
    text: "Booked online, dropped off Rex, picked up a new dog. Seriously, the transformation is incredible. They even trimmed his nails and cleaned his ears without me having to ask. True professionals.",
    stars: 5,
    dogName: "Rex",
    breed: "Labrador",
    service: "Full Groom \u2014 Large",
  },
];

export const team: TeamMember[] = [
  {
    id: "team-1",
    name: "Sophie Chen",
    role: "Owner & Head Groomer",
    bio: "After 10 years grooming dogs across Sydney, Sophie founded Pawsome & Co. in 2019 with a simple mission: make every dog feel safe and leave looking amazing. She specialises in Asian fusion styling and breed-specific cuts.",
    // TODO: Replace with /images/team/sophie-chen.jpg
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    specialties: ["Cavoodles", "Poodles", "Asian Fusion Styling"],
  },
  {
    id: "team-2",
    name: "Marcus Johnson",
    role: "Senior Groomer",
    bio: "Marcus joined the team in 2020 and brings a calm energy that even the most nervous dogs respond to. He\u2019s our go-to for large breeds and de-shedding treatments.",
    // TODO: Replace with /images/team/marcus-johnson.jpg
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    specialties: ["Large Breeds", "De-shedding", "Rescue Dogs"],
  },
  {
    id: "team-3",
    name: "Emily Park",
    role: "Groomer",
    bio: "Emily is a certified dog groomer with a particular talent for puppy introductions. Her patience and gentle touch make first-time visits a breeze.",
    // TODO: Replace with /images/team/emily-park.jpg
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    specialties: ["Puppies", "Terriers", "Hand Stripping"],
  },
  {
    id: "team-4",
    name: "Jack Williams",
    role: "Client Experience",
    bio: "Jack keeps everything running smoothly at reception. Booking queries, scheduling, and making sure every dog (and owner) gets a warm welcome.",
    // TODO: Replace with /images/team/jack-williams.jpg
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    specialties: ["Bookings", "Customer Care"],
  },
];

export const about = {
  title: "A studio built on love, patience, and really good haircuts.",
  // TODO: Replace with /images/about/studio-interior.jpg
  image:
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
  story: [
    "Pawsome & Co. was born in 2019 when Sophie Chen left her corporate grooming role to open a one-chair salon on Darling Street, Balmain. The idea was simple: create the kind of grooming experience she\u2019d want for her own dogs.",
    "What started as a passion project quickly became Balmain\u2019s most-loved grooming studio. Three years and 4,000+ grooms later, the team has grown to three expert groomers and a dedicated front-of-house, but the philosophy hasn\u2019t changed.",
    "Every dog is treated like family. Every groom is done with patience. And every pup leaves looking \u2014 and feeling \u2014 their absolute best.",
  ],
  values: [
    {
      title: "Gentle Care",
      description:
        "We never rush. Every dog is handled with patience, positive reinforcement, and respect for their comfort level.",
      icon: "Heart",
    },
    {
      title: "Expert Knowledge",
      description:
        "Our groomers are certified professionals who understand breed standards, coat types, and skin conditions.",
      icon: "GraduationCap",
    },
    {
      title: "Tail-Wagging Results",
      description:
        "We don\u2019t just groom dogs \u2014 we transform them. Every pup leaves clean, styled, and genuinely happy.",
      icon: "Sparkles",
    },
  ],
};

export const faq: FAQ[] = [
  {
    question: "Do I need to book in advance?",
    answer:
      "Yes, we recommend booking online at least a few days ahead \u2014 we\u2019re a small team and our spots fill up fast, especially Saturdays. The good news? Online booking takes under a minute, and you\u2019ll get instant confirmation. You can also call us at (02) 8912 3456.",
    category: "Booking",
  },
  {
    question: "What if my dog is nervous or has never been groomed before?",
    answer:
      "You\u2019re in the right place! We specialise in nervous and first-time dogs \u2014 it\u2019s one of the things our 127+ five-star reviewers mention most. Our Puppy\u2019s First Groom service ($55) is designed to build positive associations with gentle handling, treats, and patience. We\u2019ll always go at your dog\u2019s pace.",
    category: "Services",
  },
  {
    question: "How long does a groom take?",
    answer:
      "A Bath & Tidy takes about 60 minutes. Full grooms range from 90 minutes to 2.5 hours depending on your dog\u2019s size and coat condition. We never rush \u2014 your pup gets the time and attention they deserve. We\u2019ll give you an accurate time estimate at drop-off.",
    category: "Services",
  },
  {
    question: "Do I need to stay during the groom?",
    answer:
      "No \u2014 most owners drop off and pick up, which is actually less stressful for your dog. We\u2019ll send you a text (and a cute photo!) when your pup is ready. If your dog has severe anxiety, we can discuss options for a stay-and-watch arrangement.",
    category: "Services",
  },
  {
    question: "What products do you use?",
    answer:
      "We use premium, Australian-made grooming products that are gentle on even the most sensitive skin. All our shampoos are pH-balanced for dogs and free from harsh chemicals. Many of our 4,000+ happy pups have skin sensitivities \u2014 we\u2019re experienced with them. Just let us know about any allergies when you book.",
    category: "Dog Care",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes! There\u2019s 2-hour street parking on Darling Street and surrounding streets. The closest car park is at Balmain Leagues Club, a 3-minute walk away. Drop-off and pick-up usually takes less than 5 minutes, so parking is never an issue.",
    category: "Booking",
  },
];

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "how-often-should-you-groom-your-cavoodle",
    title: "How Often Should You Groom Your Cavoodle? A Complete Guide",
    excerpt:
      "Cavoodles are Australia\u2019s most popular breed \u2014 and one of the most grooming-intensive. Here\u2019s everything you need to know about keeping their coat in top condition.",
    date: "2025-03-15",
    // TODO: Replace with /images/general/cavoodle-grooming-guide.jpg
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    readTime: "5 min read",
    category: "Breed Guides",
  },
  {
    slug: "signs-your-dog-needs-professional-groom",
    title: "5 Signs Your Dog Needs a Professional Groom (Not Just a Bath)",
    excerpt:
      "A quick bath at home isn\u2019t always enough. Here are the telltale signs it\u2019s time to book a professional grooming session.",
    date: "2025-03-01",
    // TODO: Replace with /images/general/dog-bath-time.jpg
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    readTime: "4 min read",
    category: "Dog Care",
  },
  {
    slug: "puppys-first-groom-what-to-expect",
    title: "Puppy\u2019s First Groom: What to Expect and How to Prepare",
    excerpt:
      "Your puppy\u2019s first grooming experience sets the tone for a lifetime of stress-free visits. Here\u2019s how to make it a positive one.",
    date: "2025-02-14",
    // TODO: Replace with /images/general/puppy-first-groom-guide.jpg
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    readTime: "6 min read",
    category: "Puppy Care",
  },
  {
    slug: "best-dog-groomers-balmain",
    title: "The Best Dog Groomers in Balmain: What to Look For",
    excerpt:
      "Not all groomers are created equal. Here\u2019s what separates a great groomer from the rest, and what to look for when choosing one in Balmain.",
    date: "2025-01-20",
    // TODO: Replace with /images/general/balmain-dog-grooming-guide.jpg
    image:
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800&q=80",
    readTime: "5 min read",
    category: "Local Guide",
  },
];

export const conversionData = {
  bookingsThisMonth: 127,
  spotsLeftThisWeek: 3,
  totalGrooms: 2400,
};

export const socialCards = [
  {
    id: "instagram",
    platform: "Instagram",
    handle: "@pawsomeandco",
    description: "Before & afters, grooming tips, and the cutest pups in Balmain.",
    ctaLabel: "Follow Us",
    href: brand.socials.instagram,
  },
  {
    id: "tiktok",
    platform: "TikTok",
    handle: "@pawsomeandco",
    description: "Satisfying groom videos and behind-the-scenes studio life.",
    ctaLabel: "Watch Now",
    href: brand.socials.tiktok,
  },
  {
    id: "facebook",
    platform: "Facebook",
    handle: "Pawsome & Co.",
    description: "Reviews, booking updates, and community events.",
    ctaLabel: "Connect With Us",
    href: brand.socials.facebook,
  },
];
