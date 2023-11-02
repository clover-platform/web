import type { Config } from 'tailwindcss';
import plugin from '../common/plugin/tailwind.js';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [ plugin ],
    corePlugins: {
        preflight: false,
    }
}
export default config
