import {FC, HTMLAttributes, useEffect} from "react";
import {useRecoilState} from "recoil";
import {sidebarOpenState} from "@clover/public/components/layout/main/state";
import localforage from "localforage";
import {SIDEBAR_OPEN_KEY} from "@clover/public/components/layout/main/const";
import { IconSidebar } from "@arco-iconbox/react-clover";
import {Action, ActionProps} from "../../../common/action";
import {Tooltip} from "@atom-ui/core";
import {FIX_ICON_PROPS} from "@easy-kit/common/utils/icon";

export type SwitchProps = HTMLAttributes<HTMLButtonElement> & ActionProps;

const Switch: FC<SwitchProps> = (props) => {

    const [open, setOpen] = useRecoilState(sidebarOpenState);

    useEffect(() => {
        localforage.setItem<boolean>(SIDEBAR_OPEN_KEY, open).then();
    }, [open]);

    const onSwitchClick = () => {
        setOpen(!open);
    }

    return <Tooltip content={open ? "{#隐藏侧边栏#}" : "{#显示侧边栏#}"}>
        <Action
            theme={props.theme}
            onClick={onSwitchClick}
            className={props.className}
        >
            <IconSidebar {...FIX_ICON_PROPS} fontSize={16} />
        </Action>
    </Tooltip>
}

export default Switch;
