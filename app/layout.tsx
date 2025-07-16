import './globals.css';

import { Button } from '@/components/ui/button';
import { MobileNav } from '@/components/nav/mobile-nav';
import { Section, Container } from '@/components/craft';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ThemeToggle } from '@/components/theme/theme-toggle';

import { cn } from '@/lib/utils';
import { mainMenu, bottomMenu } from '@/lib/menu.config';
import { siteConfig } from '@/lib/site.config';
import Logo from '@/public/logo-subida-de-linea.webp';

import { Analytics } from '@vercel/analytics/react';
import { GoogleTagManager } from '@next/third-parties/google';
import { Manrope as FontSans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ScrollToTopButton } from '@/components/scroll-top/scroll-top';

const font = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const siteTitle = `${siteConfig.site_name} | Subida de Línea`;

export const metadata: Metadata = {
  title: siteTitle,
  description:
    'Somos Subida de Línea, una revista digital de crónicas, ensayos, entrevistas, poesía, cuentos y relatos de ficción.',
  metadataBase: new URL(siteConfig.site_domain),
  alternates: {
    canonical: siteConfig.site_domain,
  },
  openGraph: {
    title: siteTitle,
    description: siteConfig.site_description,
    type: 'website',
    url: siteConfig.site_domain,
    images: [
      {
        url: `${siteConfig.site_domain}/subida-og.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.site_name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteConfig.site_description,
    images: [`${siteConfig.site_domain}/subida-og.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn('min-h-screen font-sans antialiased', font.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
        <GoogleTagManager gtmId="G-WP9LGLMDF0" />
        <ScrollToTopButton />
      </body>
    </html>
  );
}

const Nav = ({ className, children, id }: NavProps) => {
  return (
    <nav
      className={cn(
        'sticky z-50 top-0 bg-accent/30',
        'border-b',
        'backdrop-blur-md',
        className,
      )}
      id={id}
    >
      <div
        id="nav-container"
        className="max-w-6xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
      >
        <Link
          className="hover:opacity-75 transition-all flex gap-3 items-center logo"
          href="/"
        >
          <Image
            src={Logo}
            alt="Logo Subida de Línea"
            loading="eager"
            width={40}
            height={26.44}
          ></Image>
          <h2 className="logo">{siteConfig.site_name}</h2>
        </Link>
        {children}
        <div className="flex items-center gap-2">
          <div className="mx-2 hidden md:flex">
            {Object.entries(mainMenu).map(([key, href]) => (
              <Button
                className="font-bold"
                key={href}
                asChild
                variant="ghost"
                size="sm"
              >
                <Link href={href}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              </Button>
            ))}
          </div>
          <Button
            asChild
            className="bg-subida-pink-foreground hover:bg-subida-pink hidden sm:flex text-white font-bold"
          >
            <Link href="/pages/apoyar">Apoyar</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer>
      <Section>
        <Container className="border-t grid md:grid-cols-[1.5fr_0.5fr] gap-12">
          <div className="hidden md:flex items-center not-prose">
            <Link href="/">
              <Image
                src={Logo}
                alt="Logo Subida de Línea"
                width={42}
                height={26.44}
              ></Image>
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-sm sm:text-right">
            <h5 className="font-medium text-base">Sitio web</h5>
            {Object.entries(bottomMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
        </Container>
        <Container className="border-t not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          <ThemeToggle />
          <p className="text-muted-foreground">
            &copy; <a href="https:imanolortega.dev">{siteConfig.site_name}</a>.
            2016-2025
          </p>
        </Container>
      </Section>
    </footer>
  );
};
