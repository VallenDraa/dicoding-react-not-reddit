import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import purgecss from '@fullhuman/postcss-purgecss';

export default {
  map: true,
  plugins: [
    purgecss({ content: ['./src/**/*.jsx', './index.html'] }),
    postcssNested,
    autoprefixer,
  ],
};
