import { getPostsByCategory } from "@/lib/wordpress";

import { Section, Container, Prose } from "@/components/craft";
import { PostCard } from "@/components/posts/post-card";

import type { Metadata } from "next";
import { topPost } from "@/lib/content";

export const metadata: Metadata = {
  title: topPost.title,
  description: topPost.description,
  alternates: {
    canonical: topPost.canonical,
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
            <h2>{topPost.title}</h2>
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
