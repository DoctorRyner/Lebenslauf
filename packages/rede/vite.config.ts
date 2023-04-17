import { resolve } from "path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { dependencies } from "./package.json"

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: resolve(__dirname, "./src/main.ts"),
      name: "rede",
      fileName: "rede",
    },
    rollupOptions: {
      external: [...Object.keys(dependencies)],
    },
  },
})
