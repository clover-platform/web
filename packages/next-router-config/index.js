import NextRouterMetaInfoPlugin from './utils/plugin.js';
import { init } from './utils/watcher.js';

const plugin = (pluginOptions = {}) => {
    const { enabled = true } = pluginOptions;
    return (nextConfig = {}) => {
        return Object.assign({}, nextConfig, {
            webpack(config, options) {
                if (enabled) {
                    init(pluginOptions);
                    config.plugins.push(new NextRouterMetaInfoPlugin(pluginOptions))
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
