# Dynamic OG Metadata & Media Worker

Cloudflare Worker yang menghasilkan OG metadata dinamis dan menangani media berdasarkan zona waktu pengguna.

## Fitur Utama

- Menentukan media (gambar & video) berdasarkan waktu lokal pengguna
  - Siang (06:00 - 17:59): Gambar terang & video terang
  - Malam (18:00 - 05:59): Gambar gelap & video gelap
- Endpoint redirect untuk media langsung
- Respons JSON dengan metadata OG lengkap
- Header pencegahan cache
- Mendukung CORS

## Penggunaan

### Endpoint Utama

`GET /`

Mengembalikan JSON dengan metadata OG:

```json
{
"og:image": "URL_GAMBAR",
"og:video": "URL_VIDEO",
...
}
```

**Redirect Media Langsung**

- Gambar:
  ```bash
  GET /image
  ```
  Redirect 307 ke gambar yang sesuai
- Video:
  ```bash
  GET /video
  ```
  Redirect 307 ke video yang sesuai

### Contoh Curl

```bash
# Dapatkan metadata
curl https://your-worker.url/

# Akses gambar langsung
curl -L https://your-worker.url/image

# Akses video langsung
curl -L https://your-worker.url/video
```

## Instalasi & Deployment

1. Clone repositori
2. Install dependencies
   ```bash
   npm install
   ```
3. Development mode
   ```bash
   npm run dev
   ```
   Akses di (http://localhost:8787)[http://localhost:8787]
4. Deploy ke Cloudflare
   ```bash
   npm run deploy
   ```

## Konfigurasi

Ubah variabel berikut di kode untuk penyesuaian:

- URL gambar/video siang & malam
- Kriteria waktu siang/malam
- Dimensi video
- Metadata teks (judul, deskripsi)

## Catatan

- Menggunakan zona waktu Cloudflare (request.cf.timezone)
- Header cache-control: no-store untuk pembaruan real-time
- Format waktu: Unix timestamp untuk og:updated_time

## Dokumentasi ini mencakup:

1. Deskripsi umum proyek
2. Fitur-fitur utama
3. Cara penggunaan endpoint
4. Instruksi instalasi dan deployment
5. Poin-poin konfigurasi
6. Catatan teknis penting

Anda bisa menyesuaikan bagian URL contoh dan penjelasan konfigurasi sesuai dengan kebutuhan aktual proyek.
