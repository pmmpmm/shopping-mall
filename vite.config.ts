import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { compression } from "vite-plugin-compression2";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), compression()],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  server: {
    host: "0.0.0.0",
    port: 8090
  }
});
