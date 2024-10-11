import type { Config } from 'tailwindcss';
import plugin from "@easy-kit/common/plugin/tailwind";
import ta from 'tailwindcss-animate';
import {tailwindConfig} from '@easykit/design/lib';

const config: Config = {
    ...tailwindConfig,
    content: [
        "./**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [
        ta,
        plugin
    ],
}
export default config
