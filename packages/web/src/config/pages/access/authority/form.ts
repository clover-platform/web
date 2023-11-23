import * as z from "zod";

export const SCHEMA = z.object({
    parentId: z.any(),
    name: z.string()
        .min(1, "{#权限名称不能为空#}")
        .max(200, "{#最多 100 个字符#}"),
    key: z.string()
        .min(1, "{#权限码不能为空#}")
        .max(200, "{#最多 200 个字符#}"),
    apis: z.any(),
})
