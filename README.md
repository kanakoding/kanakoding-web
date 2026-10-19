# KanaKoding Web — Company Profile, Portfolio & Tech Blog

Website resmi **KanaKoding** (*Your Digital Partner*) yang telah dimodernisasi menjadi aplikasi web berbasis **Vite + React + TypeScript + Tailwind CSS v4** dengan sistem **Blog berbasis Markdown** otomatis.

## ✨ Fitur Utama
- **Modern Company Profile**: Desain identitas visual khas KanaKoding (Espresso Dark `#0F0704` & `#1A0B05` dengan aksen Amber/Orange) menggunakan tipografi `Space Grotesk`, `Plus Jakarta Sans`, dan `JetBrains Mono`.
- **Interactive Services Showcase**: Menampilkan 4 pilar layanan KanaKoding (*Project Development*, *Konsultasi Aplikasi & Bisnis Digital*, *Komunitas Developer*, serta *E-Learning & Tutorial*).
- **Portofolio & Studi Kasus Interaktif (`/portofolio`)**: Menampilkan studi kasus proyek nyata (**PT. Wannamas Multi Finance**, **Lelang.co**, **KanaKoding Ecosystem**, dll.) lengkap dengan filter kategori dan modal detail studi kasus.
- **Markdown Blog System (`/blog` & `/blog/:slug`)**: Dilengkapi pencarian artikel, filter kategori, estimasi waktu baca, dan pemuatan otomatis dari file `.md` menggunakan Vite `import.meta.glob`.
- **Interactive Project Inquiry (`#kontak`)**: Formulir konsultasi proyek yang terhubung langsung dengan pembuatan draft email terstruktur.

## 🚀 Cara Menjalankan Proyek

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server (HMR)
npm run dev

# 3. Build untuk production
npm run build

# 4. Preview hasil build production
npm run preview
```

## 📝 Cara Menambahkan Artikel Blog Baru
Cukup tambahkan file `.md` baru di dalam folder `src/content/blog/` dengan *frontmatter* berikut:

```markdown
---
title: "Judul Artikel Anda"
slug: "judul-artikel-anda"
excerpt: "Ringkasan singkat artikel untuk kartu preview."
category: "Engineering"
date: "20 Oktober 2026"
readTime: "5 menit baca"
author: "Tim KanaKoding"
authorRole: "Software Engineer"
coverImage: "/assets/img/bg_kanakoding.png"
featured: false
tags: ["Web Dev", "Tips"]
---

Tulis isi artikel dalam format Markdown di sini...
```

## 🗂️ Struktur Direktori
- `public/assets/img/` — Aset logo, ikon, background, dan gambar portofolio asli KanaKoding.
- `src/content/blog/` — Kumpulan artikel blog dalam format Markdown (`.md`).
- `src/data/siteData.ts` — Data terpusat untuk Company Profile, Layanan, Portofolio, dan Alur Kerja.
- `src/data/blogData.ts` — Loader & parser Markdown otomatis untuk sistem Blog.
- `src/components/` — Komponen UI reusable (`Navbar`, `Footer`, `PortfolioModal`).
- `src/pages/` — Halaman utama (`HomePage`, `PortfolioPage`, `BlogPage`, `BlogPostPage`).
