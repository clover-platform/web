import * as z from "zod";
import {t} from "@clover/public/utils/locale.client";
import {USERNAME} from "@clover/public/utils/regular";

export const getSchema = () => z.object({
  cover: z.string().optional(),
  name: z.string()
    .min(1, t("名称不能为空"))
    .max(255, t("最多 255 个字符")),
  projectKey: z.string()
    .min(4, t("4-20个字符"))
    .max(20, t("4-20个字符"))
    .regex(USERNAME, t("只能包含字母、数字、下划线，字母开头。")),
  teamId: z.string()
    .min(1, t("请选择团队")),
})
