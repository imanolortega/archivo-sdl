import { getPostsByCategory } from "@/lib/wordpress";

import { Section, Container, Prose } from "@/components/craft";
import { PostCard } from "@/components/posts/post-card";

import type { Metadata } from "next";
import { topPost } from "@/lib/content.config";
import { siteConfig } from "@/lib/site.config";

const siteTitle = `${topPost.title} | Subida de Línea`;
const pageURL = `${siteConfig.site_domain}${topPost.canonical}`;
const openGraphImage = `${siteConfig.site_domain}/musa-el-nombre-del-miedo.webp`

export const metadata: Metadata = {
  title: siteTitle,
  description: topPost.description,
  metadataBase: new URL(pageURL),
  alternates: {
    canonical: topPost.canonical,
  },
  openGraph: {
    title: siteTitle,
    description: topPost.description,
    type: "website",
    url: pageURL,
    images: [
      {
        url: openGraphImage,
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: topPost.description,
    images: [openGraphImage],
  },
};

export const dynamic = "auto";
export const revalidate = 600;

export default async function Page() {
  const [postsResponse] = await Promise.all([getPostsByCategory(892)]);
  const posts = postsResponse;

  return (
    <Section>
      <Container>
        <div className="space-y-8">
          <Prose>
            <h1>{topPost.title}</h1>
          </Prose>

          <div className="grid md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
