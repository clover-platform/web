import * as z from "zod";
import {isEmail} from "@easy-kit/common/utils";

export const SCHEMA = z.object({
    roles: z.array(z.string())
        .min(1, "{#请选择角色#}"),
    emails: z.string()
        .min(1, "{#请选择创建方式#}")
        .max(1024, "{#最多 1024 个字符#}"),
    content: z.string().optional(),
}).superRefine(({emails}, ctx) => {
    if (!emails) return;
    const emailsArray = emails.split(',');
    const checked = emailsArray.every((email: string) => isEmail(email.trim()));
    if(!checked) {
        ctx.addIssue({
            code: 'custom',
            path: ['emails'],
            message: '{#请检查邮箱格式是否正常#}'
        })
    }
});
