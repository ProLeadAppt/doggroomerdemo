"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { PageHero } from "../sections/PageHero";
import { Section } from "../layout/Section";
import { Badge } from "../ui/Badge";
import { FadeInSection } from "../motion/FadeInSection";
import { blogPosts } from "../../data/site";

export function BlogListContent() {
  return (
    <>
      <PageHero
        badge="Blog"
        badgeTone="sage"
        title={
          <>
            Tips, guides &amp;{" "}
            <span className="text-pw-sage">grooming wisdom</span>
          </>
        }
        subtitle="Expert advice from our team to help your pup look and feel their best between grooms."
      />

      <Section noDivider>
        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post, i) => (
            <FadeInSection key={post.slug} delay={i * 0.08}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="rounded-2xl border border-pw-border bg-white overflow-hidden hover:shadow-pw-lg transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge tone="neutral">{post.category}</Badge>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="font-display text-lg font-bold text-pw-charcoal group-hover:text-pw-teal transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-pw-muted leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-pw-muted">
                        <span>{new Date(post.date).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-pw-terracotta flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </Section>
    </>
  );
}
