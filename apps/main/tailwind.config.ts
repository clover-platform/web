import type {Config} from 'tailwindcss';
import { tailwindConfig } from "@easykit/design/lib";
import ta from "tailwindcss-animate";
import plugin from "@easy-kit/common/plugin/tailwind";
import {content} from "@clover/public/config/tailwind";

const config: Config = {
    ...tailwindConfig,
    content,
    plugins: [
        ta,
        plugin
    ],
}
export default config;
