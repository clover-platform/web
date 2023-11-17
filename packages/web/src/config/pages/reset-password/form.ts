import * as z from "zod";
import { CODE, EMAIL, PASSWORD, USERNAME } from "@clover/common/utils/regular";

const code = "{#请输入6位数字验证码#}";

export const EMAIL_FORM_SCHEMA = z.object({
    email: z.string({
        required_error: "{#请输入正确的邮箱#}",
    }).regex(EMAIL, "{#邮箱格式不正确#}"),
    code: z.string({
        required_error: "{#请输入验证码#}",
    }).regex(CODE, code),
})

export const PASSWORD_FORM_SCHEMA = z.object({
    password: z.string({
        required_error: "{#请输入密码#}",
    }).regex(PASSWORD, "{#密码格式不正确#}"),
    password2:z.string({
        required_error: "{#请输入密码#}",
    }).regex(PASSWORD, "{#密码格式不正确#}"),
}).superRefine(({password, password2}, ctx) => {
    if (password !== password2) {
        console.log(password, password2);
        ctx.addIssue({
            code: 'custom',
            path: ['password2'],
            message: '{#两次密码输入不一致#}'
        })
    }
});
