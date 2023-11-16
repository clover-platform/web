export const i18n = (string: string, params: Object) => {
    if(!params) return string;
    const keys = Object.keys(params);
    keys.forEach((key) => {
        string = string.replace(new RegExp('%' + key,"gm"), params[key]);
    })
    return string;
}
