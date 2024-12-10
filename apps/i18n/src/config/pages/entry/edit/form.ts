import * as z from "zod";
import { t } from '@clover/public/locale';

export const getSchema = () => z.object({
    value: z.string()
        .min(1, t("名称不能为空")),
});
