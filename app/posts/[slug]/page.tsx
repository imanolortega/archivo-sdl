import {
  getAllPostSlugs,
  getCategoryById,
  getFeaturedMediaById,
  getPostBySlug,
} from "@/lib/wordpress";

import { badgeVariants } from "@/components/ui/badge";
import { Section, Container, Article, Prose } from "@/components/craft";
import Balancer from "react-wrap-balancer";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site.config";
import Placeholder from "@/public/subida-article-placeholder.webp";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return await getAllPostSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    console.error("Error al obtener el post:", error);
    return notFound();
  }

  if (!post) {
    return notFound();
  }

  const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
  ogUrl.searchParams.append("title", post.title.rendered);
  // Strip HTML tags for description
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
  ogUrl.searchParams.append("description", description);

  return {
    title: `${post.title.rendered} | ${siteConfig.site_name}`,
    description: description,
    openGraph: {
      title: `${post.title.rendered} | ${siteConfig.site_name}`,
      description: description,
      type: "article",
      url: `${siteConfig.site_domain}/posts/${post.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title.rendered,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.rendered,
      description: description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const featuredMedia = post?.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
  const category = await getCategoryById(post?.categories[0]);

  function removeInlineStyles(html: string): string {
  return html.replace(/style="[^"]*"/g, '');
}

  return (
    <Section>
      <Container>
        <Prose>
          <h1>
            <Balancer>
              <span
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              ></span>
            </Balancer>
          </h1>
          <div className="flex justify-between items-center gap-4 text-sm mb-4">
            <Link
              href={`/posts/?category=${category.id}`}
              className={cn(
                badgeVariants({ variant: "outline" }),
                "!no-underline"
              )}
            >
              {category.name}
            </Link>
          </div>
          {featuredMedia?.source_url && (
            <div className="h-96 my-12 md:h-[500px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
              <Image
                className="h-full w-full object-cover"
                src={featuredMedia.source_url}
                alt={post.title.rendered}
                width={1200}
                height={900}
                placeholder="blur"
                blurDataURL={Placeholder.src}
              />
            </div>
          )}
        </Prose>

        <Article dangerouslySetInnerHTML={{ __html: removeInlineStyles(post.content.rendered) }} />
      </Container>
    </Section>
  );
}
