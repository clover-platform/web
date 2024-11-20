import type {Config} from "tailwindcss";

export default {
    content: [
        "../../packages/core/components/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/common/components/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/public/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            width: {
                "input-xl": "720px",
                "input-lg": "560px",
                "input-md": "400px",
                "input-sm": "320px",
                "input-xs": "240px",
            },
        }
    }
} as Config;
