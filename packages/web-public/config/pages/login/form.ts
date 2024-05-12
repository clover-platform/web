import * as z from "zod";
import { PASSWORD } from "@easy-kit/common/utils/regular";

export const SCHEMA = z.object({
    username: z.string()
        .min(1, "{#请输入邮箱或用户名#}"),
    password: z.string()
        .min(1,"{#请输入密码#}")
        .regex(PASSWORD, "{#密码格式不正确#}")
})
