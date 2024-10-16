import * as z from "zod";
import { PASSWORD } from "@easykit/common/utils/regular";
import { t } from '@easykit/common/utils/locale';

export const SCHEMA = z.object({
    username: z.string()
        .min(1, t("请输入邮箱或用户名")),
    password: z.string()
        .min(1,t("请输入密码"))
        .regex(PASSWORD, t("密码格式不正确"))
})
