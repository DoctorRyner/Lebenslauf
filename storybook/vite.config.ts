import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [".."],
    },
  },
  resolve: {
    alias: {
      shared: resolve(__dirname, "../packages/uikit/src/shared.module.scss"),
      theme: resolve(__dirname, "../packages/uikit/src/shared.module.scss"),
      uikit: resolve(__dirname, "../packages/uikit/src"),
    },
  },
})
