import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Search,
  Tag,
  Terminal,
} from 'lucide-react';
import { BLOG_CATEGORIES, BLOG_POSTS } from '../data/blogData';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        {/* Blog Hero Header */}
        <div className="relative rounded-[8px] bg-[#180C06] border border-amber-500/25 p-8 sm:p-12 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: "url('/assets/img/bg-kk.jpg')" }}
          />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
                <BookOpen className="w-3.5 h-3.5" />
                <span>KANAKODING JOURNAL &amp; TECH BLOG</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
                Wawasan Engineering, Bisnis Digital &amp; Komunitas
              </h1>
              <p className="text-[#D5C7B8] text-base leading-relaxed">
                Artikel teknis, panduan membangun produk startup, dan catatan pembelajaran
                dari tim serta komunitas developer KanaKoding.
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full lg:w-80">
              <div className="relative">
                <Search className="w-4 h-4 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari artikel, topik, atau tag..."
                  className="w-full pl-11 pr-4 py-3 rounded-[8px] bg-[#100703] border border-white/15 text-sm text-white placeholder-[#8B7968] focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Article Spotlight (shown when no filter/search active) */}
        {selectedCategory === 'Semua' && !searchQuery.trim() && featuredPost && (
          <Link
            to={`/blog/${featuredPost.slug}`}
            className="group block rounded-[8px] bg-[#180C06] border border-amber-500/30 overflow-hidden shadow-2xl hover:border-amber-400 transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[340px] bg-[#0E0603] overflow-hidden">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-[8px] text-xs font-mono font-bold bg-amber-500 text-[#1A0B05]">
                    ARTIKEL UNGGULAN
                  </span>
                  <span className="px-3 py-1 rounded-[8px] text-xs font-mono bg-[#120804]/90 text-amber-300 border border-amber-500/30">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs text-[#A89482]">
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

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs text-[#C7B6A6]">
                    Oleh <strong className="text-white">{featuredPost.author}</strong>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-[8px] text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-[#1A0B05] font-bold'
                    : 'bg-[#180C06] text-[#C7B6A6] border border-white/10 hover:border-amber-500/30 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <span className="text-xs font-mono text-[#A89482]">
            {filteredPosts.length} Artikel Tersedia
          </span>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="p-12 rounded-[8px] bg-[#180C06] border border-white/10 text-center space-y-3">
            <p className="text-lg font-semibold text-white">
              Tidak ada artikel yang cocok dengan pencarian Anda.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-[8px] text-xs font-semibold bg-amber-500 text-[#1A0B05] cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group rounded-[8px] bg-[#180C06] border border-white/10 hover:border-amber-500/40 overflow-hidden flex flex-col transition-all hover:-translate-y-1 shadow-xl"
              >
                <div className="relative h-52 overflow-hidden bg-[#0E0603]">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-[8px] text-xs font-mono font-medium bg-[#120804]/90 text-amber-300 border border-amber-500/30">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-[#A89482]">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-sm text-[#C7B6A6] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[8px] text-[11px] font-mono bg-white/5 text-[#B5A392]"
                        >
                          <Tag className="w-2.5 h-2.5 text-amber-400" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[#A89482]">{post.author}</span>
                      <span className="font-semibold text-amber-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Baca Artikel <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Developer Info Box: How to Add Blog Posts */}
        <div className="p-6 rounded-[8px] bg-[#140904] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-[8px] bg-amber-500/15 text-amber-400 shrink-0 mt-0.5">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Sistem Blog Berbasis Markdown Otomatis
              </h4>
              <p className="text-xs text-[#B5A392] mt-0.5">
                Untuk menambahkan artikel baru, cukup buat file{' '}
                <code className="text-amber-300 bg-white/5 px-1.5 py-0.5 rounded-[8px]">
                  src/content/blog/nama-artikel.md
                </code>{' '}
                dan halaman blog akan otomatis memperbarui daftar artikel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
