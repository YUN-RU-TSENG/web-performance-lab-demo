import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig((config) => ({
    plugins: [vue()],
    // 關閉使用 ESBuild minify CSS，改使用 postCSS cssnano，設置見 postcss.config.cjs
    build: {
        cssMinify: false,
    },
    // build production 時刪除 console、debugger
    esbuild: {
        drop: config.mode === "production" ? ["console", "debugger"] : [],
    },
}))
