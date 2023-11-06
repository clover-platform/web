import { EMAIL, USERNAME } from "../utils/regular";

export const email = (value: any, callback: Function) => {
    if(!value) return callback();
    if (!EMAIL.test(value)) {
        return callback("{#邮箱格式不正确#}");
    }
    callback();
};

export const username = (value: any, callback: Function) => {
    if(!value) return callback();
    if (!USERNAME.test(value)) {
        return callback("{#字母数字或下划线，字母开头#}");
    }
    callback();
};
