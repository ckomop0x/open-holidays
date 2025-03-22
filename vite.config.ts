import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";
import path from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa';

/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {plugins: [
      react(),
      tsconfigPaths(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        },
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Public holidays',
          short_name: 'Public holidays',
          description: 'Public holidays',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'icons/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'icons/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      })

    ],
    server: {
      port: Number.parseInt(env.PORT),
    },
    css: {
      postcss: "./postcss.config.cjs",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/setupTests.ts",
      exclude: [
        "node_modules",
        "dist",
        "coverage",
        "postcss.config.js",
        "tailwind.config.js",
      ],
      coverage: {
        provider: "v8", // Use v8 for coverage
        reporter: ["text", "json", "lcov"], // Ensure JSON and LCOV formats for Codecov
        reportsDirectory: "coverage", // Make sure Codecov can find reports here
      },
    },
  }});
