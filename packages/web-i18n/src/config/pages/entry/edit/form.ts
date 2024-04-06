import * as z from "zod";

export const SCHEMA = z.object({
    value: z.string()
        .min(1, "{#名称不能为空#}"),
});