// Craft Imports
import { Section, Container, Prose } from "@/components/craft";
import Balancer from "react-wrap-balancer";

// Next.js Imports
import Link from "next/link";

// Icons
import { File, Pen, Tag, Diamond, User, Folder } from "lucide-react";
import { WordPressIcon } from "@/components/icons/wordpress";
import { NextJsIcon } from "@/components/icons/nextjs";

// This page is using the craft.tsx component and design system
export default function Home() {
  return (
    <Section>
      <Container>
        <ToDelete />
      </Container>
    </Section>
  );
}

// This is just some example TSX
const ToDelete = () => {
  return (
    <main className="space-y-12">
      <Prose>
        <h1 className="mb-12">
          <Balancer>Archivo Subida de Línea</Balancer>
        </h1>

        <p>
          Subida de Línea es una revista digital de crónicas, ensayos, entrevistas, poesía, cuentos y relatos de ficción. Desde el año 2016 proponemos una forma de hacer periodismo centrada en las personas, sus historias y sus derechos.
        </p>
      </Prose>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts"
        >
          <Pen size={32} />
          <span>
            Artículos{" "}
            <span className="block text-sm text-muted-foreground mt-4">
              Todos los textos de Subida de Línea
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/pages"
        >
          <File size={32} />
          <span className="space-y-4">
            Musa: el nombre del miedo{" "}
            <span className="block text-sm text-muted-foreground mt-4">
              Crónicas en serie sobre Musa Azar
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts/authors"
        >
          <User size={32} />
          <span className="space-y-4">
            Autores{" "}
            <span className="block text-sm text-muted-foreground mt-4">
              Todos los autores de Subida de Línea
            </span>
          </span>
        </Link>
      </div>
    </main>
  );
};
