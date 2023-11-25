import {Badge} from "@clover/core";
import {FC, forwardRef} from "react";

export interface RoleStatusProps {
    value?: boolean;
}

export const RoleStatus: FC<RoleStatusProps> = forwardRef((props, ref) => {
    const { value } = props;
    return <Badge variant={value ? "default" : "secondary"}>
        { value ? "{#启用#}" : "{#禁用#}" }
    </Badge>
})
