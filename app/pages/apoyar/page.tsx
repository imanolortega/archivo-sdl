import { Section, Container, Prose } from '@/components/craft';
import { sponsoredBtn } from '@/lib/content.config';
import Balancer from 'react-wrap-balancer';

export default async function AboutUs() {
  return (
    <main>
      <Section className="pb-0 md:pb-0">
        <Container>
          <div>
            <Prose>
              <h1 className="mb-12">
                <Balancer>Bancar nuestro proyecto</Balancer>
              </h1>
              <p className="max-w-prose">
                Las contribuciones a voluntad nos permiten reducir los gastos
                por parte del equipo e invertir en contenidos.
                <br />
                <br />
                Si te gusta lo que hacemos y tienes la posibilidad de hacerlo,
                puedes apoyarnos con una contribución y ser parte de este
                proyecto autogestionado.
              </p>
            </Prose>
          </div>
          <div
            className="mt-12"
            dangerouslySetInnerHTML={{ __html: sponsoredBtn }}
          ></div>
        </Container>
      </Section>
    </main>
  );
}
