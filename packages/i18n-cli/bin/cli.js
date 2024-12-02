#!/usr/bin/env node
import program from 'commander';
import chalk from 'chalk';
import Module from "node:module";
import {I18nClient} from "../lib/client.js";
const require = Module.createRequire(import.meta.url);
const pkg = require('../package.json');

program
    .usage('i18n-cli')
    .version(pkg.version, '-v, --version')
    .description(chalk(`[ ${pkg.description} - ${pkg.version} ]`).green);

program
    .command('pull')
    .description('Pull all translations.')
    .action(function (args,otherArgs,cmd) {
        const client = new I18nClient();
        client.pull().then();
    });

program
    .command('push')
    .description('Push the entries in the current branch change code')
    .action(function (args,otherArgs,cmd) {
        const client = new I18nClient();
        client.push().then();
    });

program.parse(process.argv);
