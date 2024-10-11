import {Action} from "@clover/public/components/common/action";
import {IconExpand} from "@arco-iconbox/react-clover";
import {Tooltip} from "@easykit/design";
import {FC} from "react";

export type ExpandActionProps = {
    all: boolean;
    enable: boolean;
    onClick: (all: boolean) => void;
    className?: string;
}

export const ExpandAction: FC<ExpandActionProps> = (props) => {
    const { className, all, enable, onClick } = props;
    return enable ? <Tooltip content={all ? "{#收起全部#}" : "{#展开全部#}"}>
        <Action
            onClick={() => onClick(!all)}
            className={className}
        >
            <IconExpand/>
        </Action>
    </Tooltip> : null
}
