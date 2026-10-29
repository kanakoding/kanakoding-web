import React, { useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  User,
  ArrowRight,
  Share2,
  List,
  ShieldCheck,
} from 'lucide-react';
import { BLOG_POSTS, getBlogPostBySlug } from '../data/blogData';
import { ADSENSE_CONFIG, BRAND_INFO } from '../data/siteData';
import { AdUnit } from '../components/AdUnit';
import { updatePageSeo } from '../utils/seo';
import { smoothScrollToElement, smoothScrollToY } from '../utils/smoothScroll';

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function extractHeadings(markdown: string): { id: string; text: string }[] {
  const blocks = markdown.split(/\n\n+/);
  const headings: { id: string; text: string }[] = [];
  for (const block of blocks) {
    const trimmed = block.trim();
    if (trimmed.startsWith('## ')) {
      const text = trimmed.replace(/^##\s+/, '').trim();
      headings.push({ id: slugifyHeading(text), text });
    }
  }
  return headings;
}

function renderMarkdownBlocks(markdown: string) {
  const blocks = markdown.split(/\n\n+/);
  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('```')) {
      const lines = trimmed.split('\n');
      const codeContent = lines.slice(1, -1).join('\n');
      return (
        <pre
          key={index}
          className="my-5 p-4 sm:p-5 rounded-[8px] bg-[#100703] border border-white/15 overflow-x-auto text-xs sm:text-sm font-mono text-amber-200 leading-relaxed"
        >
          <code>{codeContent}</code>
        </pre>
      );
    }

    if (trimmed.startsWith('## ')) {
      const headingText = trimmed.replace(/^##\s+/, '').trim();
      const headingId = slugifyHeading(headingText);
      return (
        <h2
          id={headingId}
          key={index}
          className="text-xl sm:text-2xl font-bold text-white mt-9 mb-3 scroll-mt-28"
        >
          {headingText}
        </h2>
      );
    }

    if (trimmed.startsWith('### ')) {
      return (
        <h3
          key={index}
          className="text-lg sm:text-xl font-bold text-amber-300 mt-6 mb-2"
        >
          {trimmed.replace(/^###\s+/, '')}
        </h3>
      );
    }

    const lines = trimmed.split('\n');
    if (lines.every((l) => l.trim().startsWith('- ') || /^\d+\.\s/.test(l.trim()))) {
      return (
        <ul key={index} className="my-4 space-y-2.5 pl-5 list-disc text-[#E5D9CE]">
          {lines.map((line, i) => {
            const cleanLine = line.trim().replace(/^(-|\d+\.)\s+/, '');
            return (
              <li
                key={i}
                className="text-base leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: formatInlineMarkdown(cleanLine),
                }}
              />
            );
          })}
        </ul>
      );
    }

    return (
      <p
        key={index}
        className="text-base sm:text-lg text-[#D5C7B8] leading-relaxed my-4"
        dangerouslySetInnerHTML={{
          __html: formatInlineMarkdown(trimmed),
        }}
      />
    );
  });
}

function formatInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-amber-200 italic">$1</em>')
    .replace(
      /`(.+?)`/g,
      '<code class="px-1.5 py-0.5 rounded-[8px] bg-[#221109] text-amber-300 font-mono text-sm">$1</code>'
    );
}

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  const headings = useMemo(
    () => (post ? extractHeadings(post.content) : []),
    [post]
  );

  useEffect(() => {
    smoothScrollToY(0, 500);
    if (post) {
      updatePageSeo({
        title: `${post.title} — Jurnal ${BRAND_INFO.name}`,
        description: post.excerpt,
        canonicalPath: `/blog/${post.slug}`,
        ogType: 'article',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: post.title,
          description: post.excerpt,
          image: `https://kanakoding.com${post.coverImage}`,
          author: {
            '@type': 'Organization',
            name: post.author,
          },
          publisher: {
            '@type': 'Organization',
            name: BRAND_INFO.name,
            logo: {
              '@type': 'ImageObject',
              url: 'https://kanakoding.com/assets/img/logo.png',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://kanakoding.com/blog/${post.slug}`,
          },
        },
      });
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0F0704] text-[#F7F1EB] pt-36 pb-24 px-4 text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Artikel Tidak Ditemukan</h1>
        <p className="text-[#C7B6A6] text-sm">
          Maaf, artikel yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-sm font-bold bg-amber-500 text-[#1A0B05]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Jurnal</span>
        </Link>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0F0704] text-[#F7F1EB] pt-28 pb-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-xs font-mono text-[#A89482]"
        >
          <Link to="/" className="hover:text-amber-400 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-amber-400 transition-colors">
            Jurnal &amp; Blog
          </Link>
          <span>/</span>
          <span className="text-amber-400">{post.category}</span>
        </nav>

        <div className="space-y-5 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="px-3 py-1 rounded-[8px] bg-[#221109] text-amber-300 border border-amber-500/30">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#B5A392]">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#B5A392]">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-[clamp(1.85rem,3.8vw,3rem)] font-bold text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-[#C7B6A6] leading-relaxed">
            {post.excerpt}
          </p>

          <div className="pt-2 flex items-center justify-between border-y border-white/12 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[8px] bg-[#221109] border border-amber-500/30 flex items-center justify-center text-amber-300">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">{post.author}</div>
                <div className="text-xs text-[#B5A392]">{post.authorRole}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#180C06] hover:bg-[#221109] border border-white/12 text-xs text-[#E5D9CE] cursor-pointer"
              title="Salin Tautan Artikel"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Bagikan</span>
            </button>
          </div>
        </div>

        <div className="rounded-[8px] overflow-hidden border border-white/15 mb-8 bg-[#140904] max-h-[420px]">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full max-h-[420px] object-cover"
          />
        </div>

        {headings.length > 0 && (
          <nav
            aria-label="Daftar Isi Artikel"
            className="mb-8 p-5 sm:p-6 rounded-[8px] bg-[#140904] border border-white/15"
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-3">
              <List className="w-4 h-4" />
              <span>Daftar Isi Pembahasan</span>
            </div>
            <ol className="space-y-2 text-sm text-[#D5C7B8] list-decimal pl-5">
              {headings.map((h) => (
                <li key={h.id}>
                  <button
                    type="button"
                    onClick={() => smoothScrollToElement(h.id, 700)}
                    className="text-left hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {h.text}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <AdUnit
          slotId={ADSENSE_CONFIG.slots.blogInArticle}
          format="fluid"
          layout="in-article"
        />

        <div className="p-6 sm:p-10 rounded-[8px] bg-[#150A05] border border-white/15">
          {renderMarkdownBlocks(post.content)}

          <div className="mt-10 pt-6 border-t border-white/12 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#B5A392] mr-1">Topik:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-[8px] text-xs font-mono bg-[#1E0F08] border border-white/12 text-amber-300"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 p-6 rounded-[8px] bg-[#140904] border border-white/12 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-[8px] bg-[#F7F1EB] p-2 shrink-0 flex items-center justify-center">
            <img
              src="/assets/img/logo.png"
              alt={post.author}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-white">
                  Ditulis oleh {post.author}
                </h4>
                <span className="text-xs text-amber-400">{post.authorRole}</span>
              </div>
              <Link
                to="/disclaimer"
                className="inline-flex items-center gap-1 text-xs text-[#B5A392] hover:text-amber-400"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Terverifikasi secara Teknis</span>
              </Link>
            </div>
            <p className="text-xs text-[#B5A392] leading-relaxed">
              Tim Engineering &amp; Redaksi KanaKoding menyajikan panduan rekayasa perangkat
              lunak, arsitektur sistem, dan transformasi digital berdasarkan pengalaman
              implementasi proyek nyata di Indonesia.
            </p>
          </div>
        </div>

        <AdUnit
          slotId={ADSENSE_CONFIG.slots.blogBottomBanner}
          format="auto"
        />

        <div className="mt-8 p-6 sm:p-8 rounded-[8px] bg-[#160B06] border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">
              Ingin Menerapkan Arsitektur Ini pada Bisnis Anda?
            </h3>
            <p className="text-xs sm:text-sm text-[#C7B6A6]">
              Diskusikan kebutuhan pengembangan produk digital Anda bersama tim KanaKoding.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/#kontak')}
            className="px-5 py-3 rounded-[8px] text-xs sm:text-sm font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors shrink-0 cursor-pointer"
          >
            Konsultasi Sekarang
          </button>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-14 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Artikel Terkait</h3>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Semua Artikel</span>
              </Link>
            </div>
            <div className="border-y border-white/15 divide-y divide-white/15">
              {relatedPosts.map((rel, idx) => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                      <span>0{idx + 1}</span>
                      <span>/</span>
                      <span>{rel.category}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#C7B6A6] line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-amber-400 shrink-0">
                    Baca <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
