import * as z from "zod";
import {isEmail} from "@clover/public/utils";
import { t } from '@clover/public/locale';

export const getSchema = () => z.object({
    roles: z.array(z.string())
        .min(1, t("请选择角色")),
    emails: z.string()
        .min(1, t("请选择创建方式"))
        .max(1024, t("最多 1024 个字符")),
    content: z.string().optional(),
}).superRefine(({emails}, ctx) => {
    if (!emails) return;
    const emailsArray = emails.split(',');
    const checked = emailsArray.every((email: string) => isEmail(email.trim()));
    if(!checked) {
        ctx.addIssue({
            code: 'custom',
            path: ['emails'],
            message: t("请检查邮箱格式是否正常")
        })
    }
});
