---
title: "Studi Kasus: Merancang Portal Simulasi Kredit & Marketplace Properti"
slug: "studi-kasus-portal-simulasi-kredit-dan-marketplace-properti"
excerpt: "Pelajaran penting dari pengembangan portal PT. Wannamas Multi Finance dan Lelang.co dalam mengubah pengunjung website menjadi prospek bisnis berkualitas."
category: "Studi Kasus"
date: "04 Oktober 2026"
readTime: "9 menit baca"
author: "Tim Engineering KanaKoding"
authorRole: "Solution Architect"
coverImage: "/assets/img/wmf.jpg"
featured: false
tags: ["FinTech", "PropTech", "UI/UX", "Portofolio"]
---

Website korporat di sektor jasa keuangan (*FinTech/Multi-Finance*) dan properti (*PropTech*) sering menghadapi tantangan serupa: trafik kunjungan cukup tinggi, namun tingkat konversi pengunjung menjadi prospek berkualitas (*qualified leads*) sangat rendah. Penyebab utamanya adalah sebagian besar portal hanya dirancang sebagai brosur satu arah yang dipenuhi paragraf profil perusahaan, bukan sebagai **alat bantu pengambilan keputusan** bagi calon nasabah atau investor.

Dalam artikel studi kasus ini, kami membagikan pembelajaran arsitektur informasi dan *User Experience* (UX) dari dua proyek nyata yang dikerjakan oleh tim **KanaKoding**: portal pembiayaan **PT. Wannamas Multi Finance** dan direktori lelang properti **Lelang.co**.

## 1. Studi Kasus Pertama: Interaktivitas Langsung pada Simulasi Pengajuan Kredit

Pada proyek pengembangan portal **PT. Wannamas Multi Finance**, riset awal menunjukkan bahwa pertanyaan pertama setiap calon debitur bukanlah sejarah berdirinya perusahaan, melainkan: *"Jika saya mengajukan pembiayaan sejumlah X rupiah dengan jaminan BPKB atau sertifikat, berapa estimasi angsuran bulanan saya dan apa saja syaratnya?"*

Sebelumnya, calon nasabah harus menghubungi staf pemasaran terlebih dahulu hanya untuk mendapatkan gambaran kasar angsuran. Hal ini menimbulkan friksi bagi pengunjung yang masih berada pada tahap eksplorasi awal.

### Solusi Produk & UX yang Kami Terapkan

- **Kalkulator Simulasi Kredit di Hero Section**: Kami menempatkan komponen simulasi interaktif tepat di paruh atas halaman pertama (*above the fold*). Pengunjung dapat menggeser nominal pembiayaan, memilih tenor (12, 24, 36, hingga 48 bulan), dan melihat estimasi cicilan secara *real-time* tanpa perlu memuat ulang halaman.
- **Alur Konversi Bertahap (Progressive Disclosure)**: Setelah pengguna menemukan skema angsuran yang sesuai dengan kemampuan arus kas mereka, tombol aksi utama langsung meneruskan parameter simulasi tersebut ke formulir pengajuan singkat.
- **Integrasi Kanal Agen & Mitra Bisnis**: Selain jalur nasabah individu, kami memisahkan alur pendaftaran mitra agen (*Business Center*) agar perekrutan jaringan kemitraan di berbagai daerah berjalan terstruktur.

```
Pengunjung Datang -> Coba Kalkulator Simulasi -> Cocok dengan Estimasi -> Isi Data Singkat -> Diteruskan ke Tim Cabang
```

Hasilnya, kualitas prospek yang masuk ke tim pemasaran meningkat signifikan karena calon nasabah yang mengirimkan formulir sudah mengetahui estimasi kewajiban bulanan mereka sejak awal.

## 2. Studi Kasus Kedua: Transparansi Data pada Direktori Lelang Properti (Lelang.co)

Berbeda dengan pembelian barang konsumsi harian, keputusan mengikuti lelang properti bernilai ratusan juta hingga miliaran rupiah menuntut tingkat kepercayaan dan kelengkapan informasi yang sangat tinggi. Pada proyek **Lelang.co**, tantangan utamanya adalah menyajikan ratusan aset properti dari berbagai wilayah dengan cara yang mudah dipindai, akurat, dan transparan.

### Arsitektur Informasi Kartu Aset Properti

Kami merombak struktur penyajian katalog properti agar setiap kartu aset langsung menjawab lima pertanyaan utama seorang investor properti dalam sekali pandang:

1. **Nilai Limit Lelang yang Jelas**: Ditampilkan dengan tipografi kontras tinggi sebagai patokan modal awal investor.
2. **Spesifikasi Fisik Terukur**: Informasi Luas Tanah ($m^2$), Luas Bangunan ($m^2$), dan kondisi fisik aset disajikan menggunakan ikonografi yang konsisten.
3. **Kepastian Status Legalitas**: Penandaan eksplisit mengenai jenis dokumen kepemilikan (SHM, SHGB, atau SHMSRS) serta kategori lelang (Lelang Eksekusi Hak Tanggungan atau Lelang Sukarela).
4. **Filter Pencarian Multi-Dimensi**: Pengunjung dapat menyaring aset berdasarkan provinsi/kota (misalnya Jakarta Pusat, Jakarta Timur, Surabaya), rentang harga limit, dan jenis properti (rumah tapak, ruko komersial, tanah kavling, atau gudang).
5. **Jadwal & Panduan Prosedur Lelang**: Setiap halaman detail aset dilengkapi penjelasan langkah demi langkah mengenai penyetoran uang jaminan lelang hingga batas waktu penawaran.

## 3. Prinsip Desain Antarmuka untuk Produk Berisiko Tinggi (High-Trust UI)

Dari kedua proyek di sektor keuangan dan properti tersebut, kami merumuskan tiga prinsip desain yang selalu kami terapkan pada produk *high-trust*:

- **Hindari Biaya atau Ketentuan Tersembunyi**: Cantumkan catatan kaki (*disclaimer*) yang jujur mengenai bunga indikatif, biaya administrasi, atau pajak pembeli lelang (BPHTB) agar pengguna merasa dihargai.
- **Kecepatan Muat Gambar Katalog**: Gunakan format gambar terkompresi dan *lazy loading* cerdas supaya pengguna yang membuka katalog puluhan properti dari ponsel tetap merasakan navigasi yang mulus.
- **Akses Bantuan Manusia yang Mudah Dijangkau**: Sekalipun sistem digital sudah otomatis, transaksi bernilai besar tetap membutuhkan sentuhan konsultasi manusia. Tombol diskusi WhatsApp atau jadwal konsultasi harus selalu mudah diakses dengan konteks aset yang sedang dilihat.

## Kesimpulan

Mengubah website perusahaan dari sekadar halaman profil statis menjadi **mesin akuisisi pelanggan** tidak selalu membutuhkan fitur yang rumit. Dengan menyediakan alat hitung interaktif, transparansi spesifikasi data, dan jalur komunikasi yang jelas, website Anda dapat bekerja 24 jam sehari untuk menyaring dan melayani calon klien potensial.
