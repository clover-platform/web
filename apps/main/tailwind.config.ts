import type {Config} from 'tailwindcss';
import coreConfig, {commonContent} from "@easykit/design/lib/tailwind";
import ta from "tailwindcss-animate";
import plugin from "@easy-kit/common/plugin/tailwind";

const config: Config = {
    ...coreConfig,
    content: commonContent,
    plugins: [
        ta,
        plugin
    ],
}
export default config


