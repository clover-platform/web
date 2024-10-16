import i18next from "i18next";
import * as z from "zod";
import { zodI18nMap } from "zod-i18n-map";
import zhCNZod from "zod-i18n-map/locales/zh-CN/zod.json";
import zhTWZod from "zod-i18n-map/locales/zh-TW/zod.json";
import enUSZod from "zod-i18n-map/locales/en/zod.json";
import zhCN from "@clover/public/assets/locale/zh-CN.json";
import zhTW from "@clover/public/assets/locale/zh-TW.json";
import enUS from "@clover/public/assets/locale/en-US.json";
import enAgo from 'javascript-time-ago/locale/en'
import zhCNAgo from 'javascript-time-ago/locale/zh'
import zhTWAgo from 'javascript-time-ago/locale/zh-Hans-HK'
import TimeAgo from "javascript-time-ago";
import {setLangList} from "@easykit/common/utils/locale";
import langList from "@clover/public/config/lang.list";

setLangList(langList);
TimeAgo.addLocale(zhCNAgo);
TimeAgo.addLocale(zhTWAgo);
TimeAgo.addLocale(enAgo);
i18next.init({
    ns: ["zod", "common"],
    resources: {
        'zh-CN': {
            zod: zhCNZod,
            common: zhCN,
        },
        'zh-TW': {
            zod: zhTWZod,
            common: zhTW,
        },
        'en-US': {
            zod: enUSZod,
            common: enUS,
        },
    },
}).then();
z.setErrorMap(zodI18nMap);
