import {AccessToken} from "@/types/profile/access/token";
import {t} from "@easykit/common/utils/locale";
import {DataTableColumn} from "@easykit/design/components/uix/data-table";

export const getColumns = (): DataTableColumn<AccessToken>[] => [
    {
        accessorKey: "name",
        header: t("令牌名称"),
        enableHiding: false,
        className: "min-w-[200px]",
    },
    {
        accessorKey: "createTime",
        header: t("创建时间"),
        enableHiding: true,
        className: "!w-[200px]",
        formatters: ["time"],
    },
    {
        accessorKey: "expirationTime",
        header: t("过期时间"),
        enableHiding: true,
        className: "!w-[200px]",
        formatters: ["time"],
    },
];

export const getRowActions = (row: AccessToken) => {
    return [];
};
