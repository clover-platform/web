import i18next from "i18next";
import * as z from "zod";
import { zodI18nMap } from "zod-i18n-map";
import zhCNZod from "zod-i18n-map/locales/zh-CN/zod.json";
import zhTWZod from "zod-i18n-map/locales/zh-TW/zod.json";
import enUSZod from "zod-i18n-map/locales/en/zod.json";
import zhCNCommon from "@easykit/common/assets/locales/zh-CN.json";
import zhTWCommon from "@easykit/common/assets/locales/zh-TW.json";
import enUSCommon from "@easykit/common/assets/locales/en-US.json";
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
                ...zhCNCommon,
                ...zhCNPublic,
                ...zhCN
            },
        },
        'zh-TW': {
            zod: zhTWZod,
            common: {
                ...zhTWCommon,
                ...zhTWPublic,
                ...zhTW
            },
        },
        'en-US': {
            zod: enUSZod,
            common: {
                ...enUSCommon,
                ...enUSPublic,
                ...enUS
            },
        },
    },
}).then();
z.setErrorMap(zodI18nMap);
