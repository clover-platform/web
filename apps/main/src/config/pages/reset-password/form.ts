import * as z from "zod";
import { CODE, EMAIL, PASSWORD, USERNAME } from "@easykit/common/utils/regular";
import { t } from '@easykit/common/utils/locale';

const code = t("请输入6位数字验证码");

export const EMAIL_FORM_SCHEMA = z.object({
    email: z.string()
        .min(1, t("请输入正确的邮箱"))
        .regex(EMAIL, t("邮箱格式不正确")),
    code: z.string()
        .min(1, t("请输入验证码"))
        .regex(CODE, code),
})

export const PASSWORD_FORM_SCHEMA = z.object({
    password: z.string()
        .min(1, t("请输入密码"))
        .regex(PASSWORD, t("密码格式不正确")),
    password2:z.string()
        .min(1, t("请输入密码"))
        .regex(PASSWORD, t("密码格式不正确")),
}).superRefine(({password, password2}, ctx) => {
    if (password !== password2) {
        ctx.addIssue({
            code: 'custom',
            path: ['password2'],
            message: t("两次密码输入不一致")
        })
    }
});
