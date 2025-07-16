import {
  getPostsPaginated,
  getAllAuthors,
  getAllTags,
  getAllCategories,
  searchAuthors,
  searchTags,
  searchCategories,
} from "@/lib/wordpress";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Section, Container, Prose } from "@/components/craft";
import { PostCard } from "@/components/posts/post-card";
import { FilterPosts } from "@/components/posts/filter";
import { SearchInput } from "@/components/posts/search-input";

import type { Metadata } from "next";
import { postsPage } from "@/lib/content.config";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: `${postsPage.title} | ${siteConfig.site_name}`,
  description: postsPage.description,
  alternates: {
    canonical: postsPage.canonical,
  },
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
    year?: string;
  }>;
}) {
  const params = await searchParams;
  const { author, tag, category, page: pageParam, search, year } = params;

  let after: string | undefined;
  let before: string | undefined;

  if (year) {
    after = `${year}-01-01T00:00:00`;
    before = `${Number(year) + 1}-01-01T00:00:00`;
  }

  // Handle pagination
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const postsPerPage = 9;

  // Fetch data based on search parameters using efficient pagination
  const [postsResponse, authors, tags, categories] = await Promise.all([
    getPostsPaginated(page, postsPerPage, { author, tag, category, search, after, before }),
    search ? searchAuthors(search) : getAllAuthors(),
    search ? searchTags(search) : getAllTags(),
    search ? searchCategories(search) : getAllCategories(),
  ]);

  const { data: posts, headers } = postsResponse;
  const { total, totalPages } = headers;

  // Create pagination URL helper
  const createPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set("page", newPage.toString());
    if (category) params.set("category", category);
    if (author) params.set("author", author);
    if (tag) params.set("tag", tag);
    if (search) params.set("search", search);
    if (year) params.set("year", year);
    return `/posts${params.toString() ? `?${params.toString()}` : ""}`;
  };

  return (
    <Section>
      <Container>
        <div className="space-y-8">
          <Prose>
            <h1>{postsPage.title}</h1>
            <p className="text-muted-foreground">
              {total} {total === 1 ? "texto encontrado" : "textos encontrados"}
              {search && " que coinciden con tu búsqueda"}
            </p>
          </Prose>

          <div className="space-y-4">
            <SearchInput defaultValue={search} />

            <FilterPosts
              authors={authors}
              tags={tags}
              categories={categories}
              selectedAuthor={author}
              selectedTag={tag}
              selectedCategory={category}
              selectedYear={year}
            />
          </div>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {posts.map((post) => (
                <PostCard key={post.title.rendered} post={post} />
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
        </div>
      </Container>
    </Section>
  );
}
