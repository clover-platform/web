const plugin = (pluginOptions = {}) => {
  const {
    test = /page\.(ts|js|tsx|jsx)$/,
    include = /(src\/app)/,
    imports = []
  } = pluginOptions;

  return (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
      webpack(config, options) {
        if (imports && imports.length) {
          config.module.rules.push({
            enforce: 'pre',
            test,
            use: [
              {
                loader: '@easykit/page-imports/loader.js',
                options: pluginOptions
              }
            ],
            include: include,
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
