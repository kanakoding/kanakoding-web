import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Search,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { BLOG_CATEGORIES, BLOG_POSTS } from '../data/blogData';
import { ADSENSE_CONFIG, BRAND_INFO } from '../data/siteData';
import { AdUnit } from '../components/AdUnit';
import { updatePageSeo } from '../utils/seo';
import { smoothScrollToY } from '../utils/smoothScroll';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    smoothScrollToY(0, 500);
    updatePageSeo({
      title: `Jurnal & Artikel Teknologi — ${BRAND_INFO.name} (${BRAND_INFO.tagline})`,
      description:
        'Kumpulan artikel rekayasa perangkat lunak, arsitektur aplikasi web modern, strategi MVP startup digital, dan tutorial pemrograman berbahasa Indonesia oleh tim KanaKoding.',
      canonicalPath: '/blog',
      ogType: 'website',
    });
  }, []);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchCategory =
      selectedCategory === 'Semua' || post.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q));
    return matchCategory && matchQuery;
  });

  const featuredPost =
    BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-[#0F0704] text-[#F7F1EB] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#A89482] flex items-center gap-2">
          <Link to="/" className="hover:text-amber-400 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <span className="text-amber-400">Jurnal &amp; Blog</span>
        </nav>

        <div className="border-b border-white/15 pb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <BookOpen className="w-4 h-4" />
              <span>KANAKODING ENGINEERING JOURNAL</span>
            </div>
            <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-bold text-white leading-tight">
              Wawasan Engineering, Arsitektur Sistem &amp; Bisnis Digital
            </h1>
            <p className="text-[#D5C7B8] text-base leading-relaxed">
              Artikel teknis mendalam, panduan membangun produk startup, dan studi kasus
              transformasi digital yang ditulis serta ditinjau oleh praktisi engineer
              KanaKoding.
            </p>
          </div>

          <div className="w-full lg:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari artikel, topik, atau tag..."
                aria-label="Cari artikel blog"
                className="w-full pl-11 pr-4 py-3 rounded-[8px] bg-[#150A05] border border-white/15 text-sm text-white placeholder-[#9E8A78] focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <AdUnit slotId={ADSENSE_CONFIG.slots.blogTopBanner} format="horizontal" />

        {selectedCategory === 'Semua' && !searchQuery.trim() && featuredPost && (
          <Link
            to={`/blog/${featuredPost.slug}`}
            className="group block rounded-[8px] bg-[#150A05] border border-white/15 overflow-hidden hover:border-amber-500/40 transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[340px] bg-[#0E0603] border-b lg:border-b-0 lg:border-r border-white/12 overflow-hidden">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-[8px] text-xs font-mono font-bold bg-amber-500 text-[#1A0B05]">
                    LAPORAN UTAMA
                  </span>
                  <span className="px-3 py-1 rounded-[8px] text-xs font-mono bg-[#120804]/95 text-amber-300 border border-amber-500/30">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-[#A89482]">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {featuredPost.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#D5C7B8] leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/12 flex items-center justify-between">
                  <div className="text-xs text-[#C7B6A6]">
                    Oleh <strong className="text-white">{featuredPost.author}</strong>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-400">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/12 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-[#1A0B05] font-bold'
                    : 'bg-[#180C06] text-[#C7B6A6] border border-white/12 hover:border-amber-500/35 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <span className="text-xs font-mono text-[#A89482]">
            {filteredPosts.length} Artikel Terkurasi
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="p-12 rounded-[8px] bg-[#160B06] border border-white/12 text-center space-y-3">
            <p className="text-lg font-semibold text-white">
              Tidak ada artikel yang cocok dengan pencarian Anda.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-[8px] text-xs font-bold bg-amber-500 text-[#1A0B05] hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="border-t border-white/15 divide-y divide-white/15">
            {filteredPosts.map((post, idx) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group"
              >
                <div className="md:col-span-4 relative h-48 rounded-[8px] overflow-hidden bg-[#0E0603] border border-white/12">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-[8px] text-xs font-mono font-medium bg-[#120804]/95 text-amber-300 border border-amber-500/30">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#A89482]">
                      <span className="text-amber-400 font-bold">0{idx + 1}</span>
                      <span>/</span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#C7B6A6] leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[8px] text-[11px] font-mono bg-[#180C06] border border-white/10 text-[#C7B6A6]"
                        >
                          <Tag className="w-2.5 h-2.5 text-amber-400" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-mono font-semibold text-amber-400 inline-flex items-center gap-1">
                      Baca Artikel <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="p-6 rounded-[8px] bg-[#140904] border border-white/12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-[8px] bg-amber-500/15 text-amber-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Standar Kualitas &amp; Kurasi Redaksi KanaKoding
              </h4>
              <p className="text-xs text-[#B5A392] mt-0.5 leading-relaxed">
                Seluruh artikel dan tutorial pemrograman di KanaKoding ditulis secara orisinal
                dan diverifikasi oleh praktisi rekayasa perangkat lunak kami untuk menjamin
                akurasi teknis.
              </p>
            </div>
          </div>
          <Link
            to="/disclaimer"
            className="px-4 py-2 rounded-[8px] text-xs font-semibold bg-[#180C06] hover:bg-[#221109] text-amber-300 border border-white/12 shrink-0"
          >
            Pedoman Editorial
          </Link>
        </div>
      </div>
    </div>
  );
};
