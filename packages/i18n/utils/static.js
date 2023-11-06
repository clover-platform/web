import path from 'path';
import unescapeJs from 'unescape-js';
import gulp from 'gulp';
import jet from 'fs-jetpack';
import chalk from "chalk";
import replace from "gulp-replace";

const dirVars = {
    i18nDir: path.resolve(process.cwd(), 'i18n'),
    buildDir: path.resolve(process.cwd(), 'out')
};

let base = 'en-us';
let staticDir = 'assets';
let data = {};
let supports = [];

function langKeyHandler(gulpInstance, lang) {
    const currLangObj = data[lang];
    return gulpInstance
        .pipe(replace(/(?:{|%7B)#(((?!({|%7B)#).)*?)#(}|%7D):for\((.*?)\)/g, (res) => {
            const result = unescapeJs(res);
            return result.replace(/{#(.*?)#}:for\((.*?)\)/g, (_, $1, $2) => {
                return currLangObj[`${$1}:for(${$2})`] || $1;
            })
        }))
        .pipe(replace(/(?:{|%7B)#(.*?)#(}|%7D)/g, (res, tar) => {
            const uKey = unescapeJs(tar);
            return currLangObj[uKey] || tar;
        }))
        .pipe(replace(/%7B\/#LANG#}/g, lang))
        .pipe(replace(/{\/#LANG#}/g, lang))
        .pipe(replace(/\/_next\//g, (res, tar) => {
            return '/' + staticDir + '/' + lang + '/';
        }));
}

function buildFileHandler() {
    const nextStaticDir = path.resolve(dirVars.buildDir, '_next');
    const jobs = supports.map((lang) => {
        return new Promise((resolve) => {
            // 处理HTML
            const targetDir = path.resolve(dirVars.i18nDir, lang);
            langKeyHandler(gulp.src(['**/*'], {
                cwd: path.resolve(dirVars.buildDir, lang)
            }), lang)
                .pipe(gulp.dest(targetDir))
                .on('end', () => {
                    if (lang === base) {
                        jet.copy(targetDir, dirVars.i18nDir, {
                            matching: ['**/*.html'],
                            overwrite: true
                        });
                    }
                    console.log(chalk.green(`${lang} done`), chalk.red(`${lang === base ? '[base]' : ''}`));
                    resolve();
                });
            // 处理静态资源
            const assetsDir = path.resolve(dirVars.i18nDir, staticDir + '/' + lang);
            langKeyHandler(gulp.src(['**/*'], {
                cwd: nextStaticDir
            }), lang)
                .pipe(gulp.dest(assetsDir))
        });
    });
    return Promise.all(jobs);
}

function staticFileHandler() {
    jet.copy(dirVars.buildDir, dirVars.i18nDir, {
        matching: ['favicon.ico', 'assets/**/*'],
        overwrite: true
    });
}

const init = (config) => {
    base = config.base || 'en-us';
    supports = config.supports || ['en-us'];
    staticDir = config['staticDir'] || 'assets';
    const defaultData = {};
    supports.forEach((key) => {
        defaultData[key] = {};
    })
    data = config.data || defaultData;
}

const build = async (config) => {
    init(config);
    jet.remove(dirVars.i18nDir);
    await buildFileHandler();
    staticFileHandler();
    console.log(chalk.yellow('all done'));
}

export default build;