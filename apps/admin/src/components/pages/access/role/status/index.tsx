import {Badge} from "@easykit/design";
import {FC} from "react";
import { t } from '@clover/public/locale';

export interface RoleStatusProps {
    value?: boolean;
}

export const RoleStatus: FC<RoleStatusProps> = (props) => {
    const { value } = props;
    return <Badge variant={value ? "default" : "secondary"}>
        { value ? t("启用") : t("禁用") }
    </Badge>
}
