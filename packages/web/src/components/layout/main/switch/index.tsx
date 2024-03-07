import {FC, HTMLAttributes, useEffect} from "react";
import {useRecoilState} from "recoil";
import {sidebarOpenState} from "@/components/layout/main/state";
import localforage from "localforage";
import {SIDEBAR_OPEN_KEY} from "@/components/layout/main/const";
import { IconSidebar } from "@arco-iconbox/react-clover";
import { Action } from "@/components/layout/main/action";

export interface SwitchProps extends HTMLAttributes<HTMLButtonElement>{}

const Switch: FC<SwitchProps> = (props) => {
    const {
        className,
        ...rest
    } = props;

    const [open, setOpen] = useRecoilState(sidebarOpenState);

    useEffect(() => {
        localforage.setItem<boolean>(SIDEBAR_OPEN_KEY, open).then();
    }, [open]);

    const onSwitchClick = () => {
        console.log('onSwitchClick');
        setOpen(!open);
    }

    return <Action
        onClick={onSwitchClick}
    >
        <IconSidebar fontSize={16} />
    </Action>
}

export default Switch;
