import i18next from "i18next";
import * as z from "zod";
import { zodI18nMap } from "zod-i18n-map";
import zhCNZod from "zod-i18n-map/locales/zh-CN/zod.json";
import zhTWZod from "zod-i18n-map/locales/zh-TW/zod.json";
import enUSZod from "zod-i18n-map/locales/en/zod.json";
import zhCNPublic from "@clover/public/assets/locale/zh-CN.json";
import zhTWPublic from "@clover/public/assets/locale/zh-TW.json";
import enUSPublic from "@clover/public/assets/locale/en-US.json";
import zhCN from "@/assets/locale/zh-CN.json";
import zhTW from "@/assets/locale/zh-TW.json";
import enUS from "@/assets/locale/en-US.json";
import zhCNEditor from "@easykit/editor/locales/zh-CN";
import zhTWEditor from "@easykit/editor/locales/zh-TW";
import enUSEditor from "@easykit/editor/locales/en-US";

i18next.init({
    ns: ["zod", "common"],
    resources: {
        'zh-CN': {
            zod: zhCNZod,
            editor: zhCNEditor,
            common: {
                ...zhCNPublic,
                ...zhCN
            },
        },
        'zh-TW': {
            zod: zhTWZod,
            editor: zhTWEditor,
            common: {
                ...zhTWPublic,
                ...zhTW
            },
        },
        'en-US': {
            zod: enUSZod,
            editor: enUSEditor,
            common: {
                ...enUSPublic,
                ...enUS
            },
        },
    },
}).then();
z.setErrorMap(zodI18nMap);