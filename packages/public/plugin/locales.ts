import i18next from "i18next";
import * as z from "zod";
import { zodI18nMap } from "zod-i18n-map";
import zhCNZod from "zod-i18n-map/locales/zh-CN/zod.json";
import enUSZod from "zod-i18n-map/locales/en/zod.json";
import zhCN from "@clover/public/assets/locale/zh-CN.json";
import enUS from "@clover/public/assets/locale/en-US.json";
import enAgo from 'javascript-time-ago/locale/en'
import zhCNAgo from 'javascript-time-ago/locale/zh'
import TimeAgo from "javascript-time-ago";
TimeAgo.addLocale(zhCNAgo);
TimeAgo.addLocale(enAgo);
i18next.init({
    ns: ["zod", "common"],
    resources: {
        'zh-CN': {
            zod: zhCNZod,
            common: zhCN,
        },
        'en-US': {
            zod: enUSZod,
            common: enUS,
        },
    },
}).then();
z.setErrorMap(zodI18nMap);
