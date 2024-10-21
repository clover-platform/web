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
