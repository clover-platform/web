import { ColumnsProps, DropdownMenuItemProps } from "@easykit/design";
import { t } from '@easykit/common/utils/locale';

export const COLUMNS: ColumnsProps[] = [
    {
        key: "name",
        label: t("权限"),
        style: {
            flex: "1",
            width: 0
        }
    },
    {
        key: "key",
        label: t("权限码"),
        width: 300
    },
    {
        key: "sort",
        label: t("排序"),
        width: 100
    },
]

export const ACTIONS: DropdownMenuItemProps[] = [
    {
        id: "edit",
        type: "item",
        label: t("编辑")
    },
    {
        id: "delete",
        type: "item",
        label: t("删除")
    },
];
