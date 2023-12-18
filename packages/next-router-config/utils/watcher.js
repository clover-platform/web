import chokidar from 'chokidar';
import {resolve} from "path";
import {DEFAULT_CONFIG} from "./config.js";
import {genConfig} from "./router.js";

export const init = (config = {}) => {
    Object.assign(config, DEFAULT_CONFIG);
    const root = resolve(config.base);
    let timer = null;
    chokidar.watch(root).on('all', (event, path) => {
        if(['add', 'change', 'unlink'].includes(event) && (path.endsWith('config.js') || path.endsWith('config.ts'))) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                genConfig(config);
            }, 500);
        }
    });
};

