import i18next from "i18next";

export const t = (key: string, vars?: Record<string, string>) => {
  return i18next?.t(key, { ns: "translation", ...(vars || {}) });
}

export const i18n = (string: string, params: any) => {
  if (!params) return string;
  const keys = Object.keys(params);
  keys.forEach((key) => {
    string = string.replace(new RegExp('%' + key, "gm"), params[key]);
  })
  return string;
}