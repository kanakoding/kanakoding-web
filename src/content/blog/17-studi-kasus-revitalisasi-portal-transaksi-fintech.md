---
title: "Studi Kasus: Membongkar & Membangun Ulang Portal Transaksi yang Lambat Menjadi Super Cepat"
slug: "studi-kasus-revitalisasi-portal-transaksi-fintech"
excerpt: "Pelajaran nyata dari lapangan rekayasa KanaKoding saat merestrukturisasi portal simulasi kredit multi-finance: memangkas waktu muat dari 4.8 detik ke 620 milidetik dan mendongkrak konversi."
category: "Studi Kasus"
date: "02 November 2026"
readTime: "10 menit baca"
author: "Tim Solusi KanaKoding"
authorRole: "Delivery & Performance"
coverImage: "/assets/img/wmf.jpg"
featured: false
tags: ["Studi Kasus", "Fintech", "Web Performance", "Database Tuning"]
---

Pada awal tahun ini, tim solusi KanaKoding dipercaya untuk menangani revitalisasi portal digital sebuah institusi pembiayaan (*multi-finance*) terkemuka. Portal tersebut memiliki fungsi krusial: memungkinkan calon debitur dan mitra agen melakukan simulasi pembiayaan kendaraan bermotor, memeriksa estimasi suku bunga, hingga mengajukan aplikasi kredit secara daring.

Namun, sistem lama menghadapi tantangan performa berat:
- **Waktu Muat Awal 4.8 Detik**: Pengunjung di perangkat seluler sering kali membatalkan niat mengisi formulir (*bounce rate* tinggi) karena halaman lambat merespons.
- **Bottleneck Kalkulasi Bunga**: Setiap kali slider tenor atau uang muka (DP) digeser, aplikasi melakukan pemanggilan API round-trip yang membebani server backend secara eksponensial.
- **Payload Aset Membengkak**: File bundel JavaScript awal berukuran lebih dari 3.2 MB akibat tumpukan dependensi lawas yang tidak teroptimasi.

Tantangan bagi kami jelas: **merombak total arsitektur tanpa mengganggu operasional bisnis yang sedang berjalan aktif**.

## 1. Analisis Akar Masalah: Profiling & Bottleneck Mapping

Langkah pertama tim arsitektur KanaKoding adalah melakukan profiling menyeluruh menggunakan Chrome DevTools Performance Trace dan visualizer dependensi Webpack/Vite:

```
Hasil Audit Awal:
- Total Download Size  : 4.2 MB (Gzip 1.4 MB)
- First Contentful Paint: 2.9 detik
- Largest Contentful Paint: 4.8 detik
- Cumulative Layout Shift: 0.28 (Teks melompat-lompat saat font dimuat)
```

Kami menemukan tiga biang kerok utama:
1. **Pemanggilan REST API Berlebihan**: Rumus anuitas kredit sebenarnya adalah matematika deterministik yang bisa dieksekusi instan di sisi klien dengan nol latensi jaringan.
2. **Gambar Header Tanpa Optimasi Modern**: Banner promosi JPEG berukuran 1.8 MB dimuat tanpa format WebP dan tanpa atribut `loading="lazy"`.
3. **Database N+1 Query**: Endpoint opsi cabang pembiayaan melakukan query loop terpisah untuk setiap kota di Indonesia.

## 2. Solusi 1: Pemindahan Logika Simulasi ke Mesin Klien WebAssembly/TypeScript

Kami merancang ulang formula perhitungan simulasi kredit menjadi modul murni TypeScript yang ringan (di bawah 4 KB). Seluruh matriks tenor, batas plafon, dan skema biaya provisi di-cache secara cerdas di memori peramban saat inisialisasi awal.

```typescript
// Cuplikan kalkulator anuitas kredit instan di sisi klien
export function calculateLoanSimulation(
  principal: number,
  annualRate: number,
  tenorMonths: number
): { monthlyInstallment: number; totalPayment: number } {
  const monthlyRate = annualRate / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, tenorMonths);
  const monthlyInstallment = Math.round((principal * monthlyRate * factor) / (factor - 1));
  const totalPayment = monthlyInstallment * tenorMonths;

  return { monthlyInstallment, totalPayment };
}
```

Dampaknya luar biasa: pengguna dapat menggeser slider pembiayaan dengan respons visual 60 frame per detik tanpa ada jeda latensi jaringan sama sekali.

## 3. Solusi 2: Kompresi Gambar Server-Side WebP & Responsive Sizes

Kami mengonversi seluruh aset media promosi dan brosur kendaraan ke format **WebP modern** dengan kompresi kualitas adaptif. Gambar di-host pada jaringan CDN dengan header cache `immutable` 1 tahun.

Ukuran rata-rata gambar banner terpangkas drastis dari 1.8 MB menjadi hanya **68 KB**, tanpa ada penurunan ketajaman visual yang tampak oleh mata manusia.

## 4. Solusi 3: Perbaikan Indeks Basis Data & Connection Pooling

Di sisi backend PostgreSQL, kami menggabungkan query kota dan cabang menggunakan operator JSON aggregation tunggal:

```sql
-- Mengurangi 80 query terpisah menjadi 1 query agregasi tunggal
SELECT 
    p.id AS province_id,
    p.name AS province_name,
    json_agg(
        json_build_object('id', b.id, 'name', b.name, 'code', b.code)
    ) AS branches
FROM provinces p
JOIN branches b ON b.province_id = p.id
WHERE b.is_active = true
GROUP BY p.id, p.name
ORDER BY p.name;
```

Beban komputasi CPU database seketika turun 75%, dan latensi endpoint opsi cabang terpangkas dari 940ms menjadi hanya 42ms.

## 5. Hasil Akhir & Pembelajaran Berharga

Setelah dua minggu masa uji coba paralel dan rilis penuh, metrik bisnis menunjukkan lonjakan signifikan:

- **Waktu Muat (LCP) Turun ke 620ms**: Turun lebih dari 85% dibanding sistem lama.
- **Conversion Rate Aplikasi Kredit Naik 42%**: Calon nasabah menyelesaikan formulir pengajuan tanpa hambatan frustrasi.
- **Skor SEO & Core Web Vitals Sempurna (100/100)**: Peringkat pencarian organik untuk kata kunci pembiayaan wilayah meningkat ke halaman pertama Google.

Studi kasus ini menegaskan filosofi KanaKoding: **performa web bukan sekadar angka teknis di laporan pengembang, melainkan faktor penentu langsung keberhasilan transaksi bisnis Anda**.
