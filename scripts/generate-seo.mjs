import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, 'dist');
const PUBLIC_DIR = path.join(ROOT, 'public');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const SITE_URL = 'https://kanakoding.com';
const TODAY = new Date().toISOString().split('T')[0];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: normalized.trim() };

  const frontmatterBlock = match[1];
  const content = match[2].trim();
  const data = {};

  for (const line of frontmatterBlock.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      try {
        data[key] = JSON.parse(val);
      } catch {
        data[key] = val
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean);
      }
    } else if (val === 'true' || val === 'false') {
      data[key] = val === 'true';
    } else {
      data[key] = val.replace(/^["']|["']$/g, '');
    }
  }
  return { data, content };
}

function markdownToSemanticHtml(md) {
  const blocks = md.replace(/\r\n/g, '\n').split(/\n\n+/);
  return blocks
    .map((b) => {
      const trimmed = b.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('```')) {
        const code = trimmed.split('\n').slice(1, -1).join('\n');
        return `<pre><code>${escapeHtml(code)}</code></pre>`;
      }
      if (trimmed.startsWith('## ')) {
        return `<h2>${escapeHtml(trimmed.slice(3).trim())}</h2>`;
      }
      if (trimmed.startsWith('### ')) {
        return `<h3>${escapeHtml(trimmed.slice(4).trim())}</h3>`;
      }
      const lines = trimmed.split('\n');
      if (lines.every((l) => l.trim().startsWith('- ') || /^\d+\.\s/.test(l.trim()))) {
        const items = lines
          .map((l) => `<li>${escapeHtml(l.trim().replace(/^(-|\d+\.)\s+/, ''))}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${escapeHtml(trimmed)}</p>`;
    })
    .join('\n');
}

const mdFiles = fs
  .readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith('.md'))
  .sort();

const posts = mdFiles.map((file) => {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
  const { data, content } = parseFrontmatter(raw);
  return {
    title: String(data.title ?? 'Untitled'),
    slug: String(data.slug ?? ''),
    excerpt: String(data.excerpt ?? ''),
    category: String(data.category ?? 'Umum'),
    date: String(data.date ?? ''),
    readTime: String(data.readTime ?? '5 menit baca'),
    author: String(data.author ?? 'Tim KanaKoding'),
    authorRole: String(data.authorRole ?? 'Editor'),
    coverImage: String(data.coverImage ?? '/assets/img/bg_kanakoding.png'),
    tags: Array.isArray(data.tags) ? data.tags : [],
    content,
  };
});

// 1. Build sitemap.xml
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/portofolio', priority: '0.8', changefreq: 'weekly' },
  { path: '/privasi', priority: '0.5', changefreq: 'monthly' },
  { path: '/tos', priority: '0.5', changefreq: 'monthly' },
  { path: '/disclaimer', priority: '0.5', changefreq: 'monthly' },
];

const urlEntries = [
  ...staticRoutes.map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  ),
  ...posts.map(
    (p) => `  <url>
    <loc>${SITE_URL}/blog/${p.slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  ),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
if (fs.existsSync(DIST_DIR)) {
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
}

// 2. Pre-render route HTML files in dist/ so crawlers get full content & metadata on initial GET
if (fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
  const baseHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');

  const navLinksHtml = `<nav aria-label="Navigasi Utama"><a href="/">Beranda</a> | <a href="/portofolio">Portofolio</a> | <a href="/blog">Jurnal &amp; Blog</a> | <a href="/privasi">Kebijakan Privasi</a> | <a href="/tos">Syarat &amp; Ketentuan</a> | <a href="/disclaimer">Disclaimer</a></nav>`;

  function buildPageHtml({ title, description, canonicalPath, ogType = 'website', jsonLd, bodyHtml }) {
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    let html = baseHtml
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
      .replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
        `<meta name="description" content="${escapeHtml(description)}" />\n    <link rel="canonical" href="${canonicalUrl}" />\n    <meta property="og:title" content="${escapeHtml(title)}" />\n    <meta property="og:description" content="${escapeHtml(description)}" />\n    <meta property="og:type" content="${ogType}" />\n    <meta property="og:url" content="${canonicalUrl}" />${
          jsonLd
            ? `\n    <script id="kanakoding-jsonld" type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
            : ''
        }`
      )
      .replace(
        '<div id="root"></div>',
        `<div id="root"><main>${navLinksHtml}${bodyHtml}</main></div>`
      );
    return html;
  }

  function writeRouteHtml(routePath, pageOpts) {
    const html = buildPageHtml(pageOpts);
    if (routePath === '/') {
      fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html, 'utf8');
      return;
    }
    const targetDir = path.join(DIST_DIR, ...routePath.split('/').filter(Boolean));
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  }

  const blogListItemsHtml = posts
    .map(
      (p) =>
        `<article><h2><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a></h2><p>${escapeHtml(
          p.excerpt
        )}</p><small>${escapeHtml(p.category)} — ${escapeHtml(p.date)} (${escapeHtml(
          p.readTime
        )})</small></article>`
    )
    .join('\n');

  // Homepage
  writeRouteHtml('/', {
    title: 'KanaKoding — Digitally Yours | Software House, Konsultan IT & Produk Digital',
    description:
      'KanaKoding adalah studio pengembangan produk digital, software house, dan konsultan arsitektur IT di Indonesia. Kami membangun website, aplikasi custom, integrasi API, serta berbagi panduan rekayasa perangkat lunak.',
    canonicalPath: '/',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'KanaKoding',
      url: SITE_URL,
      logo: `${SITE_URL}/assets/img/logo.png`,
      description:
        'Studio pengembangan produk digital, software house, dan ruang baca teknologi di Indonesia.',
    },
    bodyHtml: `<section><h1>KanaKoding — Digitally Yours | Software House &amp; Ruang Baca Teknologi</h1><p>KanaKoding adalah studio pengembangan produk digital dan teman diskusi teknologi. Kami meracik website, aplikasi bisnis, integrasi API (pembayaran QRIS/Virtual Account, merchant, sosial media), serta mendokumentasikan praktik terbaik rekayasa perangkat lunak dalam Bahasa Indonesia.</p><h2>Artikel &amp; Panduan Engineering Terbaru</h2>${blogListItemsHtml}</section>`,
  });

  // Blog index
  writeRouteHtml('/blog', {
    title: 'Catatan & Cerita Studio — KanaKoding (Digitally Yours)',
    description:
      'Kumpulan catatan seputar pembuatan produk digital, desain web modern, strategi MVP startup, keamanan sistem enterprise, dan panduan pemrograman berbahasa Indonesia oleh tim KanaKoding.',
    canonicalPath: '/blog',
    ogType: 'website',
    bodyHtml: `<section><h1>Jurnal &amp; Ruang Baca Rekayasa Perangkat Lunak KanaKoding</h1><p>Kumpulan studi kasus dan panduan teknis mendalam seputar pengembangan produk digital, arsitektur sistem, DevOps, dan bisnis teknologi.</p>${blogListItemsHtml}</section>`,
  });

  // Portfolio page
  writeRouteHtml('/portofolio', {
    title: 'Portofolio & Studi Kasus Produk Digital — KanaKoding',
    description:
      'Studi kasus dan karya nyata KanaKoding dalam merancang sistem enterprise, portal FinTech PT. Wannamas Multi Finance, direktori properti Lelang.co, dan platform web modern.',
    canonicalPath: '/portofolio',
    ogType: 'website',
    bodyHtml: `<section><h1>Portofolio &amp; Studi Kasus KanaKoding</h1><p>Berbagai kolaborasi pembuatan aplikasi web, sistem pembiayaan, marketplace lelang properti, dan modernisasi platform digital di Indonesia.</p></section>`,
  });

  // Legal pages
  writeRouteHtml('/privasi', {
    title: 'Kebijakan Privasi (Privacy Policy) — KanaKoding',
    description:
      'Kebijakan Privasi resmi KanaKoding mengenai pengumpulan, penggunaan, perlindungan data pribadi pengunjung, serta penggunaan cookie dan layanan periklanan pihak ketiga termasuk Google AdSense.',
    canonicalPath: '/privasi',
    ogType: 'website',
    bodyHtml: `<article><h1>Kebijakan Privasi KanaKoding</h1><p>Halaman ini menjelaskan bagaimana KanaKoding mengumpulkan, menggunakan, dan melindungi informasi pengunjung situs https://kanakoding.com serta kebijakan penggunaan cookie pihak ketiga termasuk Google AdSense (DoubleClick DART cookie).</p></article>`,
  });

  writeRouteHtml('/tos', {
    title: 'Syarat & Ketentuan Layanan (Terms of Service) — KanaKoding',
    description:
      'Syarat dan Ketentuan penggunaan situs web, artikel ruang baca, dan layanan konsultasi pengembangan perangkat lunak KanaKoding.',
    canonicalPath: '/tos',
    ogType: 'website',
    bodyHtml: `<article><h1>Syarat &amp; Ketentuan Layanan KanaKoding</h1><p>Ketentuan penggunaan situs, hak kekayaan intelektual atas konten artikel dan kode, serta batasan tanggung jawab layanan KanaKoding.</p></article>`,
  });

  writeRouteHtml('/disclaimer', {
    title: 'Disclaimer & Sanggahan Informasi — KanaKoding',
    description:
      'Sanggahan resmi mengenai tujuan edukasi artikel teknis, studi kasus bisnis, dan tautan pihak ketiga di situs KanaKoding.',
    canonicalPath: '/disclaimer',
    ogType: 'website',
    bodyHtml: `<article><h1>Disclaimer KanaKoding</h1><p>Seluruh artikel rekayasa perangkat lunak, simulasi bisnis, dan studi kasus di situs KanaKoding disajikan untuk tujuan informasi dan edukasi profesional.</p></article>`,
  });

  // Each blog post
  for (const post of posts) {
    const articleHtml = `<article><h1>${escapeHtml(post.title)}</h1><p><em>${escapeHtml(
      post.category
    )} · ${escapeHtml(post.date)} · ${escapeHtml(post.readTime)} · Oleh ${escapeHtml(
      post.author
    )} (${escapeHtml(post.authorRole)})</em></p><p>${escapeHtml(
      post.excerpt
    )}</p>${markdownToSemanticHtml(post.content)}</article>`;

    writeRouteHtml(`/blog/${post.slug}`, {
      title: `${post.title} — Jurnal KanaKoding`,
      description: post.excerpt,
      canonicalPath: `/blog/${post.slug}`,
      ogType: 'article',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: post.title,
        description: post.excerpt,
        image: `${SITE_URL}${post.coverImage}`,
        author: {
          '@type': 'Organization',
          name: post.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'KanaKoding',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/assets/img/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/blog/${post.slug}`,
        },
      },
      bodyHtml: articleHtml,
    });
  }
}

console.log(`SEO generation complete: ${posts.length} blog posts + ${staticRoutes.length} static routes in sitemap.xml`);
