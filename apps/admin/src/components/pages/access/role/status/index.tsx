import {Badge} from "@easykit/design";
import {FC, forwardRef} from "react";

export interface RoleStatusProps {
    value?: boolean;
}

export const RoleStatus: FC<RoleStatusProps> = forwardRef((props, ref) => {
    const { value } = props;
    return <Badge variant={value ? "default" : "secondary"}>
        { value ? t("启用") : t("禁用") }
    </Badge>
})
