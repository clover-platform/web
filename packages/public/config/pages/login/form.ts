import * as z from "zod";
import {PASSWORD} from "@clover/public/utils/regular";
import {t} from '@clover/public/locale';

export const SCHEMA = () => z.object({
  username: z.string()
    .min(1, t("请输入邮箱或用户名")),
  password: z.string()
    .min(1, t("请输入密码"))
    .regex(PASSWORD, t("密码格式不正确"))
})
