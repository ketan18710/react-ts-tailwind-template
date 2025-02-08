import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run dev",
    port: 5173,
    timeout: 120 * 1000,
    reuseExistingServer: true,
  },
  use: {
    baseURL: "http://localhost:5173",
    headless: false,
    viewport: { width: 390, height: 844 },
    trace: "on-first-retry",
  },
});
