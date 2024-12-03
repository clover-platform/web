import i18next from "i18next";
import * as z from "zod";
import { zodI18nMap } from "zod-i18n-map";
import zhCNZod from "zod-i18n-map/locales/zh-CN/zod.json";
import zhTWZod from "zod-i18n-map/locales/zh-TW/zod.json";
import enUSZod from "zod-i18n-map/locales/en/zod.json";
import zhCNPublic from "@clover/public/assets/locales/zh-CN.json";
import zhTWPublic from "@clover/public/assets/locales/zh-TW.json";
import enUSPublic from "@clover/public/assets/locales/en-US.json";
import zhCN from "@/assets/locales/zh-CN.json";
import zhTW from "@/assets/locales/zh-TW.json";
import enUS from "@/assets/locales/en-US.json";

i18next.init({
    ns: ["zod", "common"],
    resources: {
        'zh-CN': {
            zod: zhCNZod,
            common: {
                ...zhCNPublic,
                ...zhCN
            },
        },
        'zh-TW': {
            zod: zhTWZod,
            common: {
                ...zhTWPublic,
                ...zhTW
            },
        },
        'en-US': {
            zod: enUSZod,
            common: {
                ...enUSPublic,
                ...enUS
            },
        },
    },
}).then();
z.setErrorMap(zodI18nMap);
