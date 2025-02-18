import {FC, PropsWithChildren, ReactNode} from "react";
import { cn, ScrollArea, Tooltip } from "@easykit/design";
import { useAtom } from "jotai";
import classNames from 'classnames';
import {IconAdd, IconGantt, IconHelp, IconProject, IconSearch, IconSetting, IconWiki} from "@arco-iconbox/react-clover";
import { loadingState } from "@clover/public/components/layout/main-v1/state";
import { useSidebarState } from "@clover/public/components/layout/main-v1/hooks";
import Logo from "@clover/public/components/common/logo";
import Switch from "@clover/public/components/layout/main-v1/switch";
import { SidebarProfile } from "@clover/public/components/layout/main-v1/sidebar/profile";
import { ActionButton } from "@clover/public/components/common/action/button";
import { MenuItem, MenuItemProps } from "@clover/public/components/layout/main-v1/sidebar/menu-item";
import { Action } from "@clover/public/components/common/action";
import { t } from '@clover/public/locale';
import {ThemeSwitcher} from "@clover/public/components/common/theme-switcher";

export interface SidebarProps extends PropsWithChildren {
    active?: string;
    title?: string;
    menus?: MenuItemProps[];
    extra?: ReactNode;
}

const Sidebar: FC<SidebarProps> = (props) => {
    const {
        menus = [],
        title = t("导航"),
        active,
    } = props;

    const [loading] = useAtom(loadingState);
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
                <a href={`/`}>
                    <Tooltip content={t("首页")}>
                        <div className={classNames(loading ? "animate-spin" : "")}>
                            <Logo type={"dark"} size={28} className={"bg-transparent cursor-pointer"}/>
                        </div>
                    </Tooltip>
                </a>
                <div className={"flex-1 flex justify-end items-center space-x-0.5"}>
                    <Switch theme={"light"} className={"w-8 h-8 !p-0"} />
                    <Tooltip content={t("创建新的...")}>
                        <Action theme={"light"} className={"w-8 h-8 !p-0"}>
                            <IconAdd fontSize={20} />
                        </Action>
                    </Tooltip>
                    <SidebarProfile />
                </div>
            </div>
            <div className={groupClassName}>
                <div className={"m-1 flex-1"}>
                    <Tooltip side={"bottom"} content={t("项目")}>
                        <a href={`/project`}>
                            <ActionButton className={"w-full"}>
                                <IconProject className={iconClassName} />
                            </ActionButton>
                        </a>
                    </Tooltip>
                </div>
                <div className={"m-1 flex-1"}>
                    <Tooltip side={"bottom"} content={t("任务")}>
                        <a href={`/task`}>
                            <ActionButton className={"w-full"}>
                                <IconGantt className={iconClassName} />
                            </ActionButton>
                        </a>
                    </Tooltip>
                </div>
                <div className={"m-1 flex-1"}>
                    <Tooltip side={"bottom"} content={t("Wiki")}>
                        <a href={`/wiki`}>
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
                        {t("搜索或跳转到...")}
                    </ActionButton>
                </div>
            </div>
        </div>
        <div className={"flex-1 flex-shrink-0 h-0"}>
            <ScrollArea className="h-full w-full">
                <div className={"mx-3 my-2 font-bold text-xs text-primary"}>{ title }</div>
                <div className={"mx-2"}>
                    {menus.map((menu) => <MenuItem key={menu.id} {...menu} active={active} />)}
                </div>
                { props.extra }
            </ScrollArea>
        </div>
        <div className={"flex p-1 border-t"}>
            <div className={"flex-1 flex justify-start items-center"}>
                <a href={`/help`}>
                    <Action theme={"dark"}>
                        <IconHelp className={"text-base"}/>
                    </Action>
                </a>
                <a href={`/admin`}>
                    <Action theme={"dark"}>
                        <IconSetting className={"text-base"}/>
                    </Action>
                </a>
            </div>
            <div className={"flex-1 flex justify-end items-center"}>
                <ThemeSwitcher size={"sm"} activeClassName={"bg-[rgba(31,30,36,0.08)] dark:bg-secondary"} />
            </div>
        </div>
    </div>
};

export default Sidebar;
