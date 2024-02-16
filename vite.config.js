import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// postcss plugins
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import purgecss from '@fullhuman/postcss-purgecss';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      map: true,
      plugins: [
        purgecss({ content: ['./src/**/*.jsx', './index.html'] }),
        postcssNested,
        autoprefixer,
      ],
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
