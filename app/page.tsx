import { Section, Container, Prose } from "@/components/craft";
import Balancer from "react-wrap-balancer";

import Link from "next/link";

import { gridMainContent, main } from "@/lib/content";

export default function Home() {
  return (
    <Section>
      <Container>
        <Main />
      </Container>
    </Section>
  );
}

const Main = () => {
  return (
    <main className="space-y-12">
      <Prose>
        <h1 className="mb-12">
          Archivo <Balancer>Subida de Línea</Balancer>
        </h1>

        <p>
          {main.description}
        </p>
      </Prose>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {
          gridMainContent.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
            >
              <item.icon size={32} />
              <span>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="block text-sm text-muted-foreground mt-4">{item.description}</p>
              </span>

            </Link>
        ))}
      </div>
    </main>
  );
};
