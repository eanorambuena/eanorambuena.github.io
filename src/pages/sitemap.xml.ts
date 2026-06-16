import type { APIRoute } from 'astro'

const site = 'https://eanorambuena.github.io'

const pages = [
  { loc: '/', priority: '1.0' },
  { loc: '/news/', priority: '0.9' },
  { loc: '/buy-me-a-coffee/', priority: '0.6' },
  { loc: '/projects/neuralworks/', priority: '0.8' },
  { loc: '/projects/smartlokus/', priority: '0.8' },
  { loc: '/projects/loopaas/', priority: '0.8' },
  { loc: '/projects/kalmate/', priority: '0.8' },
]

export const GET: APIRoute = async () => {
  const lastmod = new Date().toISOString().split('T')[0]

  const urls = pages.map(
    (p) => `  <url>
    <loc>${site}${p.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  ).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
      'Cache-Control': 'max-age=3600',
    },
  })
}
