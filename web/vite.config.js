import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://stingray-app-jmrty.ondigitalocean.app",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api1/, "/api"),
      },
      "/api2": {
        target: "https://urchin-app-5vle5.ondigitalocean.app", // 두 번째 백엔드 URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api2/, "/"), // API 경로 수정
      },
    },
  },
});
