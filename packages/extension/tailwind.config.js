import ta from 'tailwindcss-animate';
import coreConfig from '@easykit/design/lib/tailwind';

/** @type {import('tailwindcss').Config} */
module.exports = {
    ...coreConfig,
    content: [
        "../core/**/*.tsx",
        "../launcher/**/*.tsx"
    ],
    plugins: [
        ta,
    ],
}

