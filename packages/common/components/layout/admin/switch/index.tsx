import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import {FC, HTMLAttributes, useEffect} from "react";
import {useRecoilState} from "recoil";
import {sidebarOpenState} from "@clover/common/components/layout/admin/state";
import localforage from "localforage";
import {SIDEBAR_OPEN_KEY} from "@clover/common/components/layout/admin/const";
import {Action, cn} from "@clover/core";

export interface SwitchProps extends HTMLAttributes<HTMLDivElement>{}

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
        setOpen(!open);
    }

    return <Action
        className={cn("mr-2", className)}
        onClick={onSwitchClick}
        {...rest}
    >
        <HamburgerMenuIcon width={20} height={20} />
    </Action>
}

export default Switch;
