import type { Config } from 'tailwindcss';
import plugin from "@easy-kit/common/plugin/tailwind";
import ta from 'tailwindcss-animate';
import coreConfig from '@easykit/design/lib/tailwind';

const config: Config = {
    ...coreConfig,
    content: [
        "./**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [
        ta,
        plugin
    ],
}
export default config
