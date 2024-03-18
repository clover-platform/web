import type {Config} from 'tailwindcss';
import coreConfig from "@atom-ui/core/lib/tailwind";
import ta from "tailwindcss-animate";
import plugin from "@easy-kit/common/plugin/tailwind";

const config: Config = {
    ...coreConfig,
    content: [
        "../core/components/**/*.{js,ts,jsx,tsx,mdx}",
        "../common/components/**/*.{js,ts,jsx,tsx,mdx}",
        "../web-public/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [
        ta,
        plugin
    ],
}
export default config

