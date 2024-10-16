import i18next from "i18next";
import langList from "@clover/public/config/lang.list";

export const getLocale = (code: string) => {
    return langList.find((item: any) => item.code === code)?.locale || 'en-US';
}

export const changeLanguage = async (locale: string) => {
    await i18next.changeLanguage(getLocale(locale));
}

export const t = (key: string) => {
    return i18next.t(key, { ns: "common" });
}
