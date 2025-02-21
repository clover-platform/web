import * as z from "zod";
import {CODE} from "@clover/public/utils/regular";
import {t} from '@clover/public/locale';

export const getFormSchema = () => z.object({
  code: z.string()
    .min(1, t("请输入邮箱验证码"))
    .regex(CODE, t("请输入6位数字验证码")),
  otpCode: z.string()
    .min(1, t("请输入身份验证 App 验证码"))
    .regex(CODE, t("请输入6位数字验证码")),
});
