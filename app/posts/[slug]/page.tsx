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
import { socialMediaToShare } from "@/lib/content.config";

import { FacebookIcon } from "@/components/icons/facebook";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { XIcon } from "@/components/icons/x";
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
    return html.replace(/style="[^"]*"/g, "");
  }

  const iconColor = "text-accent-foreground/90 hover:text-accent-foreground"
  const iconSize = 24;

  const socialIcons: Record<string, JSX.Element> = {
    facebook: <FacebookIcon className={iconColor} width={iconSize} height={iconSize} />,
    x: <XIcon className={iconColor} width={iconSize} height={iconSize} />,
    whatsapp: <WhatsAppIcon className={iconColor} width={iconSize} height={iconSize} />,
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
                "!no-underline",
                "px-4 py-2",
              )}
            >
              {category.name}
            </Link>
          </div>
          {featuredMedia?.source_url && (
            <div className="h-96 my-12 mb-8 md:h-[500px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
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

        <Container className="py-4 sm:py-8 px-0 sm:px-0 grid grid-cols-3 max-w-fit m-0 mb-2 gap-4">
          {socialMediaToShare.map((social) => (
            <Link
              key={social.alt}
              href={`${social.url}${encodeURIComponent(
                `${siteConfig.site_domain}/posts/${post.slug}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm"
            >
              {socialIcons[social.icon]}
            </Link>
          ))}
        </Container>

        <Article
          dangerouslySetInnerHTML={{
            __html: removeInlineStyles(post.content.rendered),
          }}
        />
      </Container>
    </Section>
  );
}
