import {DEFAULT_CONFIG} from "./config.js";
import {genConfig} from "./router.js";

class NextRouterMetaInfoPlugin {
    constructor(options) {
        this.options = {
            ...DEFAULT_CONFIG,
            ...options
        };
    }

    apply(compiler) {
        compiler.hooks.initialize.tap("NextRouterMetaInfoPlugin", (context, entry) => {
            genConfig(this.options);
        });
    }
}

export default NextRouterMetaInfoPlugin;
