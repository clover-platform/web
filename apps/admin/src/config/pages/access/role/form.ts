import * as z from "zod";
import { t } from '@clover/public/locale';

export const getSchema = () => z.object({
    name: z.string()
        .min(1, t("权限名称不能为空"))
        .max(200, t("最多 100 个字符")),
    description: z.any(),
    enable: z.boolean(),
    authorities: z.array(z.string())
        .min(1, t("请选择权限")),
})
