"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { SearchInput } from "@/components/posts/search-input";
import { Author, Category, FilterPosts, Tag } from "@/components/posts/filter";
import {
  searchAuthors,
  searchTags,
  searchCategories,
  getAllAuthors,
  getAllTags,
  getAllCategories,
} from "@/lib/wordpress";
import { useEffect, useState } from "react";

interface PostSearchProps {
  initialSearch?: string;
  initialAuthor?: string;
  initialTag?: string;
  initialCategory?: string;
  onFilterChange?: () => void;
}

export function PostSearch({
  initialSearch,
  initialAuthor,
  initialTag,
  initialCategory,
}: PostSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const search = initialSearch || "";
  const [authors, setAuthors] = useState<Author[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        const [authorRes, tagRes, categoryRes] = await Promise.all([
          searchAuthors(search),
          searchTags(search),
          searchCategories(search),
        ]);
        setAuthors(authorRes);
        setTags(tagRes);
        setCategories(categoryRes);
      } else {
        const [authorRes, tagRes, categoryRes] = await Promise.all([
          getAllAuthors(),
          getAllTags(),
          getAllCategories(),
        ]);
        setAuthors(authorRes);
        setTags(tagRes);
        setCategories(categoryRes);
      }
    };

    fetchData();
  }, [search]);

  const updateParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    startTransition(() => {
      router.push(`/posts?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-4">
      <SearchInput
        defaultValue={search}
      />

      <FilterPosts
        authors={authors}
        tags={tags}
        categories={categories}
        selectedAuthor={initialAuthor}
        selectedTag={initialTag}
        selectedCategory={initialCategory}
      />
    </div>
  );
}
