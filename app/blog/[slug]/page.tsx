import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock, Calendar, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { getArticle, getAllSlugs } from "@/lib/blog";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/schema";
import { blogPosts } from "@/data/site";

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
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
      type: "article",
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const baseUrl = "https://doggroomer.netlify.app";
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <div className="flex min-h-screen flex-col bg-pw-cream text-pw-charcoal">
      <SchemaScript schema={getArticleSchema(article)} />
      <SchemaScript
        schema={getBreadcrumbSchema([
          { name: "Home", url: baseUrl },
          { name: "Blog", url: `${baseUrl}/blog` },
          { name: article.title, url: `${baseUrl}/blog/${slug}` },
        ])}
      />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero image */}
        <div className="relative h-[35vh] min-h-[280px] overflow-hidden">
          <Image
            src={article.image}
            alt={`${article.title} — Pawsome & Co. blog`}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pw-cream via-pw-cream/30 to-transparent" />
        </div>

        <Section noDivider className="!pt-0 -mt-20 relative z-10">
          <article className="max-w-pw-narrow mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-pw-muted mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-pw-charcoal transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <Link href="/blog" className="hover:text-pw-charcoal transition-colors">Blog</Link>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <span className="text-pw-charcoal truncate max-w-[200px]">{article.title}</span>
            </nav>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-4">
              <Badge tone="sage">{article.category}</Badge>
              <span className="flex items-center gap-1 text-xs text-pw-muted">
                <Calendar className="h-3 w-3" aria-hidden="true" />
                {new Date(article.date).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1 text-xs text-pw-muted">
                <Clock className="h-3 w-3" aria-hidden="true" />
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

            {/* Contextual CTA */}
            <div className="mt-16 rounded-2xl border border-pw-sage/30 bg-pw-sage/5 p-8 text-center">
              <h3 className="font-display text-xl font-bold text-pw-charcoal">
                Ready to book?
              </h3>
              <p className="mt-2 text-sm text-pw-muted max-w-md mx-auto">
                Give your pup the grooming experience they deserve.
              </p>
              <div className="mt-5">
                <Button asChild>
                  <Link href={article.ctaHref}>{article.ctaLabel}</Link>
                </Button>
              </div>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h3 className="font-display text-lg font-bold text-pw-charcoal mb-6">
                  Keep reading
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex gap-4 rounded-xl border border-pw-border bg-white p-4 hover:shadow-pw transition-shadow"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={`${post.title} — Pawsome & Co. blog`}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-sm text-pw-charcoal group-hover:text-pw-teal transition-colors line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-xs text-pw-muted mt-1">{post.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
