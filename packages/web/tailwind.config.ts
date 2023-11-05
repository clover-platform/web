import type { Config } from 'tailwindcss';
import plugin from '../common/plugin/tailwind.js';

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "../common/**/*.{js,ts,jsx,tsx,mdx}",
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
