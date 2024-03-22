import * as z from "zod";

export const SCHEMA = z.object({
    value: z.string()
        .min(1, "{#名称不能为空#}"),
    key: z.string()
        .min(1, "{#唯一标识不能为空#}")
        .max(1024, "{#最多 1024 个字符#}"),
    branches: z.array(z.string()),
}).superRefine(({branches}, ctx) => {
    if((branches?.length || 0) === 0) {
        ctx.addIssue({
            code: 'custom',
            path: ['branches'],
            message: '{#请选择分支#}'
        })
    }
    return ctx;
})
