import { getAllAuthors } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import { Metadata } from "next";
import BackButton from "@/components/back";
import Link from "next/link";
import { authorsPage } from "@/lib/content";

export const metadata: Metadata = {
  title: authorsPage.title,
  description: authorsPage.description,
  alternates: {
    canonical: authorsPage.canonical,
  },
};

export default async function Page() {
  const authors = await getAllAuthors();

  return (
    <Section>
      <Container className="space-y-6">
        <Prose className="mb-8">
          <h2>{authorsPage.title}</h2>
          <p>
            {authorsPage.description}
          </p>
          <ul className="grid">
            {authors.map((author: any) => (
              <>
                {author.id === 20 && (
                  <li key={author.id}>
                    <Link href={`/posts/?author=${author.id}`}>
                      {author.name}
                    </Link>
                  </li>
                )}
              </>
            ))}
          </ul>
        </Prose>
        <BackButton />
      </Container>
    </Section>
  );
}
