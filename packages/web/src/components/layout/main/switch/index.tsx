import {FC, HTMLAttributes, useEffect} from "react";
import {useRecoilState} from "recoil";
import {sidebarOpenState} from "@/components/layout/main/state";
import localforage from "localforage";
import {SIDEBAR_OPEN_KEY} from "@/components/layout/main/const";
import { IconSidebar } from "@arco-iconbox/react-clover";
import {Action, ActionProps} from "@/components/layout/main/action";

export type SwitchProps = HTMLAttributes<HTMLButtonElement> & ActionProps;

const Switch: FC<SwitchProps> = (props) => {

    const [open, setOpen] = useRecoilState(sidebarOpenState);

    useEffect(() => {
        localforage.setItem<boolean>(SIDEBAR_OPEN_KEY, open).then();
    }, [open]);

    const onSwitchClick = () => {
        setOpen(!open);
    }

    return <Action
        type={props.type}
        onClick={onSwitchClick}
        className={props.className}
    >
        <IconSidebar fontSize={16} />
    </Action>
}

export default Switch;
