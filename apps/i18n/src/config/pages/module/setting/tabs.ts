import {TabsTitleItem} from "@clover/public/components/common/tabs-title";
import { t } from '@easykit/common/utils/locale';

export const getTabs = (): TabsTitleItem[] => [
    {
        id: "general",
        title: t("常规"),
    },
    {
        id: "languages",
        title: t("语言"),
    },
    {
        id: "ai",
        title: t("AI辅助"),
    },
    {
        id: "api",
        title: t("API"),
    },
]
