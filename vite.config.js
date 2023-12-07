import { defineConfig } from "vite";
// https://www.npmjs.com/package/@vitejs/plugin-react
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // DISABLE_NEW_JSX_TRANSFORM=true 在 vite 中使用 jsxRuntime
  plugins: [react({ jsxRuntime: "classic" })],
});
