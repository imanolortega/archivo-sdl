import * as React from "react";
import Image from "next/image";

import { Section, Container, Prose } from "@/components/craft";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Balancer from "react-wrap-balancer";
import { featureContent, featurePost } from "@/lib/content.config";
import Link from "next/link";

const FeatureContent = () => {
  return (
    <Section className="md:p-4 bg-accent/65 dark:bg-accent/20 md:pb-6 pb-6">
      <Container>
        <Prose className="pb-0 sm:pb-0 mt-3">
          <h2 className="mb-4">
            Musa: <Balancer>el nombre del miedo</Balancer>
          </h2>
          <p className="!m-0">{featurePost.description}</p>
        </Prose>
      </Container>
      <Container className="pt-0 md:pt-4 md:p-4">
        <Carousel className="w-full mt-0 pt-0">
          <CarouselContent className="-ml-1">
            {featureContent.map((slide) => (
              <CarouselItem key={slide.title} className="pl-1">
                <Link href={slide.href} className="p-1">
                  <Card className="relative overflow-hidden">
                    <div className="p-8 absolute bottom-0 z-50 bg-transparent">
                      <h3 className="md:text-3xl text-2xl md:font-semibold text-white">
                        <Balancer>{slide.title}</Balancer>
                      </h3>
                    </div>
                    <CardContent className="not-prose flex w-full h-[28rem] items-center justify-center brightness-[0.6]">
                      <Image
                        loading="eager"
                        placeholder="blur"
                        blurDataURL="/subida-article-placeholder.webp"
                        src={slide.image}
                        alt={slide.title}
                        width={720}
                        height={300}
                        className="absolute inset-0 object-cover h-full w-full"
                      ></Image>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </Container>
    </Section>
  );
};

export default FeatureContent;
