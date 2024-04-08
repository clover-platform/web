import * as z from "zod";
import { RadioGroupOptionProps } from "@atom-ui/core";

export const SCHEMA = z.object({
    type: z.string()
        .min(1, "{#请选择创建方式#}"),
    name: z.string()
        .min(1, "{#名称不能为空#}")
        .max(255, "{#最多 255 个字符#}"),
}).superRefine(({name}, ctx) => {
    if (!/^[a-z0-9][0-9a-z.-]*$/.test(name)) {
        ctx.addIssue({
            code: 'custom',
            path: ['name'],
            message: '{#唯一标识只能是小写字母、符号：. -，小写字母开头#}'
        })
    }
})

export const TYPE_OPTIONS: RadioGroupOptionProps[] = [
    {
        label: "{#从主分支克隆#}",
        value: "clone"
    },
    {
        label: "{#空分支#}",
        value: "empty"
    }
]
