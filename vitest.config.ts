import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "#sequelize": path.resolve(__dirname, "./sequelize")
    }
  },
  test: {
    globals: true,
    environment: "node"
  }
});