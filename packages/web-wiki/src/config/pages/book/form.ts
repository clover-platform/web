import * as z from "zod";

export const SCHEMA = z.object({
    logo: z.string()
        .min(1, "{#LOGO不能为空#}"),
    path: z.string()
        .min(1, "{#路径不能为空#}")
        .max(255, "{#最多 255 个字符#}"),
    name: z.string()
        .min(1, "{#名称不能为空#}")
        .max(255, "{#最多 255 个字符#}"),
    description: z.string().optional(),
    privacy: z.string(),
}).superRefine(({path}, ctx) => {
    if (!/^[a-z][a-z-]*$/.test(path)) {
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
