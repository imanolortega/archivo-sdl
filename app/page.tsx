import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/posts/post-card';
import { Section, Container, Prose } from '@/components/craft';
import Balancer from 'react-wrap-balancer';

import Link from 'next/link';

import { getPostsPaginated } from '@/lib/wordpress';
import { gridMainContent, homePage } from '@/lib/content.config';
import FeatureContent from '@/components/feature-content/feature-content';

export const dynamic = 'auto';
export const revalidate = 600;

export default async function Home() {
  const postsPerPage = 6;

  const [postsResponse] = await Promise.all([
    getPostsPaginated(1, postsPerPage),
  ]);

  const { data: posts } = postsResponse;

  return (
    <main>
      <Section className="pb-0 md:pb-0">
        <Container>
          <div className="space-y-16">
            <Prose>
              <h1 className="mb-16 !text-4xl sm:!text-5xl">
                Archivo{' '}
                <Balancer className="text-subida-pink-foreground dark:text-subida-violet-foreground">
                  Subida de Línea
                </Balancer>
              </h1>
              <p>{homePage.description}</p>
            </Prose>
          </div>
        </Container>
      </Section>

      <Section className="">
        <Container className="grid md:grid-cols-3 gap-4">
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

      <FeatureContent />

      <Section id="last-articles">
        <Container>
          <Prose>
            <h2 className="mb-12">Textos</h2>
          </Prose>
          <div className="space-y-6">
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
            <div className="flex items-center justify-center py-6">
              <Button
                asChild
                className="bg-subida-pink-foreground hover:bg-subida-pink flex text-white font-bold"
              >
                <Link href="/posts">Ver más textos</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
