import { blogPosts } from "@/data/site";

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  readTime: string;
  category: string;
  content: string;
  ctaLabel: string;
  ctaHref: string;
};

const articleContent: Record<string, string> = {
  "how-often-should-you-groom-your-cavoodle": `
<p>Cavoodles are Australia\u2019s most popular breed \u2014 and for good reason. They\u2019re friendly, intelligent, and absolutely adorable. But that gorgeous curly coat comes with a catch: it needs regular, professional grooming to stay healthy and mat-free.</p>

<h2>The Short Answer</h2>
<p>Most Cavoodles need a professional groom <strong>every 4\u20136 weeks</strong>. If you\u2019re brushing at home between visits, you can stretch it to 6 weeks. If not, 4 weeks is safer.</p>

<h2>Why Cavoodle Coats Are High-Maintenance</h2>
<p>Cavoodles inherit a mix of the Cavalier King Charles Spaniel\u2019s silky coat and the Poodle\u2019s curly, low-shedding coat. The result is a coat that:</p>
<ul>
<li>Grows continuously (like hair, not fur)</li>
<li>Tangles and mats easily, especially behind the ears, under the legs, and around the collar area</li>
<li>Traps dirt and moisture close to the skin</li>
<li>Varies wildly between individuals \u2014 some are wavy, some are tightly curled</li>
</ul>

<h2>What Happens If You Leave It Too Long</h2>
<p>Matting isn\u2019t just an aesthetic issue \u2014 it\u2019s a welfare issue. Severely matted coats pull on the skin, cause pain, restrict movement, and can hide skin infections, hot spots, and even parasites. In extreme cases, the only option is a full shave-down, which is stressful for the dog and heartbreaking for the owner.</p>

<h2>A Grooming Schedule That Works</h2>
<ul>
<li><strong>Every 4 weeks:</strong> Full groom with bath, blow dry, haircut, nail trim, ear clean</li>
<li><strong>Between grooms:</strong> Brush at home 2\u20133 times per week with a slicker brush</li>
<li><strong>Monthly:</strong> Check ears for build-up and eyes for tear staining</li>
<li><strong>Every 2 weeks:</strong> Quick paw pad check and sanitary trim if needed</li>
</ul>

<h2>Our Recommendation</h2>
<p>At Pawsome &amp; Co., our most popular service for Cavoodle owners is <strong>The Works</strong> \u2014 a full groom plus de-shedding treatment, teeth brushing, pawdicure, and blueberry facial. It keeps your Cavoodle looking and feeling incredible between visits.</p>
<p>For the best value, consider our <strong>VIP Monthly Membership</strong> at $299/month, which includes two full grooms and all add-ons. Most of our Cavoodle owners are on this plan.</p>
`,

  "signs-your-dog-needs-professional-groom": `
<p>We get it \u2014 life gets busy. Between work, kids, and everything else, your dog\u2019s grooming schedule can slip. But there are some clear signs that a quick bath at home isn\u2019t going to cut it anymore.</p>

<h2>1. You Can\u2019t Run Your Fingers Through Their Coat</h2>
<p>If your fingers get stuck or you feel clumps when you try to brush through the coat, mats are forming. Small mats can be brushed out at home, but once they tighten close to the skin, they need professional attention. Don\u2019t try to cut them out yourself \u2014 it\u2019s easy to nick the skin.</p>

<h2>2. They\u2019re Scratching More Than Usual</h2>
<p>Excessive scratching can indicate skin irritation caused by a dirty coat, matting pulling on the skin, or trapped debris. A professional groom includes a thorough wash with pH-balanced products, which often resolves the itching immediately.</p>

<h2>3. Their Nails Are Clicking on the Floor</h2>
<p>If you can hear your dog\u2019s nails on hard floors, they\u2019re overdue for a trim. Long nails change your dog\u2019s gait, can cause joint pain over time, and risk splitting or breaking painfully. Professional groomers use the right tools and know exactly where the quick is.</p>

<h2>4. You Can Smell Them From Across the Room</h2>
<p>A healthy dog shouldn\u2019t have a strong odour. If yours does, it could be trapped oils, yeast build-up in the ears, dental issues, or skin problems that need professional treatment \u2014 not just a hose-down in the backyard.</p>

<h2>5. They\u2019re Squinting or Pawing at Their Face</h2>
<p>Hair growing into the eyes is uncomfortable and can cause infections. Tear staining around the eyes is another sign that a professional clean-up is needed. Our Blueberry Facial treatment specifically targets tear stains and brightens the face.</p>

<h2>Don\u2019t Wait Until It\u2019s Urgent</h2>
<p>Regular grooming isn\u2019t just cosmetic \u2014 it\u2019s preventative healthcare. A good groomer will spot skin issues, lumps, ear infections, and dental problems early, before they become expensive vet visits.</p>
<p>At Pawsome &amp; Co., we recommend a <strong>Bath &amp; Tidy every 2\u20133 weeks</strong> between full grooms. It keeps your dog fresh, comfortable, and healthy \u2014 without the full price tag every time.</p>
`,

  "puppys-first-groom-what-to-expect": `
<p>Your puppy\u2019s first grooming experience is a big deal. Get it right, and you\u2019ll have a dog that actually enjoys going to the groomer for the rest of their life. Get it wrong, and every visit becomes a battle.</p>

<h2>When Should You Book the First Groom?</h2>
<p>Most puppies are ready for their first professional groom at <strong>12\u201316 weeks</strong>, after they\u2019ve had their second round of vaccinations. Don\u2019t wait until their coat is out of control \u2014 the first visit is about building positive associations, not getting a perfect haircut.</p>

<h2>What Happens During a Puppy Groom?</h2>
<p>At Pawsome &amp; Co., our Puppy\u2019s First Groom is specifically designed to be gentle and positive. Here\u2019s what we do:</p>
<ul>
<li><strong>Introduction:</strong> We let your puppy explore the salon, sniff around, and meet the groomer on their terms</li>
<li><strong>Gentle handling:</strong> We touch their paws, ears, and face to get them used to being handled</li>
<li><strong>Warm bath:</strong> A gentle wash with puppy-safe shampoo</li>
<li><strong>Light blow dry:</strong> On a low, warm setting \u2014 some puppies need a few visits to get used to the dryer</li>
<li><strong>Nail trim:</strong> Quick and gentle</li>
<li><strong>Light trim:</strong> Just a tidy-up around the eyes, paws, and sanitary area</li>
<li><strong>Treats and praise:</strong> Lots of them, throughout the entire process</li>
</ul>

<h2>How to Prepare Your Puppy</h2>
<ol>
<li><strong>Handle them at home:</strong> Touch their paws, ears, and mouth regularly so they\u2019re used to it</li>
<li><strong>Introduce sounds:</strong> Run a hairdryer near them (not on them) so they\u2019re familiar with the noise</li>
<li><strong>Brush regularly:</strong> Even if they don\u2019t need it yet, get them used to the sensation</li>
<li><strong>Don\u2019t feed them 2 hours before:</strong> Some puppies get car-sick or nervous-tummy on their first visit</li>
<li><strong>Stay calm yourself:</strong> Puppies pick up on your energy. If you\u2019re anxious, they will be too</li>
</ol>

<h2>What If My Puppy Is Scared?</h2>
<p>That\u2019s completely normal. Our groomers are trained to work with nervous puppies. We\u2019ll go at their pace, take breaks when needed, and never force anything. Sometimes a first visit is just a bath and some treats \u2014 and that\u2019s perfectly fine.</p>
<p>The goal isn\u2019t a perfect groom. The goal is a puppy that thinks the grooming salon is the best place in the world.</p>

<h2>Pricing</h2>
<p>Our Puppy\u2019s First Groom is <strong>$55 for 45 minutes</strong>. It\u2019s the best investment you\u2019ll make in your puppy\u2019s grooming journey.</p>
`,

  "best-dog-groomers-balmain": `
<p>Finding a great dog groomer is a lot like finding a great hairdresser \u2014 once you find the right one, you never leave. But with so many options in the Inner West, how do you know what to look for?</p>

<h2>1. Qualifications and Experience</h2>
<p>A good groomer should have formal training in dog grooming, not just \u201cI\u2019ve always loved dogs.\u201d Look for certifications from recognised grooming schools, ongoing professional development, and experience with your specific breed. Different breeds have vastly different coat types, and a groomer who\u2019s amazing with Poodles might struggle with a double-coated Husky.</p>

<h2>2. The Studio Environment</h2>
<p>Visit the salon before booking. It should be:</p>
<ul>
<li><strong>Clean and well-maintained</strong> \u2014 no hair piles, no strong chemical smells</li>
<li><strong>Well-lit and ventilated</strong> \u2014 a dark, stuffy salon is a red flag</li>
<li><strong>Organised</strong> \u2014 tools should be clean and stored properly</li>
<li><strong>Calm</strong> \u2014 dogs should appear relaxed, not stressed or barking excessively</li>
</ul>

<h2>3. How They Handle Dogs</h2>
<p>Watch how the groomers interact with the dogs. Are they patient? Do they use positive reinforcement? Do they take breaks when a dog is stressed? The best groomers prioritise the dog\u2019s comfort over speed. If a groomer rushes through a nervous dog just to get to the next appointment, walk away.</p>

<h2>4. Transparent Pricing</h2>
<p>A reputable groomer will give you a clear price upfront based on your dog\u2019s breed, size, and coat condition. Be wary of places that quote a suspiciously low price and then add surcharges for matting, de-shedding, or \u201cdifficult\u201d behaviour.</p>

<h2>5. Reviews and Reputation</h2>
<p>Check Google Reviews, not just the star rating but the actual comments. Look for consistency \u2014 if multiple reviews mention the same positive qualities (patience, attention to detail, friendly staff), that\u2019s a reliable signal.</p>

<h2>6. Communication</h2>
<p>A great groomer communicates with you before, during, and after the groom. They\u2019ll ask about your preferences, flag any concerns they notice (skin issues, ear infections, dental problems), and send you a photo of the finished result.</p>

<h2>Why Balmain Dog Owners Choose Pawsome &amp; Co.</h2>
<p>We tick every box above \u2014 but don\u2019t take our word for it. With a <strong>4.9-star rating</strong> and <strong>127+ Google reviews</strong>, we\u2019re the highest-rated groomer in Balmain. Our team of certified groomers specialises in all breeds, from Cavoodles to Great Danes.</p>
<p>We\u2019re transparent with our pricing, gentle with every dog, and genuinely passionate about what we do. Book online or pop in to say hello \u2014 we\u2019re at 12 Darling Street, Balmain.</p>
`,
};

const articleCTAs: Record<string, { label: string; href: string }> = {
  "how-often-should-you-groom-your-cavoodle": {
    label: "Book a Cavoodle Groom",
    href: "/booking",
  },
  "signs-your-dog-needs-professional-groom": {
    label: "Book a Professional Groom",
    href: "/booking",
  },
  "puppys-first-groom-what-to-expect": {
    label: "Book Puppy\u2019s First Groom",
    href: "/booking",
  },
  "best-dog-groomers-balmain": {
    label: "Book at Pawsome & Co.",
    href: "/booking",
  },
};

export function getArticle(slug: string): BlogArticle | null {
  const meta = blogPosts.find((p) => p.slug === slug);
  if (!meta) return null;

  const cta = articleCTAs[slug] || { label: "Book a Groom", href: "/booking" };

  return {
    ...meta,
    content: articleContent[slug] || "",
    ctaLabel: cta.label,
    ctaHref: cta.href,
  };
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
