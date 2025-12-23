import type { APIRoute } from 'astro';

// Páginas públicas indexables del sitio
// Nota: /reservar está excluida porque tiene noindex (contenido dinámico)
const pages = [
  { url: '', changefreq: 'weekly', priority: 1.0 },
  { url: 'habitaciones', changefreq: 'weekly', priority: 0.9 },
  { url: 'mito', changefreq: 'weekly', priority: 0.8 },
  { url: 'galeria', changefreq: 'monthly', priority: 0.7 },
  { url: 'contacto', changefreq: 'monthly', priority: 0.8 },
];

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString() || 'https://www.hotelbotanicocaucasia.com';

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
