import {
  getPostsByCategory,
} from "@/lib/wordpress";

import { Section, Container, Prose } from "@/components/craft";
import { PostCard } from "@/components/posts/post-card";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "Browse all our blog posts",
};

export const dynamic = "auto";
export const revalidate = 600;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    author?: string;
    tag?: string;
    category?: string;
    page?: string;
    search?: string;
  }>;
}) {
  // Fetch data based on search parameters using efficient pagination
  const [postsResponse] = await Promise.all([getPostsByCategory(892)]);

  const posts = postsResponse;

  return (
    <Section>
      <Container>
        <div className="space-y-8">
          <Prose>
            <h2>Musa: el nombre del miedo</h2>
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
