import { EMAIL, USERNAME } from "../utils/regular";
import { isPassword } from "../utils/account";
import { t } from '@clover/public/locale';

export const email = (value: any, callback: Function) => {
    if(!value) return callback();
    if (!EMAIL.test(value)) {
        return callback(t("邮箱格式不正确"));
    }
    callback();
};

export const username = (value: any, callback: Function) => {
    if(!value) return callback();
    if (!USERNAME.test(value)) {
        return callback(t("字母数字或下划线，字母开头"));
    }
    callback();
};

export const samePassword = (value: any, callback: Function, target: any) => {
    if(!value) return callback();
    if (value !== target) {
        return callback(t("两次密码输入不一致"));
    }
    callback();
};

export const setPassword = (value: any, callback: Function) => {
    if(!value) return callback();
    if (!isPassword(value)) {
        return callback(t("6-18位密码，包含大小写、特殊符号、数字"));
    }
    callback();
};
