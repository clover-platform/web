import * as z from "zod";
import { t } from '@easykit/common/utils/locale';

export const SCHEMA = z.object({
    value: z.string()
        .min(1, t("名称不能为空")),
});
