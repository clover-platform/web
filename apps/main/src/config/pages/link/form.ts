import * as z from "zod";
import { PASSWORD } from "@easykit/common/utils/regular";
import { t } from '@easykit/common/utils/locale';

export const SCHEMA = z.object({
    account: z.string()
        .min(1, t("请输入用户名")),
    password: z.string()
        .min(1, t("请输入正确的密码"))
        .regex(PASSWORD, t("请输入正确的密码")),
})
