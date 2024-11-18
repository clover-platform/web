import * as z from "zod";
import {NUMBER} from "@easykit/common/utils/regular";
import { t } from '@easykit/common/utils/locale';

export const getSchema = () => z.object({
    parentId: z.any(),
    name: z.string()
        .min(1, t("权限名称不能为空"))
        .max(200, t("最多 100 个字符")),
    value: z.string()
        .min(1, t("权限码不能为空"))
        .max(200, t("最多 200 个字符")),
    apis: z.any(),
    sort: z.string()
        .regex(NUMBER, t("排序必须为数字")),
})
