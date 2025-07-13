import { Section, Container, Prose } from "@/components/craft";
import Balancer from "react-wrap-balancer";

import Link from "next/link";

import { gridMainContent, homePage } from "@/lib/content";
import { SearchInput } from "@/components/posts/search-input";
import { FilterPosts } from "@/components/posts/filter";
import { getPostsPaginated } from "@/lib/wordpress";
import { PostCard } from "@/components/posts/post-card";

export const dynamic = "auto";
export const revalidate = 600;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  const { page: pageParam, search } = params;

  // Handle pagination
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const postsPerPage = 6;

  const [postsResponse] = await Promise.all([
    getPostsPaginated(page, postsPerPage, { search }),
  ]);

  const { data: posts, headers } = postsResponse;
  const { total, totalPages } = headers;

  return (
    <main>
      <Section className="pb-0 md:pb-0">
        <Container>
          <div className="space-y-16">
            <Prose>
              <h1 className="mb-12">
                Archivo <Balancer>Subida de Línea</Balancer>
              </h1>
              <p>{homePage.description}</p>
            </Prose>
          </div>
        </Container>
      </Section>

      <Section className="p-0 md:p-0">
        <Container className="grid md:grid-cols-3 gap-4 mt-6">
          {gridMainContent.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="border h-48 bg-accent/25 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
            >
              <item.icon size={32} />
              <span>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="block text-sm text-muted-foreground mt-4">
                  {item.description}
                </p>
              </span>
            </Link>
          ))}
        </Container>
      </Section>

      <Section>
        <Container>
          <Prose>
            <h2 className="mb-12">
              Últimas notas
            </h2>
          </Prose>
          <section className="space-y-6">
            <SearchInput defaultValue={search} />

            {posts.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
                <p>No se encontraron artículos</p>
              </div>
            )}
          </section>
        </Container>
      </Section>
    </main>
  );
}
