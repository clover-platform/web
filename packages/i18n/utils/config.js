export const webpackConfig = {
    enforce: 'pre',
    test: /\.(ts|js|tsx|jsx)$/,
    loader: '@clover/i18n/utils/loader.js',
    include: /(app|assets|components|config|events|formatters|hooks|perms|plugins|state|rest|utils|validators)/
}