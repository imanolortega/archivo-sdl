"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Ensure this is the correct import path
import { Button } from "@/components/ui/button"; // Add this import for the Button component

export interface Author {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface FilterPostsProps {
  authors: Author[];
  tags: Tag[];
  categories: Category[];
  selectedAuthor?: string;
  selectedTag?: string;
  selectedCategory?: string;
}

export function FilterPosts({
  authors,
  categories,
  selectedAuthor,
  selectedCategory,
}: FilterPostsProps) {
  const router = useRouter();

  const handleFilterChange = (type: string, value: string) => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.delete("page");
    value === "all" ? newParams.delete(type) : newParams.set(type, value);

    router.push(`/posts?${newParams.toString()}`);
  };

  const handleResetFilters = () => {
    router.push("/posts");
  };

  const hasCategories = categories.length > 0;
  const hasAuthors = authors.length > 0;

  return (
    <div className="grid md:grid-cols-[1.25fr_1.25fr_0.5fr] gap-2 my-4 !z-10">
      <Select
        value={selectedCategory || "all"}
        onValueChange={(value) => handleFilterChange("category", value)}
      >
        <SelectTrigger disabled={!hasCategories}>
          {hasCategories ? (
            <SelectValue placeholder="All Categories" />
          ) : (
            "No categories found"
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorías</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedAuthor || "all"}
        onValueChange={(value) => handleFilterChange("author", value)}
      >
        <SelectTrigger disabled={!hasAuthors} className="text-center">
          {hasAuthors ? (
            <SelectValue placeholder="All Authors" />
          ) : (
            "No authors found"
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los autores</SelectItem>
          {authors.map((author) => (
            <>
            {author.id === 20 && (
              <SelectItem key={author.id} value={author.id.toString()}>
              {author.name}
            </SelectItem>
            )}</>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={handleResetFilters}>
        Quitar filtros
      </Button>
    </div>
  );
}
