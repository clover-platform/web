import type { Config } from 'tailwindcss';
import plugin from '../common/plugin/tailwind';
import ta from 'tailwindcss-animate';
import coreConfig from '@atom-ui/core/lib/tailwind';

const config: Config = {
    ...coreConfig,
    content: [
        "../core/**/*.{js,ts,jsx,tsx,mdx}",
        "../common/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [
        ta,
        plugin
    ],
}
export default config
