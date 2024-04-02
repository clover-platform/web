import * as z from "zod";

export const SCHEMA = z.object({
    roles: z.array(z.string())
        .min(1, "{#请选择角色#}"),
    emails: z.string()
        .min(1, "{#请选择创建方式#}")
        .max(1024, "{#最多 1024 个字符#}"),
    content: z.string()
        .min(1, "{#内容不能为空#}")
        .max(512, "{#最多 512 个字符#}"),
});
