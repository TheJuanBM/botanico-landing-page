import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site?.toString() || 'https://www.hotelbotanicocaucasia.com/';
  const sitemapUrl = `${baseUrl}sitemap.xml`;

  const robotsTxt = `# Hotel Botánico - robots.txt
# https://www.hotelbotanicocaucasia.com

User-agent: *
Allow: /

# Bloquear páginas con contenido dinámico/parámetros
Disallow: /reservar?*

# Bloquear assets internos
Disallow: /_assets/

# Sitemap
Sitemap: ${sitemapUrl}

# Crawl delay para bots agresivos
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

User-agent: MJ12bot
Crawl-delay: 10
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
