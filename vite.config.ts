import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        // "if-function" comes from inside include-media's own source (the
        // unmaintained library, scheduled for removal in the UI refresh).
        // Our own files are fully on modern @use syntax now.
        silenceDeprecations: ["if-function"],
      },
    },
  },
});
