---
title: "Checklist Hardening Server Ubuntu VPS untuk Hosting Multi-Project dengan Nginx dan Docker"
slug: "checklist-hardening-server-ubuntu-vps-nginx-docker"
excerpt: "Langkah demi langkah mengamankan VPS produksi Ubuntu 24.04: dari penonaktifan login password SSH, isolasi firewall UFW, hingga manajemen reverse proxy multi-subdomain."
category: "Engineering"
date: "28 Oktober 2026"
readTime: "9 menit baca"
author: "KanaKoding Core Dev"
authorRole: "Infrastructure & Security"
coverImage: "/assets/img/background3.jpg"
featured: false
tags: ["Linux", "Ubuntu", "VPS", "Security", "Docker", "Nginx"]
---

Menyewa sebuah *Virtual Private Server* (VPS) baru dengan spesifikasi mumpuni barulah langkah pertama. Begitu sebuah alamat IP publik aktif di internet, dalam hitungan menit bot pemindai otomatis dari seluruh dunia akan mulai mencoba melakukan login *brute-force* ke port SSH (`22`) menggunakan daftar nama pengguna umum seperti `root`, `ubuntu`, atau `admin` serta memindai port basis data yang tidak sengaja terbuka.

Agar satu VPS dapat digunakan dengan tenang untuk menghosting beberapa proyek web dan layanan API pada berbagai *subdomain*, diperlukan prosedur **Server Hardening** dan penataan arsitektur *Reverse Proxy* yang disiplin. Berikut adalah daftar periksa (*checklist*) standar produksi yang kami terapkan di **KanaKoding**.

## 1. Pengamanan Akses SSH & Penghapusan Akun Bawaan

Langkah pertama yang wajib dilakukan tepat setelah VPS baru diinisialisasi adalah menutup celah autentikasi berbasis kata sandi:

1. **Ganti Akun Default & Buat User Administrasi Khusus**: Buat akun pengguna baru (misalnya `dev`) dengan grup `sudo`, salin kunci publik SSH Anda ke `~/.ssh/authorized_keys` dengan izin berkas `600`, lalu hapus akun bawaan `ubuntu` apabila sudah tidak digunakan.
2. **Matikan Autentikasi Password & Login Root**: Buat konfigurasi penguncian di `/etc/ssh/sshd_config.d/00-hardening.conf` agar server hanya menerima kriptografi kunci publik:

```
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
PubkeyAuthentication yes
AllowUsers dev deploy
```

3. **Kunci Konfigurasi Cloud-Init**: Pada banyak penyedia cloud, pembaruan paket atau *reboot* dapat memicu `cloud-init` mengembalikan pengaturan awal. Pastikan `preserve_hostname: true` dan `ssh_pwauth: false` tercatat di `/etc/cloud/cloud.cfg.d/`.

## 2. Firewall UFW, Fail2ban, dan Jebakan Port Docker

Setelah akses SSH aman, batasi permukaan serangan jaringan (*network attack surface*) menggunakan **UFW (Uncomplicated Firewall)** dan **Fail2ban**:

- **Hanya Buka Port 22, 80, dan 443**: Tolak seluruh koneksi masuk lainnya secara bawaan (`ufw default deny incoming`).
- **Aktifkan Jail SSHD di Fail2ban**: Blokir otomatis alamat IP yang gagal melakukan autentikasi sebanyak 5 kali berturut-turut.
- **Waspadai Perilaku Port Binding pada Docker**: Satu hal krusial yang sering menjebak engineer adalah Docker memanipulasi tabel `iptables` secara langsung, sehingga `docker run -p 3000:3000` akan membuka port `3000` ke seluruh internet **meskipun UFW sudah aktif**! Untuk menghindarinya, **selalu ikat port kontainer ke antarmuka lokal** menggunakan `-p 127.0.0.1:3000:3000` agar aplikasi di dalam Docker hanya bisa diakses melalui Nginx di server yang sama.

## 3. Arsitektur Nginx Multi-Subdomain & Default Server Catch-All

Saat satu VPS melayani domain utama (`kanakoding.com`) sekaligus beberapa subdomain proyek (`blog.kanakoding.com`, `api.kanakoding.com`, `app.kanakoding.com`), penataan konfigurasi Nginx harus terstruktur:

- **Default Server Catch-All (`return 444`)**: Konfigurasikan blok `default_server` pada port 80 dan 443 menggunakan sertifikat *self-signed* yang langsung menutup koneksi (`return 444`) apabila ada permintaan HTTP yang datang menggunakan alamat IP mentah atau *host header* asing yang tidak terdaftar.
- **Pemulihan IP Asli Pengunjung di Balik Cloudflare**: Jika domain Anda diproteksi oleh proxy Cloudflare, pasang daftar rentang IP resmi Cloudflare menggunakan direktif `set_real_ip_from` dan `real_ip_header CF-Connecting-IP;` agar log akses Nginx dan pembatas laju (*rate limiter*) membaca alamat IP pengunjung sebenarnya, bukan IP edge Cloudflare.
- **Standarisasi Penambahan Situs Baru**: Pisahkan antara templat situs statis (SPA dengan `try_files $uri $uri/ /index.html;` dan cache aset `/assets/` selama 1 tahun) dan templat *reverse proxy* (`proxy_pass http://127.0.0.1:<port>;` lengkap dengan dukungan header WebSocket).

## 4. Pembaruan Keamanan Otomatis & Manajemen Swap

Terakhir, pastikan kesehatan jangka panjang sistem operasi terjaga melalui:

1. **Unattended Upgrades**: Mengaktifkan pemasangan tambalan keamanan (*security patches*) Ubuntu secara otomatis.
2. **Ruang Swap Terukur**: Menyediakan ruang *swap* sekitar 2 GB sebagai bantalan pengaman memori ketika terjadi lonjakan trafik sesaat.
3. **Zona Waktu & Sinkronisasi NTP**: Menyelaraskan jam server agar cap waktu pada log transaksi, validasi token JWT, dan jadwal cron selalu akurat.

## Kesimpulan

Server yang dikonfigurasi dengan rapi sejak hari pertama menghemat ratusan jam pemecahan masalah di masa depan. Dengan memadukan autentikasi kunci SSH, isolasi port lokal untuk kontainer aplikasi, serta orkestrasi Nginx + Let's Encrypt yang terstandar, satu VPS modern dapat menghosting belasan layanan digital perusahaan Anda dengan aman dan kencang.
