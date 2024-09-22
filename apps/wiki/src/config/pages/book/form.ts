import * as z from "zod";

export const SCHEMA = z.object({
    path: z.string()
        .min(1, "{#路径不能为空#}")
        .max(255, "{#最多 255 个字符#}"),
    name: z.string()
        .min(1, "{#名称不能为空#}")
        .max(255, "{#最多 255 个字符#}"),
    privacy: z.string(),
    logo: z.string().optional(),
    description: z.string().optional(),
}).superRefine(({path}, ctx) => {
    if (!/[0-9a-z-]*$/.test(path)) {
        ctx.addIssue({
            code: 'custom',
            path: ['path'],
            message: '{#访问路径只能是小写字母和-，小写字母开头#}'
        })
    }
});

export type Privacy = {
    value: string;
    label: string;
}
export const PRIVACY_LIST: Privacy[] = [
    {
        value: "1",
        label: "{#知识库成员可见#}"
    },
    {
        value: "2",
        label: "{#项目成员可见#}"
    },
    {
        value: "3",
        label: "{#团队成员可见#}"
    },
    {
        value: "0",
        label: "{#公开#}"
    },
]
