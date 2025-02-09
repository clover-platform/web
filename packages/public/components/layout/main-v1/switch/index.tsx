import {FC, HTMLAttributes, useEffect} from "react";
import {useAtom} from "jotai";
import {sidebarOpenState} from "@clover/public/components/layout/main-v1/state";
import {SIDEBAR_OPEN_KEY} from "@clover/public/components/layout/main-v1/const";
import { IconSidebar } from "@arco-iconbox/react-clover";
import {Action, ActionProps} from "../../../common/action";
import {Tooltip} from "@easykit/design";
import { setCookie } from "cookies-next";
import { t } from '@clover/public/locale';
import {COOKIE_MAX_AGE} from "@clover/public/config/app";

export type SwitchProps = HTMLAttributes<HTMLButtonElement> & ActionProps;

const Switch: FC<SwitchProps> = (props) => {
    const [open, setOpen] = useAtom(sidebarOpenState);

    useEffect(() => {
        setCookie(SIDEBAR_OPEN_KEY, open, {
            maxAge: COOKIE_MAX_AGE,
        });
    }, [open]);

    const onSwitchClick = () => {
        setOpen(!open);
    }

    return <Tooltip content={open ? t("隐藏侧边栏") : t("显示侧边栏")}>
        <Action
            theme={props.theme}
            onClick={onSwitchClick}
            className={props.className}
        >
            <IconSidebar fontSize={16} />
        </Action>
    </Tooltip>
}

export default Switch;
