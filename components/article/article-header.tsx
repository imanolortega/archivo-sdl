import { badgeVariants } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Balancer from "react-wrap-balancer";

import Placeholder from '@/public/subida-article-placeholder.webp';

import { Prose } from '@/components/craft';

import Link from "next/link";
import Image from "next/image";
import { Category, FeaturedMedia, Post } from "@/lib/wordpress.d";

interface ArticleHeaderProps {
  post: Post;
  category: Category;
  featuredMedia?: FeaturedMedia | null;
}

export default function ArticleHeader({ category, featuredMedia, post }: ArticleHeaderProps) {
  const date = new Date(post.date).toLocaleDateString('es-AR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Prose>
      <h1>
        <Balancer>
          <span
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          ></span>
        </Balancer>
      </h1>
      <div className="flex justify-between items-center gap-4 text-sm mb-4">
        <p className="!text-sm text-muted-foreground !m-0">
          Publicado el {date}
        </p>
        <Link
          href={`/posts/?category=${category.id}`}
          className={cn(
            badgeVariants({ variant: "outline" }),
            "!no-underline",
            "px-4 py-2"
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
  );
}
