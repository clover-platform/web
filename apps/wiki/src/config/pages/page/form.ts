import * as z from "zod";
import {t} from "@easykit/common/utils/locale";

export const getSchema = () => z.object({
    title: z.string()
        .min(1, t("路径不能为空"))
        .max(255, t("最多 255 个字符")),
    bookId: z.number(),
});
