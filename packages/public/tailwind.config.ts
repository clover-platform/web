import type {Config} from 'tailwindcss';
import ta from 'tailwindcss-animate';
import {tailwindConfig} from '@easykit/design/lib';

const config: Config = {
  ...tailwindConfig,
  content: [
    "./**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    ta,
  ],
}
export default config
