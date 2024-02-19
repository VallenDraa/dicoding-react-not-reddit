import { defineConfig } from 'vite';
import postcssNested from 'postcss-nested';
import react from '@vitejs/plugin-react-swc';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: 'not-reddit-[local]_[hash:base64:5]',
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
