import * as z from "zod";

export const SCHEMA = z.object({
    name: z.string()
        .min(1, "{#名称不能为空#}")
        .max(255, "{#最多 255 个字符#}"),
    sources: z.array(z.string()),
    export: z.string(),
    includeSource: z.boolean().optional(),
}).superRefine(({name, sources}, ctx) => {
    if (!/^[a-z0-9][0-9a-z.-]*$/.test(name)) {
        ctx.addIssue({
            code: 'custom',
            path: ['name'],
            message: '{#名称只能是小写字母、符号：. -，小写字母开头#}'
        })
    }
    if(sources.length) {
        // 如果数组内任何一个元素为空字符串，则报错
        if(sources.some(item => !item.trim())) {
            ctx.addIssue({
                code: 'custom',
                path: ['sources'],
                message: '{#请输入完整的匹配规则#}'
            })
        }
        // 如果存在重复的匹配规则，则报错
        if(new Set(sources).size !== sources.length) {
            ctx.addIssue({
                code: 'custom',
                path: ['sources'],
                message: '{#匹配规则不能重复#}'
            })
        }
    }
})