import { Section, Container, Prose } from "@/components/craft";
import Balancer from "react-wrap-balancer";

export default async function AboutUs() {
  return (
    <main>
      <Section className="pb-0 md:pb-0">
        <Container>
          <div className="space-y-16">
            <Prose>
              <h1 className="mb-12">
                <Balancer>Periodismo Humano</Balancer>
              </h1>
              <p className="max-w-prose">
                Somos una revista digital de crónicas, ensayos y entrevistas que
                trabaja con rigor periodístico, usando las herramientas de la
                literatura.
                <br />
                <br />
                Pero no es todo, también publicamos poesía, cuentos y relatos de
                ficción. Desde el año 2016 proponemos una forma de hacer
                periodismo centrada en las personas, sus historias y sus
                derechos. Un periodismo cercano, más humano. Creemos en las
                preguntas, dudas e historias como motores de indagación
                constante. Las celebramos. Nos guían las preguntas fundamentales
                del periodismo (qué, como, cuando, donde y quién) y defendemos
                la postura de reformularlas continuamente.
                <br />
                <br />
                Nuestros textos son escritos por un amplio abanico de personas:
                estudiantes, profesores, investigadores, académicos,
                periodistas, historiadores y muchas personas más. El objetivo es
                ser un espacio donde se entrecrucen y dialoguen personas de los
                ámbitos más diversos, respetando los criterios de las
                publicaciones periodísticas. En Santiago del Estero, en
                Argentina, a lo largo de nuestro país hay todavía muchas
                historias sin contar. Escenarios, voces y protagonistas sin
                lugar para decir.
                <br />
                <br />
                Los contextos locales, históricos,
                socioeconómicos y políticos merecen la presencia de alguien
                capaz de contar su historia, de dar un espacio para que ellas
                mismas lo hagan y tener la posibilidad de entender sus
                circunstancias. Su parte de la historia y el mundo. En Subida de
                Línea, apostamos a la calidad periodística y de investigación; a
                las personas y sus historias.
              </p>
            </Prose>
          </div>
        </Container>
      </Section>
    </main>
  );
}
