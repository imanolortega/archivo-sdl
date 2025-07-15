import {
  BookOpenText,
  File,
  User,
} from "lucide-react"

const homePage = {
  title: "Archivo Subida de Línea",
  description: "Subida de Línea es una revista digital de crónicas, ensayos, entrevistas, poesía, cuentos y relatos de ficción. Desde el año 2016 proponemos una forma de hacer periodismo centrada en las personas, sus historias y sus derechos.",
  canonical: "/",
}

const featureContent = [
  {
    title: "Capítulo 1: Mirar en silencio",
    href: "/posts/capitulo-1-mirar-en-silencio",
    image: "/feature-content/portada-musa-capitulo-1.webp",
  },
  {
    title: "Capítulo 2: Aprender a cazar",
    href: "/posts/musa-el-nombre-del-miedo-capitulo-2-aprender-a-cazar",
    image: "/feature-content/portada-musa-capitulo-2.webp",
  },
  {
    title: "Capítulo 3: Presas",
    href: "/posts/musa-el-nombre-del-miedo-capitulo-3-presas",
    image: "/feature-content/portada-musa-capitulo-3.webp",
  },
  {
    title: "Capítulo 4: Peronistas",
    href: "/posts/musa-el-nombre-del-miedo-capitulo-4-peronistas",
    image: "/feature-content/portada-musa-capitulo-4.webp",
  },
  {
    title: "Capítulo 5: El golpe",
    href: "/posts/musa-el-nombre-del-miedo-capitulo-5-el-golpe",
    image: "/feature-content/portada-musa-capitulo-5.webp",
  },
  {
    title: "Capítulo 6: Banqueros, policías y cuatreros",
    href: "/posts/musa-el-nombre-del-miedo-capitulo-6-baqueros-policias-y-cuatreros",
    image: "/feature-content/portada-musa-capitulo-6.webp",
  },
  {
    title: "Capítulo 7: Borrar las huellas",
    href: "/posts/musa-el-nombre-del-miedo-capitulo-7-borrar-las-huellas",
    image: "/feature-content/portada-musa-capitulo-7.webp",
  },
  {
    title: "Capítulo 8: Todas las culpas",
    href: "/posts/musa-el-nombre-del-miedo-capitulo-8-todas-las-culpas",
    image: "/feature-content/portada-musa-capitulo-8.webp",
  },
];

const authorsPage = {
  title: "Todos los autores",
  description: "Explora todos los autores de nuestros textos",
  canonical: "/posts/authors",
}

const postsPage = {
  title: "Todos los textos",
  description: "Explora todos los texts de Subida de Línea",
  canonical: "/posts",
}

const featurePost = {
  title: "Musa: el nombre del miedo",
  description: "Crónicas en serie sobre Musa Azar por Ernesto Picco y Marcelo Argañaraz.",
  canonical: "/pages/musa-el-nombre-del-miedo",
}

const socialMediaToShare = [
  {
    alt: 'Compartir en Facebook',
    url: 'https://www.facebook.com/sharer/sharer.php?u=',
    icon: 'facebook',
  },
  {
    alt: 'Compartir en X',
    url: 'https://twitter.com/intent/tweet?url=',
    icon: 'x',
  },
  {
    alt: 'Compartir en WhatsApp',
    url: 'https://api.whatsapp.com/send?text=',
    icon: 'whatsapp',
  },
]

const gridMainContent = [
  {
    title: "Textos",
    description: "Todos los textos de Subida de Línea",
    href: "/posts",
    icon: File,
  },
  {
    title: "Autores",
    description: "Todos los autores de Subida de Línea",
    href: "/posts/authors",
    icon: User,
  },
  {
    title: "Sobre nosotros",
    description: "Qué es Subida de Línea",
    href: "/pages/nosotros",
    icon: BookOpenText,
  },
]

export {
  authorsPage,
  featureContent,
  featurePost,
  gridMainContent,
  homePage,
  postsPage,
  socialMediaToShare,
}