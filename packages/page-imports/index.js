const plugin = (pluginOptions = {}) => {
    const { imports = [] } = pluginOptions;
    return (nextConfig = {}) => {
        return Object.assign({}, nextConfig, {
            webpack(config, options) {
                if (imports && imports.length) {
                    config.module.rules.push({
                        enforce: 'pre',
                        test: /page\.(ts|js|tsx|jsx)$/,
                        use: [
                            {
                                loader: '@easykit/page-imports/loader.js',
                                options: pluginOptions
                            }
                        ],
                        include: /(app|src)/,
                    });
                }
                if (typeof nextConfig.webpack === 'function') {
                    return nextConfig.webpack(config, options)
                }
                return config
            },
        })
    }
}

export default plugin;
