import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, Scale, ArrowLeft, Mail } from 'lucide-react';
import { BRAND_INFO } from '../data/siteData';
import { smoothScrollToY } from '../utils/smoothScroll';
import { updatePageSeo } from '../utils/seo';

interface LegalPageProps {
  type: 'privasi' | 'tos' | 'disclaimer';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  useEffect(() => {
    smoothScrollToY(0, 500);
    if (type === 'privasi') {
      updatePageSeo({
        title: `Kebijakan Privasi — ${BRAND_INFO.name}`,
        description:
          'Kebijakan Privasi KanaKoding mengenai pengelolaan data pengunjung, penggunaan cookie, serta penayangan iklan pihak ketiga (Google AdSense).',
        canonicalPath: '/privasi',
      });
    } else if (type === 'tos') {
      updatePageSeo({
        title: `Syarat & Ketentuan Layanan (ToS) — ${BRAND_INFO.name}`,
        description:
          'Syarat dan Ketentuan penggunaan situs web, materi edukasi pemrograman, serta layanan konsultasi teknologi KanaKoding.',
        canonicalPath: '/tos',
      });
    } else {
      updatePageSeo({
        title: `Disclaimer & Pedoman Editorial — ${BRAND_INFO.name}`,
        description:
          'Pernyataan sanggahan (Disclaimer) dan standar pedoman editorial artikel teknis di blog KanaKoding.',
        canonicalPath: '/disclaimer',
      });
    }
  }, [type]);

  return (
    <div className="min-h-screen bg-[#0F0704] text-[#F7F1EB] pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#C7B6A6] hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/privasi"
              className={`px-3.5 py-2 rounded-[8px] text-xs font-medium transition-colors ${
                type === 'privasi'
                  ? 'bg-amber-500 text-[#1A0B05] font-bold'
                  : 'bg-[#180C06] text-[#C7B6A6] border border-white/12 hover:text-white'
              }`}
            >
              Kebijakan Privasi
            </Link>
            <Link
              to="/tos"
              className={`px-3.5 py-2 rounded-[8px] text-xs font-medium transition-colors ${
                type === 'tos'
                  ? 'bg-amber-500 text-[#1A0B05] font-bold'
                  : 'bg-[#180C06] text-[#C7B6A6] border border-white/12 hover:text-white'
              }`}
            >
              Syarat &amp; Ketentuan
            </Link>
            <Link
              to="/disclaimer"
              className={`px-3.5 py-2 rounded-[8px] text-xs font-medium transition-colors ${
                type === 'disclaimer'
                  ? 'bg-amber-500 text-[#1A0B05] font-bold'
                  : 'bg-[#180C06] text-[#C7B6A6] border border-white/12 hover:text-white'
              }`}
            >
              Disclaimer &amp; Editorial
            </Link>
          </div>
        </div>

        <article className="p-6 sm:p-10 rounded-[8px] bg-[#150A05] border border-white/15 space-y-6">
          {type === 'privasi' && (
            <>
              <div className="flex items-center gap-3 pb-4 border-b border-white/12">
                <div className="p-2.5 rounded-[8px] bg-[#221109] text-amber-400 border border-amber-500/25">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    Kebijakan Privasi (Privacy Policy)
                  </h1>
                  <p className="text-xs text-[#B5A392] mt-0.5">
                    Terakhir diperbarui: Oktober 2026 • Berlaku untuk kanakoding.com
                  </p>
                </div>
              </div>

              <div className="space-y-5 text-sm sm:text-base text-[#D5C7B8] leading-relaxed">
                <p>
                  Di <strong className="text-white">KanaKoding</strong>, privasi pengunjung
                  kami adalah salah satu prioritas utama kami. Dokumen Kebijakan Privasi ini
                  menjelaskan jenis informasi yang dikumpulkan dan dicatat oleh KanaKoding
                  serta bagaimana kami menggunakannya secara bertanggung jawab.
                </p>

                <h2 className="text-lg sm:text-xl font-bold text-white pt-2">
                  1. Informasi yang Kami Kumpulkan &amp; Log Files
                </h2>
                <p>
                  KanaKoding mengikuti prosedur standar penggunaan berkas log (*log files*).
                  Informasi yang dikumpulkan mencakup alamat protokol internet (IP), jenis
                  peramban (*browser*), Penyedia Layanan Internet (ISP), stempel tanggal dan
                  waktu, halaman rujukan/keluar, serta jumlah klik untuk menganalisis tren dan
                  mengelola situs. Informasi ini tidak terkait dengan informasi apa pun yang
                  dapat diidentifikasi secara pribadi.
                </p>

                <h2 className="text-lg sm:text-xl font-bold text-white pt-2">
                  2. Cookie dan Web Beacons
                </h2>
                <p>
                  Seperti situs web modern lainnya, KanaKoding menggunakan *cookie* untuk
                  menyimpan informasi preferensi pengunjung dan mengoptimalkan pengalaman
                  membaca artikel maupun navigasi layanan berdasarkan jenis peramban yang
                  digunakan pengunjung.
                </p>

                <h2 className="text-lg sm:text-xl font-bold text-white pt-2">
                  3. Cookie Google DoubleClick DART &amp; Mitra Periklanan (Google AdSense)
                </h2>
                <p>
                  Google adalah salah satu vendor pihak ketiga di situs kami. Google juga
                  menggunakan *cookie*, yang dikenal sebagai *cookie* DART, untuk menayangkan
                  iklan kepada pengunjung situs kami berdasarkan kunjungan mereka ke situs ini
                  dan situs lainnya di internet. Pengunjung dapat memilih untuk menolak
                  penggunaan *cookie* DART dengan mengunjungi Kebijakan Privasi jaringan iklan
                  dan konten Google di tautan berikut:{' '}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 underline"
                  >
                    https://policies.google.com/technologies/ads
                  </a>
                  .
                </p>

                <h2 className="text-lg sm:text-xl font-bold text-white pt-2">
                  4. Formulir Kontak &amp; Konsultasi Proyek
                </h2>
                <p>
                  Ketika Anda menghubungi kami melalui formulir konsultasi proyek atau email,
                  data seperti Nama Lengkap, Alamat Email, dan rincian kebutuhan proyek hanya
                  digunakan secara eksklusif untuk merespons permintaan Anda dan tidak pernah
                  dijual atau dibagikan kepada pihak ketiga untuk tujuan pemasaran tanpa izin.
                </p>

                <h2 className="text-lg sm:text-xl font-bold text-white pt-2">
                  5. Persetujuan Anda
                </h2>
                <p>
                  Dengan menggunakan situs web kami, Anda dengan ini menyetujui Kebijakan
                  Privasi kami dan menyetujui syarat serta ketentuannya.
                </p>
              </div>
            </>
          )}

          {type === 'tos' && (
            <>
              <div className="flex items-center gap-3 pb-4 border-b border-white/12">
                <div className="p-2.5 rounded-[8px] bg-[#221109] text-amber-400 border border-amber-500/25">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    Syarat &amp; Ketentuan Layanan (Terms of Service)
                  </h1>
                  <p className="text-xs text-[#B5A392] mt-0.5">
                    Terakhir diperbarui: Oktober 2026 • Berlaku untuk kanakoding.com
                  </p>
                </div>
              </div>

              <div className="space-y-5 text-sm sm:text-base text-[#D5C7B8] leading-relaxed">
                <p>
                  Selamat datang di <strong className="text-white">KanaKoding</strong>. Dengan
                  mengakses situs web ini, Anda setuju untuk terikat oleh Syarat dan Ketentuan
                  Penggunaan situs web ini serta seluruh peraturan perundang-undangan yang
                  berlaku di Republik Indonesia.
                </p>

                <h2 className="text-lg sm:text-xl font-bold text-white pt-2">
                  1. Hak Kekayaan Intelektual &amp; Lisensi Konten
                </h2>
                <p>
                  Seluruh materi artikel, studi kasus, ilustrasi merek, dan logo di situs ini
                  adalah milik KanaKoding kecuali dinyatakan lain. Cuplikan kode (*code
                  snippets*) yang dibagikan pada artikel tutorial dapat digunakan untuk tujuan
                  pembelajaran dan pengembangan proyek Anda, namun dilarang menyalin ulang
                  seluruh isi artikel secara utuh (*scraping/republishing*) tanpa izin tertulis
                  atau atribusi tautan sumber yang jelas.
                </p>

                <h2 className="text-lg sm:text-xl font-bold text-white pt-2">
                  2. Layanan Pengembangan &amp; Konsultasi IT
                </h2>
                <p>
                  Setiap kerja sama pengembangan perangkat lunak (*Project Development*) dan
                  konsultasi sistem diatur lebih lanjut melalui dokumen Perjanjian Kerja Sama
                  (PKS) atau *Statement of Work* (SoW) tersendiri yang disepakati bersama klien.
                </p>

                <h2 className="text-lg sm:text-xl font-bold text-white pt-2">
                  3. Etika Penggunaan Situs &amp; Layanan
                </h2>
                <p>
                  Pengguna dilarang memanfaatkan situs atau layanan publikasi KanaKoding untuk
                  menyebarkan konten berbahaya (*malware*), *spam*, pelanggaran hak cipta, atau
                  aktivitas yang melanggar hukum.
                </p>
              </div>
            </>
          )}

          {type === 'disclaimer' && (
            <>
              <div className="flex items-center gap-3 pb-4 border-b border-white/12">
                <div className="p-2.5 rounded-[8px] bg-[#221109] text-amber-400 border border-amber-500/25">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    Disclaimer &amp; Pedoman Editorial
                  </h1>
                  <p className="text-xs text-[#B5A392] mt-0.5">
                    Terakhir diperbarui: Oktober 2026 • Standar Kualitas Konten KanaKoding
                  </p>
                </div>
              </div>

              <div className="space-y-5 text-sm sm:text-base text-[#D5C7B8] leading-relaxed">
                <p>
                  Seluruh artikel teknis, panduan pemrograman, dan analisis bisnis digital yang
                  diterbitkan di blog <strong className="text-white">KanaKoding</strong> ditulis
                  dan ditinjau oleh praktisi rekayasa perangkat lunak untuk tujuan informasi
                  serta edukasi.
                </p>

                <h2 className="text-lg sm:text-xl font-bold text-white pt-2">
                  1. Standar Editorial &amp; Verifikasi Teknis
                </h2>
                <p>
                  Tim redaksi KanaKoding berkomitmen menyajikan konten orisinal yang berangkat
                  dari pengalaman implementasi nyata di industri. Setiap contoh kode dan
                  rekomendasi arsitektur diuji terlebih dahulu, namun karena ekosistem
                  perangkat lunak terus berkembang, pembaca disarankan menyesuaikan konfigurasi
                  dengan versi pustaka dan lingkungan produksi masing-masing.
                </p>

                <h2 className="text-lg sm:text-xl font-bold text-white pt-2">
                  2. Tautan Eksternal
                </h2>
                <p>
                  Dari situs web kami, Anda dapat mengunjungi dokumentasi resmi atau situs
                  eksternal melalui tautan keluar (*outbound links*). Meskipun kami berupaya
                  menyertakan tautan berkualitas dan aman, kami tidak memiliki kendali atas
                  perubahan konten pada situs pihak ketiga tersebut.
                </p>
              </div>
            </>
          )}

          <div className="pt-6 border-t border-white/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#B5A392]">
            <span>
              Pertanyaan terkait kebijakan ini? Hubungi kami di{' '}
              <a href={`mailto:${BRAND_INFO.email}`} className="text-amber-400 underline">
                {BRAND_INFO.email}
              </a>
            </span>
            <a
              href={`mailto:${BRAND_INFO.email}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-amber-500 text-[#1A0B05] font-bold hover:bg-amber-400 transition-colors self-start sm:self-auto"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Hubungi Redaksi</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  );
};
