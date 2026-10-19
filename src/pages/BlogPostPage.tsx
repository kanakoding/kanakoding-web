import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  User,
  ArrowRight,
  Share2,
} from 'lucide-react';
import { BLOG_POSTS, getBlogPostBySlug } from '../data/blogData';

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
          className="my-5 p-4 sm:p-5 rounded-[8px] bg-[#100703] border border-amber-500/20 overflow-x-auto text-xs sm:text-sm font-mono text-amber-200 leading-relaxed"
        >
          <code>{codeContent}</code>
        </pre>
      );
    }

    if (trimmed.startsWith('## ')) {
      return (
        <h2
          key={index}
          className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3"
        >
          {trimmed.replace(/^##\s+/, '')}
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
      '<code class="px-1.5 py-0.5 rounded-[8px] bg-white/10 text-amber-300 font-mono text-sm">$1</code>'
    );
}

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

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
          <span>Kembali ke Blog</span>
        </Link>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0F0704] text-[#F7F1EB] pt-28 pb-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#C7B6A6] hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Artikel</span>
          </Link>
        </div>

        {/* Header Meta */}
        <div className="space-y-5 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="px-3 py-1 rounded-[8px] bg-amber-500/15 text-amber-300 border border-amber-500/30">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#A89482]">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#A89482]">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-[#C7B6A6] leading-relaxed">
            {post.excerpt}
          </p>

          <div className="pt-2 flex items-center justify-between border-y border-white/10 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[8px] bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">{post.author}</div>
                <div className="text-xs text-[#A89482]">{post.authorRole}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#E5D9CE] cursor-pointer"
              title="Salin Tautan Artikel"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Bagikan</span>
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-[8px] overflow-hidden border border-white/10 mb-10 bg-[#140904] max-h-[420px]">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full max-h-[420px] object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10 rounded-[8px] bg-[#180C06] border border-white/10 shadow-xl">
          {renderMarkdownBlocks(post.content)}

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#A89482] mr-1">Topik:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-[8px] text-xs font-mono bg-white/5 border border-white/10 text-amber-300"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Consultation Banner inside Blog Post */}
        <div className="mt-10 p-6 sm:p-8 rounded-[8px] bg-gradient-to-r from-[#241209] to-[#180C06] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">
              Ingin Menerapkan Strategi Ini pada Bisnis Anda?
            </h3>
            <p className="text-xs sm:text-sm text-[#C7B6A6]">
              Diskusikan kebutuhan pengembangan produk digital Anda bersama tim KanaKoding.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/#kontak')}
            className="px-5 py-3 rounded-[8px] text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-[#1A0B05] shrink-0 cursor-pointer"
          >
            Konsultasi Sekarang
          </button>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-14 space-y-6">
            <h3 className="text-xl font-bold text-white">Artikel Lainnya</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  className="group p-5 rounded-[8px] bg-[#180C06] border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-amber-400">
                      {rel.category}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-[#C7B6A6] line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400">
                    Baca Artikel <ArrowRight className="w-3.5 h-3.5" />
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
