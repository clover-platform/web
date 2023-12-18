import * as z from "zod";
import { PASSWORD } from "@easy-kit/common/utils/regular";

export const SCHEMA = z.object({
    account: z.string()
        .min(1, "{#请输入邮箱或用户名#}"),
    password: z.string()
        .min(1,"{#请输入密码#}")
        .regex(PASSWORD, "{#密码格式不正确#}"),
    code: z.string()
        .min(1,"{#请输入验证码#}")
        .max(6,"{#请输入6位验证码#}")
})
