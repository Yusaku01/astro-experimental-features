import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // View Transitionsの実験に最適化された設定
  output: 'static',
  vite: {
    // 開発時のHMRでView Transitionsをテスト
    server: {
      hmr: {
        overlay: false,
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
