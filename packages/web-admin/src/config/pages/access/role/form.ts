import * as z from "zod";

export const SCHEMA = z.object({
    name: z.string()
        .min(1, "{#权限名称不能为空#}")
        .max(200, "{#最多 100 个字符#}"),
    description: z.any(),
    enable: z.boolean(),
    authorities: z.array(z.string())
        .min(1, "{#请选择权限#}"),
})
