// DEPENDENCIES
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    coverage: {
      include: ["src/**/*.{js,vue}"],
      exclude: [
        ...configDefaults.exclude,
        "src/main.js",
        "src/router/index.js",
      ],
    },
  },
});
