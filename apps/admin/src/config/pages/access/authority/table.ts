import { DropdownMenuItemProps, TreeTableColumn } from "@easykit/design";
import { t } from '@easykit/common/utils/locale';
import {AuthorityTree} from "@/rest/access";

export const getColumns = (): TreeTableColumn<AuthorityTree>[] => [
    {
        dataKey: "name",
        title: t("权限"),
    },
    {
        dataKey: "key",
        title: t("权限码"),
    },
    {
        dataKey: "sort",
        title: t("排序"),
    },
]

export const getActions = (): DropdownMenuItemProps[] => [
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
