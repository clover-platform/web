import * as z from "zod";
import {t} from "@clover/public/locale";

export const getSchema = () => z.object({
  name: z.string()
    .min(1, t("名称不能为空"))
    .max(255, t("最多 255 个字符")),
}).superRefine(({name}, ctx) => {
  console.log(name, ctx)
})
