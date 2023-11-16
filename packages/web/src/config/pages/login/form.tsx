import * as z from "zod";
import {PASSWORD, USERNAME} from "@clover/common/utils/regular";

export const SCHEMA = z.object({
    account: z.string({
        required_error: "{#请输入邮箱或用户名#}",
    }),
    password: z.string({
        required_error: "{#请输入密码#}",
    }).regex(PASSWORD, "{#密码格式不正确#}")
})
