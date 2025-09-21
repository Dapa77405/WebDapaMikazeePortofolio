# Modern Anime Portfolio (React + Vite + Tailwind)

Portofolio modern dengan banyak animasi, efek tilt/parallax, gradient dinamis, dan komponen interaktif. Dibangun menggunakan React, Vite, Tailwind CSS, Framer Motion, dan react-parallax-tilt.

Fitur utama:
- Navigasi sticky dengan active section highlight dan menu mobile.
- Section lengkap: Hero, About, Skills, Projects, Experience, Testimonials, Contact, Footer.
- Animasi halus (Framer Motion), parallax tilt, gradient animasi, icon floating, dan custom cursor trail.
- Kartu interaktif dengan efek hover glow dan glare.
- Form kontak (Formspree) siap pakai.
- Tailwind sudah terkonfigurasi.

## Menjalankan secara lokal

1. Install dependency:
   npm install

2. Jalanan server dev:
   npm run dev

3. Buka di browser sesuai alamat yang muncul (biasanya http://localhost:5173)

## Build untuk produksi

npm run build

Hasil build ada di folder dist, jalankan preview:

npm run preview

## Kustomisasi Cepat
- Ganti nama dan branding di Navbar (src/App.jsx, komponen Navbar dan Footer).
- Ubah foto/ilustrasi karakter anime pada komponen Hero (src/App.jsx) atau tambahkan aset lokal.
- Ganti data proyek pada konstanta projectsData di src/App.jsx.
- Edit warna dasar di src/index.css (CSS variables) dan tailwind.config.cjs.
- Ganti tautan sosial dan email/telepon di bagian Contact/Footer.
- Ganti resume dengan file PDF asli pada public/resume.pdf.

Lisensi: MIT