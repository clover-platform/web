import type {Config} from 'tailwindcss';
import {tailwindConfig} from "@easykit/design/lib";
import {content} from "@clover/public/config/tailwind";
import ta from "tailwindcss-animate";
import plugin from "@easykit/common/plugin/tailwind";

const config: Config = {
    ...tailwindConfig,
    content,
    plugins: [
        ta,
        plugin
    ],
}
export default config;
