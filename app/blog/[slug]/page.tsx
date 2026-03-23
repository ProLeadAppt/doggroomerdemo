import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getArticle, getAllSlugs } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title} | Pawsome & Co.`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-pw-cream text-pw-charcoal">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero image */}
        <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pw-cream via-pw-cream/30 to-transparent" />
        </div>

        <Section noDivider className="!pt-0 -mt-20 relative z-10">
          <article className="max-w-pw-narrow mx-auto">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-pw-muted hover:text-pw-charcoal transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-4">
              <Badge tone="sage">{article.category}</Badge>
              <span className="flex items-center gap-1 text-xs text-pw-muted">
                <Calendar className="h-3 w-3" />
                {new Date(article.date).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1 text-xs text-pw-muted">
                <Clock className="h-3 w-3" />
                {article.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-display-lg text-pw-charcoal mb-8">
              {article.title}
            </h1>

            {/* Article body */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-display prose-headings:text-pw-charcoal prose-headings:font-bold
                prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:text-pw-charcoal/80 prose-p:leading-relaxed
                prose-li:text-pw-charcoal/80
                prose-strong:text-pw-charcoal
                prose-a:text-pw-teal prose-a:no-underline hover:prose-a:underline
                prose-ul:space-y-2 prose-ol:space-y-2"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* CTA */}
            <div className="mt-16 rounded-2xl border border-pw-sage/30 bg-pw-sage/5 p-8 text-center">
              <h3 className="font-display text-xl font-bold text-pw-charcoal">
                Ready to book?
              </h3>
              <p className="mt-2 text-sm text-pw-muted max-w-md mx-auto">
                Give your pup the grooming experience they deserve. Book online
                or call us today.
              </p>
              <div className="mt-5">
                <Button asChild>
                  <Link href="/booking">Book a Groom</Link>
                </Button>
              </div>
            </div>
          </article>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
