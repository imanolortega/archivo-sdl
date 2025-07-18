import {
  getAllPostSlugs,
  getCategoryById,
  getFeaturedMediaById,
  getPostBySlug,
  getPostsPaginated,
} from '@/lib/wordpress';

import { AsidePostCard } from '@/components/article/aside-post-card';
import { Section, Container, Article, Prose } from '@/components/craft';

import { siteConfig } from '@/lib/site.config';
import { socialMediaToShare } from '@/lib/content.config';

import { FacebookIcon } from '@/components/icons/facebook';
import { WhatsAppIcon } from '@/components/icons/whatsapp';
import { XIcon } from '@/components/icons/x';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import ArticleHeader from '@/components/article/article-header';

export async function generateStaticParams() {
  return await getAllPostSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    console.error('Error al obtener el post:', error);
    return notFound();
  }

  if (!post) {
    return notFound();
  }

  const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
  ogUrl.searchParams.append('title', post.title.rendered);
  // Strip HTML tags for description
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
  ogUrl.searchParams.append('description', description);

  return {
    title: `${post.title.rendered} | ${siteConfig.site_name}`,
    description: description,
    openGraph: {
      title: `${post.title.rendered} | ${siteConfig.site_name}`,
      description: description,
      type: 'article',
      url: `${siteConfig.site_domain}/posts/${post.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title.rendered,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title.rendered,
      description: description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const featuredMedia = post?.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
  const category = await getCategoryById(post?.categories[0]);

  function removeInlineStyles(html: string): string {
    return html.replace(/style="[^"]*"/g, '');
  }

  const postsPerPage = 3;
  const [postsResponse] = await Promise.all([
    getPostsPaginated(1, postsPerPage, { exclude: [post.id] }),
  ]);
  const { data: posts } = postsResponse;

  const iconColor = 'text-accent-foreground/90 hover:text-accent-foreground';
  const iconSize = 24;
  const socialIcons: Record<string, JSX.Element> = {
    facebook: (
      <FacebookIcon className={iconColor} width={iconSize} height={iconSize} />
    ),
    x: <XIcon className={iconColor} width={iconSize} height={iconSize} />,
    whatsapp: (
      <WhatsAppIcon className={iconColor} width={iconSize} height={iconSize} />
    ),
  };

  return (
    <Section>
      <Container>
        <ArticleHeader
          post={post}
          category={category}
          featuredMedia={featuredMedia}
        />

        <Container className="py-4 sm:py-8 px-0 sm:px-0 grid grid-cols-3 max-w-fit m-0 mb-2 gap-4">
          {socialMediaToShare.map((social) => (
            <Link
              key={social.alt}
              href={`${social.url}${encodeURIComponent(
                `${siteConfig.site_domain}/posts/${post.slug}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm"
            >
              {socialIcons[social.icon]}
            </Link>
          ))}
        </Container>

        <div className="flex gap-12">
          <div className="w-full lg:w-2/3">
            <Article
              dangerouslySetInnerHTML={{
                __html: removeInlineStyles(post.content.rendered),
              }}
            />
          </div>

          <aside className="hidden lg:block w-1/3 sticky top-24 self-start h-fit px-4">
            <div className="pb-8">
              <h2 className="text-2xl font-bold">Últimos textos</h2>
            </div>
            <div className="space-y-4">
              {posts.map((post) => (
                <AsidePostCard key={post.id} post={post} />
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
