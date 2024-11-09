import {TabsTitleItem} from "@clover/public/components/common/tabs-title";
import { t } from '@easykit/common/utils/locale';

export const getTabs = (): TabsTitleItem[] => [
    {
        id: "all",
        title: t("全部"),
    },
    {
        id: "create",
        title: t("由我创建"),
    },
    {
        id: "join",
        title: t("我加入的"),
    }
]
