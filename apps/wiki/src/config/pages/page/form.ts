import * as z from "zod";
import {t} from "@clover/public/locale";

export const getSchema = () => z.object({
    title: z.string()
        .min(1, t("路径不能为空"))
        .max(255, t("最多 255 个字符")),
    bookPath: z.string(),
});
