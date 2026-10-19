import { defineConfig } from "vitest/config";
export default defineConfig({
  test: { exclude: ["**/node_modules/**"], projects: [{ extends: true, test: { name: "only" } }] },
});
