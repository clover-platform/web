import type {Config} from 'tailwindcss';
import {tailwindConfig } from "@easykit/design/lib";
import ta from "tailwindcss-animate";
import plugin from "@easykit/common/plugin/tailwind";
import publicConfig from "@clover/public/config/tailwind";
import merge from "lodash/merge";

const config: Config = {
    ...merge(tailwindConfig, publicConfig),
    plugins: [
        ta,
        plugin
    ],
}
export default config;
