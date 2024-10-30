import i18next from "i18next";

export type LangItem = {
    name: string;
    locale: string;
}

export const changeLanguage = async (locale: string) => {
    await i18next.changeLanguage(locale);
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
