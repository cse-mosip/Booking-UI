import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";
import svgrPlugin from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  envPrefix: "REACT_APP_",

  plugins: [
    react(),
    envCompatible(),
    tsconfigPaths(),
    svgrPlugin({ icon: true }),
  ],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
    open: true, 
  },
});
