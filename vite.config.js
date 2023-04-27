import { defineConfig } from "vite"
import { visualizer } from "rollup-plugin-visualizer"
import vue from "@vitejs/plugin-vue"
import path from "path"
import Components from "unplugin-vue-components/vite"

// https://vitejs.dev/config/
export default defineConfig((config) => ({
    plugins: [vue(), Components({}), visualizer()],
    // 關閉使用 ESBuild minify CSS，改使用 postCSS cssnano，設置見 postcss.config.cjs
    build: {
        cssMinify: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    chart: ["vue-chartjs", "chart.js"],
                },
            },
        },
    },
    // build production 時刪除 console、debugger
    esbuild: {
        drop: config.mode === "production" ? ["console", "debugger"] : [],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
}))
