import {TabsTitleItem} from "@clover/public/components/common/tabs-title";
import {t} from "@easykit/common/utils/locale";

export const getTabs = (): TabsTitleItem[] => {
    return [
        {
            id: "setting",
            title: t("基本信息"),
        },
        {
            id: "member",
            title: t("成员"),
        },
        {
            id: "security",
            title: t("安全设置"),
        },
        {
            id: "more",
            title: t("更多设置"),
        }
    ]
}
