import * as z from "zod";
import { SimpleRadioGroupOptionProps } from "@easykit/design";
import { t } from '@clover/public/locale';

export const getSchema = () => z.object({
    type: z.string()
        .min(1, t("请选择创建方式")),
    name: z.string()
        .min(1, t("名称不能为空"))
        .max(255, t("最多 255 个字符")),
}).superRefine(({name}, ctx) => {
    if (!/^[a-z0-9][0-9a-z.-]*$/.test(name)) {
        ctx.addIssue({
            code: 'custom',
            path: ['name'],
            message: t("名称只能是小写字母、符号：. -，小写字母开头")
        })
    }
})

export const getTypeOptions = (): SimpleRadioGroupOptionProps[] => [
    {
        label: t("从主分支克隆"),
        value: "clone"
    },
    {
        label: t("空分支"),
        value: "empty"
    }
]
