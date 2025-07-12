import { File, Pen, User } from "lucide-react"

const homePage = {
  title: "Archivo Subida de Línea",
  description: "Subida de Línea es una revista digital de crónicas, ensayos, entrevistas, poesía, cuentos y relatos de ficción. Desde el año 2016 proponemos una forma de hacer periodismo centrada en las personas, sus historias y sus derechos.",
  canonical: "/",
}

const authorsPage = {
  title: "Todos los autores",
  description: "Explora todos los autores de nuestros artículos",
  canonical: "/posts/authors",
}

const topPost = {
  title: "Musa: el nombre del miedo",
  description: "Crónicas en serie sobre Musa Azar",
  canonical: "/pages/musa-el-nombre-del-miedo",
}

const gridMainContent = [
  {
    title: topPost.title,
    description: topPost.description,
    href: topPost.canonical,
    icon: File,
  },
  {
    title: "Textos",
    description: "Todos los textos de Subida de Línea",
    href: "/posts",
    icon: Pen,
  },
  {
    title: "Autores",
    description: "Todos los autores de Subida de Línea",
    href: "/posts/authors",
    icon: User,
  },
]

export { homePage, authorsPage, topPost, gridMainContent }