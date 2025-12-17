import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = site
    ? `${site.toString()}sitemap.xml`
    : 'https://botanico-landing-page.vercel.app/sitemap.xml';

  const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${sitemapUrl}
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
