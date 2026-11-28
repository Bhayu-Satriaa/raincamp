import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  oxc: { lang: "jsx", include: /\.(js|jsx)$/, exclude: /node_modules/ },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
    coverage: {
      provider: "v8",
      include: ["lib/**", "components/**", "context/**", "hooks/**"],
    },
  },
});
