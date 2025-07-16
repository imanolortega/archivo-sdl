"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Author {
  id: number;
  name: string;
}
interface Tag {
  id: number;
  name: string;
}
interface Category {
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
  selectedYear?: string;
}

export function FilterPosts({
  authors,
  categories,
  selectedAuthor,
  selectedCategory,
  selectedYear,
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
    <div className="grid md:grid-cols-4 gap-2 my-4 !z-10">
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
              )}
            </>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedYear || "all"}
        onValueChange={(value) => handleFilterChange("year", value)}
      >
        <SelectTrigger className="text-center">
          <SelectValue placeholder="Todos los años" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los años</SelectItem>
          {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016].map(
            (year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={handleResetFilters}>
        Quitar filtros
      </Button>
    </div>
  );
}
