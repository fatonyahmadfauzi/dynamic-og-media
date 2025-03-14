/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


export default {
    async fetch(request) {
      const url = new URL(request.url);
      const headers = new Headers();
  
      // Ambil zona waktu pengguna dari Cloudflare
      const timezone = request.cf?.timezone || "UTC";
      const now = new Date();
      const currentHour = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        hour12: false
      }).format(now);
  
      // Tentukan video & gambar berdasarkan waktu
      const isDaytime = currentHour >= 6 && currentHour < 18;
      const ogImage = isDaytime
        ? "https://fatonyahmadfauzi.netlify.app/assets/light.webp"
        : "https://fatonyahmadfauzi.netlify.app/assets/dark.webp";
  
      const ogVideo = isDaytime
        ? "https://fatonyahmadfauzi.netlify.app/assets/bg-light.mp4"
        : "https://fatonyahmadfauzi.netlify.app/assets/bg-dark.mp4";
  
      const updatedTime = Math.floor(Date.now() / 1000); // Waktu dalam Unix timestamp
  
      // Jika permintaan ke /image atau /video, redirect ke media yang sesuai
      if (url.pathname === "/image") {
        return Response.redirect(ogImage, 307);
      } else if (url.pathname === "/video") {
        return Response.redirect(ogVideo, 307);
      }
  
      // Set header untuk mencegah cache
      headers.set("Content-Type", "application/json");
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
      headers.set("Pragma", "no-cache");
      headers.set("Expires", "0");
      headers.set("Vary", "User-Agent");
  
      // Buat response JSON untuk OG metadata
      const data = {
        "og:image": ogImage,
        "og:video": ogVideo,
        "og:video:type": "video/mp4",
        "og:video:width": "1280",
        "og:video:height": "720",
        "og:updated_time": updatedTime, // Tambahkan ini
        "twitter:image": ogImage,
        "twitter:card": "player",
        "twitter:title": "bg-video",
        "twitter:description": "Background Video untuk hero section pada website.",
        "twitter:player": ogVideo,
        "twitter:player:width": "1280",
        "twitter:player:height": "720"
      };    
  
      return new Response(JSON.stringify(data), { headers });
    }
};
  