import { FC } from "react";
import { Badge } from "@easykit/design";

export type MemberRoleProps = {
    value: number;
}

type RoleItem = {
    label: string;
    variant: "outline" | "default" | "secondary" | "destructive" | null | undefined;
}

const ROLE_MAP: Record<number, RoleItem> = {
    0: {
        label: "{#成员#}",
        variant: "outline",
    },
    1: {
        label: "{#管理员#}",
        variant: "default",
    },
    2: {
        label: "{#创建者#}",
        variant: "default",
    },
    3: {
        label: "{#翻译员#}",
        variant: "secondary",
    },
    4: {
        label: "{#校验员#}",
        variant: "secondary",
    }
}

export const MemberRole: FC<MemberRoleProps> = (props) => {
    const role = ROLE_MAP[props.value];
    if(!role) return "--";
    return <Badge variant={role.variant}>{role.label}</Badge>
}
