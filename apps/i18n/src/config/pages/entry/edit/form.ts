import { t } from "@clover/public/utils/locale.client";
import * as z from "zod";

export const getSchema = () => z.object({
  value: z.string()
    .min(1, t("名称不能为空")),
});
