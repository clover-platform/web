import { t } from "@clover/public/utils/locale.client";
import * as z from "zod";

export const getSchema = () => z.object({
  name: z.string()
    .min(1, t("名称不能为空"))
    .max(255, t("最多 255 个字符")),
  identifier: z.string()
    .min(1, t("唯一标识不能为空"))
    .max(100, t("最多 100 个字符")),
  description: z.any(),
  source: z.string()
    .min(1, t("请选择语言")),
  targets: z.array(z.string()),
}).superRefine(({ identifier }, ctx) => {
  if (!/^[a-z][0-9a-z-]*$/.test(identifier)) {
    ctx.addIssue({
      code: 'custom',
      path: ['identifier'],
      message: t("唯一标识只能是小写字母、数字和-，小写字母开头")
    })
  }
})

export const getInfoSchema = () => z.object({
  name: z.string()
    .min(1, t("名称不能为空"))
    .max(255, t("最多 255 个字符")),
  description: z.any(),
});

