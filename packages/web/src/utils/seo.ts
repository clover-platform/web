import isArray from "lodash/isArray";
import isString from "lodash/isString";

export const title = (title: string) => {
    const titles = [
        "{#幸运草#}"
    ];
    if(title) {
        titles.unshift(title);
    }
    return titles.join(' - ');
}

export const keywords = (keyword?: string | Array<string>) => {
    const list = ["{#幸运草#}", "{#任务管理#}", "{#甘特图#}", "{#问题管理#}"];
    if(isString(keyword)) {
        list.push(keyword);
    }else if(isArray(keyword)) {
        list.push(...keyword);
    }
    return list.join(', ');
}
