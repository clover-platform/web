import * as z from "zod";
import {t} from "@easykit/common/utils/locale";

export const getSchema = () => z.object({
    name: z.string()
        .min(1, t("名称不能为空"))
        .max(255, t("最多 255 个字符")),
    expirationTime: z.number().optional(),
    scopes: z.array(z.string()).nonempty(),
})
