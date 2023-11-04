import {isServer} from "@clover/common/utils";
import localforage from "localforage";

export const detectLang = async (langList, fallback = 'en-us') => {
    if(!isServer) {
        const supportLangList = langList.map(({code}) => {return code});
        const nLang = navigator.language;
        let targetLang = (nLang || fallback).toLowerCase();
        const langInLocal = await localforage.getItem("lang");
        targetLang = langInLocal || targetLang;
        if(!supportLangList.includes(targetLang)) { // 如果浏览器和本地语言并不支持，则 fallback
            targetLang = fallback;
        }
        const path = location.href.replace(location.origin, '');
        let inLang = false;
        for(let lang of supportLangList) {
            if(path.startsWith(`/${lang}`)) {
                inLang = true;
                break;
            }
        }
        if(!inLang) {
            location.href = `/${targetLang}` + (path.startsWith("/") ? path : "/" + path);
            return true;
        }
    }
    return false;
}
