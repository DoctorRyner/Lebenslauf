import { defineConfig } from "vite"
import { resolve } from "path"
import dts from "vite-plugin-dts"
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"
import { dependencies } from "./package.json"

export default defineConfig({
  plugins: [dts(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, "./src/main.ts"),
      name: "uikit",
      fileName: "uikit",
    },
    rollupOptions: {
      external: [...Object.keys(dependencies)],
    },
  },
})
