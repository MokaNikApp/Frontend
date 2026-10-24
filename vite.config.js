import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // One service worker handles BOTH offline caching and Firebase push.
      // Keeping the filename means existing registrations in main.jsx and
      // useFcmToken.js keep working unchanged.
      strategies: "injectManifest",
      srcDir: "src",
      filename: "firebase-messaging-sw.js",
      injectRegister: false,
      registerType: "autoUpdate",
      injectManifest: { globPatterns: ["**/*.{js,css,html,png,svg,ico,webp,woff2}"] },
      manifest: {
        name: "Mokanik",
        short_name: "Mokanik",
        description: "Book trusted mechanics and car services.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#1C52AF",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
});


