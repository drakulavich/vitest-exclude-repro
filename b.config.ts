import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    projects: [
      { extends: true, test: { name: "unit", include: ["**/*.test.ts"], exclude: ["**/node_modules/**"] } },
      { extends: true, test: { name: "other", include: ["**/*.test.ts"] } },
    ],
  },
});
