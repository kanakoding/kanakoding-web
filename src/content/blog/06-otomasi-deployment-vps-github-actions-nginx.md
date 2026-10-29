---
title: "Otomasi Deployment VPS dengan GitHub Actions, Zero-Downtime Symlink, dan Nginx"
slug: "otomasi-deployment-vps-github-actions-zero-downtime-nginx"
excerpt: "Cara menyusun pipa CI/CD produksi yang cepat, aman dengan user khusus tanpa akses root, dan mendukung rollback instan dalam hitungan detik."
category: "Engineering"
date: "21 Oktober 2026"
readTime: "8 menit baca"
author: "KanaKoding Core Dev"
authorRole: "DevOps & Cloud Engineer"
coverImage: "/assets/img/background4.jpg"
featured: false
tags: ["CI/CD", "GitHub Actions", "Nginx", "VPS", "DevOps"]
---

Masih banyak tim pengembang yang melakukan rilis ke server produksi secara manual: masuk ke VPS menggunakan akun `root`, menjalankan `git pull`, lalu mengeksekusi `npm run build` langsung di server utama. Pendekatan manual seperti ini menyimpan tiga risiko besar: proses kompilasi menghabiskan memori RAM server produksi hingga membuat situs melambat, kegagalan di tengah proses *build* meninggalkan berkas setengah jadi yang membuat web mati (*downtime*), dan tidak adanya mekanisme *rollback* cepat jika ditemukan kutu (*bug*) kritis.

Di **KanaKoding**, kami menerapkan pola **Atomic Release Symlink** yang dikombinasikan dengan **GitHub Actions** untuk memastikan setiap pembaruan kode tayang ke produksi secara mulus tanpa satu detik pun waktu henti.

## 1. Prinsip Dasar: Build di Runner CI, Kirim Hanya Artefak Siap Pakai

Server VPS produksi sebaiknya mendedikasikan seluruh kapasitas CPU dan memorinya untuk melayani trafik pengguna dan basis data, bukan untuk menjalankan kompilasi TypeScript atau mengunduh ratusan megabita `node_modules`.

Dengan memindahkan tahap pemeriksaan tipe data (`tsc -b`), pengujian otomatis, dan pemaketan bundel (`vite build`) ke dalam *runner* **GitHub Actions**:

- Jika terdapat kesalahan penulisan kode atau kegagalan kompilasi, alur kerja otomatis berhenti di tahap *Build* dan server produksi sama sekali tidak tersentuh.
- Hanya folder hasil akhir (`dist/`) yang berukuran beberapa ratus kilobita yang dikirimkan ke VPS melalui jalur terenkripsi `rsync` di atas SSH.

## 2. Anatomi Direktori Atomic Release di Server Nginx

Alih-alih menimpa berkas lama secara langsung di dalam satu folder webroot, kami menyusun struktur direktori berversi di `/var/www/<domain>/`:

```
/var/www/kanakoding.com/
├── current -> /var/www/kanakoding.com/releases/20261029044400-7504bcb
└── releases/
    ├── 20261027104043-0cd4503/
    ├── 20261027105217-918ee77/
    └── 20261029044400-7504bcb/
```

Konfigurasi Nginx cukup diarahkan ke tautan simbolik (*symlink*) `root /var/www/<domain>/current;`. Saat ada rilis baru:

1. Berkas rilis baru diunggah ke folder baru `/var/www/<domain>/releases/<timestamp>-<commit_sha>/` menggunakan opsi `--link-dest` pada `rsync` sehingga berkas aset yang tidak berubah tidak perlu disalin ulang.
2. Selama proses unggah berlangsung, pengunjung situs tetap dilayani oleh folder rilis sebelumnya tanpa gangguan.
3. Setelah unggahan selesai dan berkas `index.html` terverifikasi utuh, tautan simbolik `current` dialihkan secara atomik menggunakan perintah `ln -sfn` dan `mv -Tf`.
4. Sistem secara otomatis menyimpan 5 rilis terakhir dan membersihkan rilis yang lebih lama agar ruang penyimpanan disk tetap lega.

## 3. Keamanan Akses CI/CD: Akun Deploy Terisolasi & Host Key Pinning

Memberikan akses `root` atau hak `sudo` penuh kepada kunci SSH yang disimpan di layanan pihak ketiga adalah celah keamanan yang tidak perlu. Kami memisahkan akun administrasi server dari akun otomatisasi CI/CD:

- **Dedicated `deploy` User**: Akun `deploy` tidak memiliki kata sandi dan tidak memiliki akses `sudo`. Ia hanya tergabung dalam grup `www-data` dan hanya memiliki izin tulis pada direktori `/var/www/<domain>/releases/`.
- **Strict Host Key Checking**: Kunci publik identitas server VPS disimpan di `VPS_KNOWN_HOSTS` pada GitHub Secrets dan diverifikasi dengan opsi `StrictHostKeyChecking=yes` untuk mencegah serangan *Man-in-the-Middle* (MitM).
- **Automated Smoke Test**: Segera setelah tautan `current` diperbarui, pipa CI/CD melakukan permintaan HTTP ke domain produksi untuk memastikan status respons adalah `200 OK`.

## 4. Pemantauan Sertifikat SSL/TLS Otomatis

Selain otomasi rilis aplikasi, pemeliharaan sertifikat HTTPS **Let's Encrypt** juga berjalan secara mandiri melalui `certbot.timer` dengan metode *webroot* (`/var/www/letsencrypt`). Setiap kali sertifikat diperbarui, *deploy hook* otomatis memuat ulang konfigurasi Nginx (`systemctl reload nginx`) tanpa memutus koneksi aktif. Sebagai lapisan pengaman tambahan, jadwal GitHub Actions harian memeriksa sisa masa berlaku sertifikat langsung ke server asal dan mengirimkan peringatan otomatis jika masa berlaku kurang dari 14 hari.

## Kesimpulan

Pipa CI/CD yang dirancang dengan disiplin mengubah proses rilis dari momen yang menegangkan menjadi rutinitas harian yang tenang dan terprediksi. Tim pengembang cukup berfokus menulis kode berkualitas, melakukan *merge* ke cabang utama, dan membiarkan sistem otomasi menangani sisanya dalam waktu kurang dari 30 detik.
