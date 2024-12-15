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
            spacing: {
                "2xs": "4px",
                "xs": "8px",
                "sm": "12px",
                "md": "16px",
                "lg": "20px",
                "xl": "24px",
                "2xl": "28px",
                "3xl": "32px",
                "4xl": "36px",
                "5xl": "40px",
                "6xl": "48px",
                "7xl": "56px",
            },
        }
    }
} as Config;
