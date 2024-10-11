import type {Config} from 'tailwindcss';
import {tailwindConfig } from "@easykit/design/lib";
import ta from "tailwindcss-animate";
import plugin from "@easy-kit/common/plugin/tailwind";

const config: Config = {
    ...tailwindConfig,
    content: [
        "../../packages/core/components/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/common/components/**/*.{js,ts,jsx,tsx,mdx}",
        "../public/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [
        ta,
        plugin
    ],
}
export default config


