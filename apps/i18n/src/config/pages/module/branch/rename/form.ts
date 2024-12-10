import * as z from "zod";
import { t } from '@clover/public/locale';

export const getSchema = () => z.object({
    name: z.string()
        .min(1, t("名称不能为空"))
        .max(255, t("最多 255 个字符")),
}).superRefine(({name}, ctx) => {
    if (!/^[a-z0-9][0-9a-z.-]*$/.test(name)) {
        ctx.addIssue({
            code: 'custom',
            path: ['name'],
            message: t("名称只能是小写字母、符号：. -，小写字母开头")
        })
    }
})
