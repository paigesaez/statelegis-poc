import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      // Ensure proper handling of JSON imports
      onwarn(warning, warn) {
        // Ignore certain warnings
        if (warning.code === "CIRCULAR_DEPENDENCY") return
        warn(warning)
      },
    },
  },
})
