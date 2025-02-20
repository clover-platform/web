import {defaultConfig} from "./config.js";
import {exists, getBranchName, mkdirsSync, readDirSync, writeJSON} from "./utils.js";
import path from "path";
import fs from "fs";
import axios from "axios";

export class I18nClient {
    constructor() {
        this.initConfig();
    }

    initConfig() {
        defaultConfig.token = process.env.I18N_TOKEN;
        const rc = path.resolve(process.cwd(), "./.i18n.json");
        if(exists(rc)) {
            const data = fs.readFileSync(rc, 'utf8');
            Object.assign(defaultConfig, JSON.parse(data) || {});
        }
        this.config = defaultConfig;
    }

    async push() {
        const branchSuccess = await this.createBranchIfNotExists();
        if(!branchSuccess) {
            throw new Error("Branch creation failed");
        }
        const { paths, fileTypes, exclude, languages, fallback, dist, domain, module, token } = this.config;
        const files = [];
        paths.forEach((d) => {
            const dir = path.resolve(process.cwd(), `${d}`);
            if(!exists(dir)) return;
            const pathFiles = readDirSync(dir, fileTypes, exclude);
            files.push(...pathFiles);
        });
        const allWords = [];
        // 工程中所有的词条
        files.forEach((file) => {
            const data = fs.readFileSync(file);
            data.toString().replace(/(?<![a-zA-Z])t\(["'`](.*?)["'`][),]/g, (match, p1) => {
                // 去重 push
                if(!allWords.includes(p1)) {
                    allWords.push(p1);
                }
            });
        });
        // 读取已有的词条
        const source = languages.find(l => l.source)?.code || fallback;
        const dir = path.resolve(process.cwd(), `${dist}/${source}.json`);
        const sourceObject = {};
        allWords.forEach((word) => {
            sourceObject[word] = word;
        });

        const branch = await getBranchName();

        const r = await axios.post(`${domain}/api/i18n/open/${module}/branch/${branch}/entry/push`, sourceObject, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data);

        if(r.success) {
            if(!exists(dir)) {
                mkdirsSync(path.dirname(dir));
            }
            writeJSON(dir, sourceObject);
            console.log("Push success");
        }else{
            throw new Error(r.message);
        }
    }

    async createBranchIfNotExists() {
        const { domain, module, token, main } = this.config;
        const branch = await getBranchName();
        const r = await axios.post(`${domain}/api/i18n/open/${module}/branch/create/if/not/exist`, {
            name: branch,
            clone: main !== branch,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data);
        return r.success;
    }

    async pull() {
        const { languages, domain, module, token, dist } = this.config;
        const branch = await getBranchName();
        for(let l of languages) {
            if(l.source) continue;
            console.log("Pull " + l.code);
            const r = await axios.get(`${domain}/api/i18n/open/${module}/branch/${branch}/entry/pull`,{
                params: {
                    language: l.i18n
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => res.data);
            if(r.success) {
                const dir = path.resolve(process.cwd(), `${dist}/${l.code}.json`);
                writeJSON(dir, r.data);
                console.log("Pull success, save to " + dir);
            }else{
                throw new Error(r.message);
            }
        }
    }

}
