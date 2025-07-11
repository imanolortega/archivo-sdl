# Archivo SDL

Sitio web basado en Next.js, Tailwind CSS y WordPress como headless CMS.

## 🚀 Tecnologías principales

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [WordPress Headless](https://developer.wordpress.org/rest-api/)
- [Zod](https://zod.dev/) para validaciones
- [React Hook Form](https://react-hook-form.com/) para formularios

## 🧪 Scripts disponibles

En el directorio del proyecto podés correr:

### `pnpm dev`

Inicia el servidor de desarrollo en [`http://localhost:3000`](http://localhost:3000).

### `pnpm build`

Compila la app para producción.

### `pnpm start`

Inicia la aplicación en modo producción. Es necesario ejecutar `pnpm build` previamente.

### `pnpm lint`

Ejecuta ESLint para verificar el código fuente.

## 🛠️ Configuración del entorno

El archivo `.env.local` debe contener al menos las siguientes variables:

```env
WORDPRESS_URL="https://slateblue-rabbit-150567.hostingersite.com"
WORDPRESS_HOSTNAME="slateblue-rabbit-150567.hostingersite.com"
```