import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../config/site';

export const GET: APIRoute = async () => {
  const articles = await getCollection('journal', ({ data }) => !data.draft);

  const staticPages = [
    '',
    '/products',
    '/services',
    '/lab',
    '/journal',
    '/studio',
    '/contact',
    '/privacy',
    '/terms'
  ];

  const articleUrls = articles.map((a) => `/journal/${a.id}`);

  const allUrls = [...staticPages, ...articleUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${siteConfig.url}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === '' ? '1.0' : url.startsWith('/services') || url.startsWith('/products') ? '0.9' : '0.7'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
