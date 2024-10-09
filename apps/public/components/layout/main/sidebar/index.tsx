import {FC, PropsWithChildren, ReactNode} from "react";
import { cn, ScrollArea, Tooltip } from "@atom-ui/core";
import { useRecoilValue } from "recoil";
import classNames from 'classnames';
import {IconAdd, IconGantt, IconHelp, IconProject, IconSearch, IconSetting, IconWiki} from "@arco-iconbox/react-clover";
import { loadingState } from "@clover/public/components/layout/main/state";
import { useSidebarState } from "@clover/public/components/layout/main/hooks";
import Logo from "@clover/public//components/common/logo";
import Switch from "@clover/public//components/layout/main/switch";
import { SidebarProfile } from "@clover/public/components/layout/main/sidebar/profile";
import { ActionButton } from "@clover/public/components/common/action/button";
import { MenuItem, MenuItemProps } from "@clover/public/components/layout/main/sidebar/menu-item";
import { Action } from "@clover/public/components/common/action";

export interface SidebarProps extends PropsWithChildren {
    active?: string;
    title?: string;
    menus?: MenuItemProps[];
    extra?: ReactNode;
}

const Sidebar: FC<SidebarProps> = (props) => {
    const {
        menus = [],
        title = "{#导航#}",
        active,
    } = props;

    const loading = useRecoilValue(loadingState);
    const open = useSidebarState();

    const iconClassName = "text-base font-bold";
    const groupClassName = "flex justify-center items-center -mx-1 mt-1";

    return <div className={cn(
        "w-[var(--sidebar-width)] bg-[var(--sidebar-bg)] border-0 border-r border-solid",
        "top-0 left-0 bottom-0",
        "flex flex-col z-30",
        open ? "fixed" : "hidden",
    )}>
        <div className={"bg-[var(--sidebar-user-bg)] text-white p-2"}>
            <div className={"flex justify-center items-center"}>
                <a href={"/{#LANG#}/"}>
                    <Tooltip content={"{#首页#}"}>
                        <div className={classNames(loading ? "animate-spin" : "")}>
                            <Logo type={"dark"} size={28} className={"bg-transparent cursor-pointer"}/>
                        </div>
                    </Tooltip>
                </a>
                <div className={"flex-1 flex justify-end items-center space-x-0.5"}>
                    <Switch theme={"light"} className={"w-8 h-8 !p-0"} />
                    <Tooltip content={"{#创建新的...#}"}>
                        <Action theme={"light"} className={"w-8 h-8 !p-0"}>
                            <IconAdd fontSize={20} />
                        </Action>
                    </Tooltip>
                    <SidebarProfile />
                </div>
            </div>
            <div className={groupClassName}>
                <div className={"m-1 flex-1"}>
                    <Tooltip side={"bottom"} content={"{#项目#}"}>
                        <a href={"/{#LANG#}/project/"}>
                            <ActionButton className={"w-full"}>
                                <IconProject className={iconClassName} />
                            </ActionButton>
                        </a>
                    </Tooltip>
                </div>
                <div className={"m-1 flex-1"}>
                    <Tooltip side={"bottom"} content={"{#任务#}"}>
                        <a href={"/{#LANG#}/task/"}>
                            <ActionButton className={"w-full"}>
                                <IconGantt className={iconClassName} />
                            </ActionButton>
                        </a>
                    </Tooltip>
                </div>
                <div className={"m-1 flex-1"}>
                    <Tooltip side={"bottom"} content={"{#Wiki#}"}>
                        <a href={"/{#LANG#}/wiki/"}>
                            <ActionButton className={"w-full"}>
                                <IconWiki className={iconClassName} />
                            </ActionButton>
                        </a>
                    </Tooltip>
                </div>
            </div>
            <div className={groupClassName}>
                <div className={"m-1 flex-1"}>
                    <ActionButton className={"w-full"}>
                        <IconSearch className={classNames(iconClassName, "mr-1")} />
                        {"{#搜索或跳转到...#}"}
                    </ActionButton>
                </div>
            </div>
        </div>
        <div className={"flex-1 flex-shrink-0 h-0"}>
            <ScrollArea className="h-full w-full">
                <div className={"mx-3 my-2 font-bold text-xs text-primary"}>{ props.title }</div>
                <div className={"mx-2"}>
                    {menus.map((menu) => <MenuItem key={menu.id} {...menu} active={active} />)}
                </div>
                { props.extra }
            </ScrollArea>
        </div>
        <div className={"flex p-1 py-0 border-t"}>
            <div className={"flex-1 mx-0.5 my-1"}>
                <a href={"/{#LANG#}/help/"}>
                    <Action theme={"dark"} className={"w-full py-1"}>
                        <IconHelp className={"mr-1 text-base"} /> {"{#帮助#}"}
                    </Action>
                </a>
            </div>
            <div className={"flex-1 mx-0.5 my-1"}>
                <a href={"/{#LANG#}/admin/"}>
                    <Action theme={"dark"} className={"w-full py-1"}>
                        <IconSetting className={"mr-1 text-base"} /> {"{#管理中心#}"}
                    </Action>
                </a>
            </div>
        </div>
    </div>
};

export default Sidebar;
