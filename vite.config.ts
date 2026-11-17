import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Понятные имена файлов вместо index-случайныйХеш.js.
        entryFileNames: "assets/js/[name].js",
        chunkFileNames: "assets/js/[name].js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? "file";
          if (name.endsWith(".css")) return "assets/css/[name][extname]";
          if (/\.(png|jpe?g|gif|svg|webp|avif|ico)$/i.test(name)) {
            return "assets/images/[name][extname]";
          }
          if (/\.(woff2?|ttf|otf)$/i.test(name)) {
            return "assets/fonts/[name][extname]";
          }
          return "assets/files/[name][extname]";
        },
      },
    },
  },
});
