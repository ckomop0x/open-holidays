import { defineConfig } from "vitest/config";
import path from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
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
});
