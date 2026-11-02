---
title: "Catatan dari Dapur Rekayasa: Bagaimana Kami Meracik Ekosistem Web Modern Tanpa Bloatware"
slug: "catatan-dapur-rekayasa-arsitektur-modern-tanpa-bloatware"
excerpt: "Obrolan santai di balik dapur teknik KanaKoding: memadukan Single Page Application (SPA) yang interaktif dengan arsitektur server-first ramping tanpa beban library yang berlebihan."
category: "Engineering"
date: "31 Oktober 2026"
readTime: "8 menit baca"
author: "Dila Bestlian"
authorRole: "Lead Architect"
coverImage: "/assets/img/background1.jpg"
featured: true
tags: ["Architecture", "Engineering", "Web Performance", "Vite", "Astro"]
---

Dalam industri rekayasa perangkat lunak hari ini, ada godaan besar untuk selalu menumpuk pustaka (*libraries*) dan kerangka kerja (*frameworks*) baru ke dalam setiap proyek. Sebuah halaman landing statis yang sebenarnya hanya membutuhkan beberapa kilobyte HTML sering kali berakhir dengan ukuran berkas JavaScript 4 MB, lusinan ketergantungan NPM yang rentan usang, dan waktu muat awal (*First Contentful Paint*) yang lambat di jaringan seluler 4G Indonesia.

Di **KanaKoding**, kami mengambil jalan yang berbeda. Sejak awal pendirian studio, filosofi rekayasa kami bertumpu pada satu prinsip sederhana namun tegas: **kecepatan, kesederhanaan, dan keandalan sistem adalah bentuk penghormatan tertinggi kepada pengguna akhir**.

## 1. Membedah Masalah 'Framework Fatigue' & Bloatware

Sering kali kami kedatangan calon klien atau rekan pengembang yang mengeluhkan hal serupa: *"Aplikasi kami baru berjalan satu tahun, tetapi waktu build di CI/CD sudah 12 menit, dan setiap kali menggeser komponen kecil, seluruh halaman terasa berat."*

Ketika kami membedah basis kode mereka, akar masalahnya hampir selalu sama:
- **Ketergantungan Berlebihan**: Mengimpor paket utilitas berukuran ratusan kilobyte hanya untuk memformat tanggal atau memotong teks.
- **Hidrasi Klien yang Tidak Perlu**: Memaksa browser mengeksekusi siklus hidup komponen kompleks pada teks statis yang tidak pernah berinteraksi dengan pengguna.
- **Pelacak Pihak Ketiga Tanpa Audit**: Menyisipkan 8 skrip analitik dan tag manager yang saling berebut sumber daya komputasi di thread utama (*main thread*) peramban.

```
Klien Mengakses -> DNS Resolving -> TTFB Cepat (<80ms) -> Render HTML Bersih -> Interaktivitas Instan
```

Ketika alur di atas tercapai, skor Google Core Web Vitals (LCP, INP, CLS) secara alami akan menyentuh angka 98-100 tanpa trik *hacky*.

## 2. Pemisahan Beban: Kapan Memilih SPA dan Kapan Memilih Server-First

Salah satu keputusan arsitektur terbaik yang kami terapkan di KanaKoding adalah **memisahkan peran arsitektur sesuai karakteristik beban pengguna**:

1. **Portal Publik & Ruang Publikasi**: Konten berbasis bacaan, panduan teknis, dan halaman profil studio harus memiliki *Time-to-First-Byte* (TTFB) di bawah 100ms dan langsung dapat dibaca tanpa menunggu JavaScript selesai dievaluasi. Untuk ranah ini, pendekatan server-first atau static generation adalah pemenang mutlak.
2. **Dashboard Interaktif & Alat Produktivitas**: Aplikasi yang membutuhkan manajemen state global yang padat, sinkronisasi formulir real-time, dan manipulasi data dinamis (seperti CMS admin atau kalkulator simulasi kredit) dibangun di atas ekosistem Single Page Application (SPA) berbasis React dan Vite yang modular.

```typescript
// Contoh arsitektur lazy-loading rute di ekosistem Vite
import { lazy, Suspense } from 'react';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

export function AppRouter() {
  return (
    <Suspense fallback={<div className="p-8 text-center font-mono">Memuat Modul...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}
```

Dengan memisahkan kedua domain ini secara tegas, pengunjung biasa tidak perlu mengunduh kode manajemen dasbor yang berat, sementara admin tetap menikmati pengalaman manipulasi data yang kaya layaknya aplikasi desktop.

## 3. Disiplin Pemilihan Dependensi di KanaKoding

Sebelum menambahkan pustaka eksternal apa pun ke dalam berkas `package.json`, tim teknis kami selalu menanyakan tiga filter kualitas:

- **Apakah Fitur Ini Sudah Tersedia Secara Asli di Standar Web Modern?** Misalnya, banyak operasi array, manipulasi tanggal sederhana, atau penguraian URL kini sudah didukung penuh oleh JavaScript runtime modern tanpa butuh bantuan library eksternal.
- **Berapa Bobot Gzip yang Dibawa ke Bundle Produksi?** Kami membatasi anggaran ukuran berkas (*bundle budget*) dengan ketat pada setiap tarikan pipa CI/CD.
- **Apakah Pustaka Ini Memiliki Tipe TypeScript yang Ketat?** Keamanan tipe data (*type safety*) bukan sekadar gaya penulisan, melainkan benteng pertahanan pertama dari bug runtime tak terduga di tengah malam.

## 4. Hasil Nyata: Pengalaman Membaca yang Tenang & Cepat

Ketika rekayasa perangkat lunak dijalankan dengan disiplin dan tanpa kompromi performa, hasilnya bukan hanya terlihat di dasbor Lighthouse bernilai hijau, melainkan terasa langsung oleh manusia yang menggunakannya. Halaman berpindah seketika, tipografi nyaman di mata, dan konsumsi baterai perangkat tetap dingin.

Bagi kami di KanaKoding, menulis kode bukan sekadar menyelesaikan tiket tugas mingguan, melainkan seni merakit ruang digital yang berumur panjang dan bermanfaat bagi bisnis yang kami dampingi.
