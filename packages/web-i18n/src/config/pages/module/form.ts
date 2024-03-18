import * as z from "zod";

export const SCHEMA = z.object({
    name: z.string()
        .min(1, "{#名称不能为空#}")
        .max(255, "{#最多 255 个字符#}"),
    identifier: z.string()
        .min(1, "{#唯一标识不能为空#}")
        .max(100, "{#最多 100 个字符#}"),
    description: z.any(),
    source: z.string()
        .min(1, "{#请选择语言#}"),
    targets: z.array(z.string()),
}).superRefine(({identifier}, ctx) => {
    if (!/^[a-z][a-z-]*$/.test(identifier)) {
        ctx.addIssue({
            code: 'custom',
            path: ['identifier'],
            message: '{#唯一标识只能是小写字母和-，小写字母开头#}'
        })
    }
})
