import i18next from "i18next";
import {FALLBACK, FALLBACK_LOCALE} from "@clover/public/config/locale";

export type LangItem = {
    name: string;
    code: string;
    locale: string;
}

let _langList: LangItem[] = [];

export const setLangList = (langList: LangItem[]) => {
    _langList = langList;
}

export const getLocale = (code: string) => {
    return _langList.find((item: any) => item.code === code)?.locale || FALLBACK_LOCALE;
}

export const getCode = (locale: string) => {
    return _langList.find((item: any) => item.locale === locale)?.code || FALLBACK;
}

export const changeLanguage = async (locale: string) => {
    await i18next.changeLanguage(getLocale(locale));
}

export const t = (key: string) => {
    return i18next.t(key, { ns: "common" });
}

export const i18n = (string: string, params: any) => {
    if(!params) return string;
    const keys = Object.keys(params);
    keys.forEach((key) => {
        string = string.replace(new RegExp('%' + key,"gm"), params[key]);
    })
    return string;
}
