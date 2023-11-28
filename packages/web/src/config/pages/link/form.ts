import * as z from "zod";
import { PASSWORD } from "@easy-kit/common/utils/regular";

export const SCHEMA = z.object({
    account: z.string()
        .min(1, "{#请输入用户名#}"),
    password: z.string()
        .min(1, "{#请输入正确的密码#}")
        .regex(PASSWORD, "{#请输入正确的密码#}"),
})
