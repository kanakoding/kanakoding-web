---
title: "Eksperimen Nyata: Menjadikan AI Agent & Model Context Protocol (MCP) Partner Coding Harian"
slug: "eksperimen-ai-agent-model-context-protocol-partner-coding"
excerpt: "Bukan sekadar autocomplete baris kode. Catatan mendalam tim KanaKoding saat mengintegrasikan asisten AI langsung dengan database staging, linting ketat, dan server MCP internal."
category: "Software Engineering"
date: "01 November 2026"
readTime: "9 menit baca"
author: "Tim Engineering KanaKoding"
authorRole: "AI Tooling & Automation"
coverImage: "/assets/img/app-development.png"
featured: false
tags: ["AI", "MCP", "Antigravity", "Automation", "Developer Experience"]
---

Beberapa bulan terakhir, lanskap pengembangan perangkat lunak mengalami pergeseran tektonik. Jika setahun lalu kecerdasan buatan dalam ranah pemrograman hanya terbatas pada saran penyelesaian baris (*inline code completion*), kini kita memasuki era **Autonomous Agentic Workflows**—di mana agen AI mampu membaca arsitektur proyek, menjalankan tes integrasi secara mandiri, hingga mengajukan perbaikan bug yang terisolasi dalam cabang Git terpisah.

Di KanaKoding, kami tidak hanya menjadi penonton dalam gelombang ini. Kami bereksperimen langsung dengan mengintegrasikan **Model Context Protocol (MCP)** ke dalam alur kerja rekayasa harian kami.

## 1. Apa Itu Model Context Protocol (MCP) Sebenarnya?

Sebelum memahami implementasinya, mari kita luruskan dulu terminologinya. MCP adalah protokol komunikasi berbasis standar terbuka (didirikan oleh Anthropic) yang bertindak sebagai jembatan resmi antara Large Language Models (seperti Claude 3.7 atau asisten lingkungan IDE seperti Antigravity) dengan sumber daya eksternal—mulai dari sistem berkas lokal, pangkalan data PostgreSQL, hingga layanan penyimpanan objek seperti Cloudflare R2.

Alih-alih mengandalkan perintah manual di mana pengembang harus melakukan *copy-paste* skema SQL berulang kali ke kotak obrolan, server MCP memungkinkan model AI memanggil fungsi terstruktur (*tool calls*) secara deterministik:

```
[Agen AI di IDE] <--- JSON-RPC 2.0 ---> [Server Gateway MCP] <---> [PostgreSQL / R2 Storage]
```

## 2. Mengatasi Masalah Halusinasi dengan Skema yang Terikat Ketat

Salah satu ketakutan terbesar saat membiarkan AI menyentuh basis data produksi atau staging adalah risiko *halusinasi*—di mana model mengira sebuah tabel atau kolom ada padahal sebenarnya tidak pernah didefinisikan.

Pendekatan kami di KanaKoding untuk mengatasi celah ini adalah **mewajibkan verifikasi kontrak skema menggunakan JSON Schema**:

```typescript
// Contoh implementasi deklarasi tool MCP untuk memeriksa metadata artikel
export const listArticlesTool = {
  name: 'list_articles',
  description: 'Mengambil daftar artikel terbaru langsung dari basis data relasional.',
  parameters: {
    type: 'object',
    properties: {
      limit: { type: 'number', minimum: 1, maximum: 50 },
      category: { type: 'string', description: 'Filter slug kategori opsional' },
    },
    required: [],
  },
};
```

Ketika model AI meminta pemanggilan fungsi di atas, server perantara kami memvalidasi argumen masukan sebelum query SQL dijalankan. Hasilnya adalah presisi data 100% tanpa celah injeksi kode atau tebakan parameter liar.

## 3. Otomasi Review & Pengujian TDD Berbantuan AI

Di KanaKoding, kami menggunakan loop otomasi pengujian mandiri:
1. **Penyusunan Kontrak Uji (Red Step)**: Pengembang atau arsitek menyusun spesifikasi perilaku antarmuka dan kriteria penerimaan (*Acceptance Criteria*).
2. **Pemberian Konteks MCP**: Agen AI diberi akses hanya-baca ke berkas pengujian dan skema model.
3. **Generasi Implementasi Terisolasi**: AI menulis kode implementasi di cabang kerja terpisah (*isolated branch*).
4. **Verifikasi Terminal Nyata**: Subproses otomatis menjalankan `vitest run`. Jika ada kegagalan, kode kesalahan langsung dikembalikan ke model untuk diperbaiki secara terarah.

Dengan alur ini, waktu penyelesaian fitur rutin yang repetitif terpangkas hingga 60%, sementara insinyur senior kami dapat mengalokasikan fokus kognitif penuh mereka untuk arsitektur domain inti, audit keamanan, dan kepuasan pengalaman pengguna.

## 4. Pelajaran Utama: AI Adalah Pengungkit, Bukan Pengganti Fondasi Rekayasa

Eksperimen kami membuktikan satu kebenaran yang tak terbantahkan: **kemampuan agen AI berbanding lurus dengan kerapian arsitektur proyek tempat ia bekerja**.

Jika basis kode Anda berantakan, tanpa tipe data ketat, dan tanpa rangkaian tes otomatis, agen AI hanya akan mempercepat penumpukan utang teknis (*technical debt*). Namun, ketika basis kode Anda memiliki batas modular yang jelas dan dokumentasi yang disiplin, integrasi AI dan protokol MCP akan menjadi kekuatan pengganda (*force multiplier*) yang luar biasa bagi tim Anda.
