import isArray from "lodash/isArray";
import isString from "lodash/isString";

export const title = (title: string) => {
    const titles = [
        "{#Antalpha Prime#}"
    ];
    if(title) {
        titles.unshift(title);
    }
    return titles.join(' - ');
}

export const keywords = (desc?: string | Array<string>) => {
    const list = ["{#Crypto#}", "{#Antalpha#}"];
    if(isString(desc)) {
        list.push(desc);
    }else if(isArray(desc)) {
        list.push(...desc);
    }
    return list.join(', ');
}
