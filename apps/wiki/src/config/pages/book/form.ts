import * as z from "zod";
import { t } from '@easykit/common/utils/locale';

export const SCHEMA = z.object({
    path: z.string()
        .min(1, t("路径不能为空"))
        .max(255, t("最多 255 个字符")),
    nameAndLogo: z.object({
        name: z.string(),
        logo: z.string(),
    }),
    privacy: z.string(),
    description: z.string().optional(),
}).superRefine(({nameAndLogo, path}, ctx) => {
    if (!/[0-9a-z-]*$/.test(path)) {
        ctx.addIssue({
            code: 'custom',
            path: ['path'],
            message: t("访问路径只能是小写字母和-，小写字母开头")
        })
    }
    const { name } = nameAndLogo;
    if(!name) {
        ctx.addIssue({
            code: 'custom',
            path: ['nameAndLogo'],
            message: t("请输入知识库名称")
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
        label: t("知识库成员可见")
    },
    {
        value: "2",
        label: t("项目成员可见")
    },
    {
        value: "3",
        label: t("团队成员可见")
    },
    {
        value: "0",
        label: t("公开")
    },
]
