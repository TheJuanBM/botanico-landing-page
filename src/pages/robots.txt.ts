import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site?.toString() || 'https://hotelbotanicocaucasia.com/';
  const sitemapUrl = `${baseUrl}sitemap.xml`;

  const robotsTxt = `# Hotel Botánico - robots.txt
# https://hotelbotanicocaucasia.com

User-agent: *
Allow: /

# Bloquear páginas con contenido dinámico/parámetros
Disallow: /reservar?*

# Bloquear assets internos
Disallow: /_assets/

# Sitemap
Sitemap: ${sitemapUrl}
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
