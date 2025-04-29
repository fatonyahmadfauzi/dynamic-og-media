# Dynamic OG Metadata & Media Worker

Cloudflare Worker yang menyediakan OG Image & Video dinamis berdasarkan waktu lokal pengguna, dengan dukungan redirect langsung dan metadata Open Graph.

## Struktur Proyek

```bash
dynamic-og-media/
├── src/
│ └── worker.js # Kode utama Worker
├── wrangler.toml # Konfigurasi Cloudflare Worker
├── package.json # Dependensi dan skrip
└── README.md
```

## Deployment

1. **Clone repositori**

   ```bash
   git clone https://github.com/yourusername/dynamic-og-media.git
   cd dynamic-og-media
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Konfigurasi Wrangler**
   Buat file `wrangler.toml` dengan isi:

   ```bash
    name = "your-worker-name"
    main = "src/worker.js"
    compatibility_date = "2024-03-15"

    [build.upload]
    format = "service-worker"
   ```

4. Development Mode

   ```bash
   npm run dev
   ```

   Akses di `http://localhost:8787`

5. **Deploy ke Cloudflare**

   ```bash
   npm run deploy
   ```

## Cara Penggunaan

1. **Sebagai Meta Tags Langsung**

   ```html
   <!-- Di dalam <head> -->
   <meta property="og:video" content="https://your-worker.domain/video" />
   <meta property="og:video:type" content="video/mp4" />
   <meta property="og:video:width" content="1280" />
   <meta property="og:video:height" content="720" />
   ```

   <meta property="og:image" content="https://your-worker.domain/image"> 
   ```

2. **Sebagai Endpoint API**

   ```bash
   # Dapatkan metadata lengkap
   GET https://your-worker.domain/

   # Response contoh:

   {
    "og:image": "url_gambar",
    "og:video": "url_video",
    ...
   }
   ```

3. Redirect Langsung

   ```bash
    # Akses video langsung
    curl -L https://your-worker.domain/video

    # Akses gambar langsung
    curl -L https://your-worker.domain/image
   ```

## Konfigurasi

    Ubah parameter di `src/worker.js`:

    ```js
    // Sesuaikan URL media
    const ASSETS = {
    day: {
        image: "url_gambar_siang",
        video: "url_video_siang",
    },
    night: {
        image: "url_gambar_malam",
        video: "url_video_malam",
    },
    };

    // Atur jam siang/malam
    const DAY_HOURS = [6, 17]; // 06:00 - 17:59
    ```

## Integrasi dengan Situs Web

1. Tambahkan meta tags di HTML
2. Untuk CMS (WordPress/Next.js), buat komponen khusus:

   ```jsx
   // Contoh React Component
   const DynamicMeta = () => (
     <>
       <meta property="og:video" content={workerURL + "/video"} />
       <meta property="og:image" content={workerURL + "/image"} />
     </>
   );
   ```

## Catatan Penting

1. **Cache Control**:
   Worker menggunakan header no-store untuk memastikan konten selalu fresh

2. **Validasi OG Tags**:
   Gunakan tool berikut untuk test:

   - (Facebook Sharing Debugger)[https://developers.facebook.com/tools/debug/]
   - (Twitter Card Validator)[https://cards-dev.twitter.com/validator]

3. **Monitoring**:
   Pantau log Worker melalui Cloudflare Dashboard untuk melihat traffic

4. **Fallback Content**:
   Pastikan URL media alternatif tetap dapat diakses jika Worker down
