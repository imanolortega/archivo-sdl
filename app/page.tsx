import { Section, Container, Prose } from "@/components/craft";
import Balancer from "react-wrap-balancer";

import Link from "next/link";

import { gridMainContent, homePage } from "@/lib/content.config";
import { SearchInput } from "@/components/posts/search-input";
import { FilterPosts } from "@/components/posts/filter";
import { getPostsPaginated } from "@/lib/wordpress";
import { PostCard } from "@/components/posts/post-card";
import { Pagination
, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

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

  // Create pagination URL helper
  const createPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set("page", newPage.toString());
    if (search) params.set("search", search);
    return `/${params.toString() ? `?${params.toString()}` : ""}`;
  };

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
              <item.icon size={32} className="text-muted-foreground" />
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
                <p>No se encontraron textos</p>
              </div>
            )}

            {totalPages > 1 && (
            <div className="flex justify-center items-center py-8">
              <Pagination>
                <PaginationContent>
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href={createPaginationUrl(page - 1)}
                      />
                    </PaginationItem>
                  )}

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((pageNum) => {
                      // Show current page, first page, last page, and 2 pages around current
                      return (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        Math.abs(pageNum - page) <= 1
                      );
                    })
                    .map((pageNum, index, array) => {
                      const showEllipsis =
                        index > 0 && pageNum - array[index - 1] > 1;
                      return (
                        <div key={pageNum} className="flex items-center">
                          {showEllipsis && <span className="px-2">...</span>}
                          <PaginationItem>
                            <PaginationLink
                              href={createPaginationUrl(pageNum)}
                              isActive={pageNum === page}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        </div>
                      );
                    })}

                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationNext href={createPaginationUrl(page + 1)} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
          </section>
        </Container>
      </Section>
    </main>
  );
}
