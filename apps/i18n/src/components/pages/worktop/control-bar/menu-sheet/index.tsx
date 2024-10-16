import { Separator, Sheet, SheetContent } from "@easykit/design";
import { IconBranch, IconHelp, IconProject, IconTranslation } from "@arco-iconbox/react-clover";
import { Action } from "@clover/public/components/common/action";
import { FC, ReactNode, useEffect, useState } from "react";
import { MenuProjectSheet } from "@/components/pages/worktop/control-bar/menu-sheet/project";
import {MenuLanguageSheet} from "@/components/pages/worktop/control-bar/menu-sheet/language";
import {MenuBranchSheet} from "@/components/pages/worktop/control-bar/menu-sheet/branch";
import {MenuHelpSheet} from "@/components/pages/worktop/control-bar/menu-sheet/help";
import { t } from '@easykit/common/utils/locale';

export type MenuItemProps = {
    icon: ReactNode;
    label: ReactNode;
    active?: boolean;
    onClick?: () => void;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
    return <Action onClick={props.onClick} active={props.active} className={"flex !px-1 !py-0.5 w-full justify-center items-center"}>
        <div className={"h-8 w-9 flex justify-center items-center"}>{props.icon}</div>
        <div className={"flex-1 text-left"}>{props.label}</div>
    </Action>
}

export type MenuSheetProps = {
    active?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export const MenuSheet: FC<MenuSheetProps> = (props) => {
    const [active, setActive] = useState(props.active);

    useEffect(() => {
        setActive(props.active);
    }, [props.active]);

    return <Sheet {...props}>
        <SheetContent side={"left"} closable={false} className={"w-96 p-0 flex gap-0"}>
            <button />
            <div className={"w-32 border-r p-2 space-y-1"}>
                <MenuItem
                    active={active === "project"}
                    onClick={() => setActive("project")}
                    icon={<IconProject className={"text-lg"} />}
                    label={t("项目")}
                />
                <MenuItem
                    active={active === "language"}
                    onClick={() => setActive("language")}
                    icon={<IconTranslation className={"text-lg"} />}
                    label={t("语言")}
                />
                <MenuItem
                    active={active === "branch"}
                    onClick={() => setActive("branch")}
                    icon={<IconBranch className={"text-lg"} />}
                    label={t("分支")}
                />
                <Separator className={"my-1"} />
                <MenuItem
                    active={active === "help"}
                    onClick={() => setActive("help")}
                    icon={<IconHelp className={"text-lg"} />}
                    label={t("帮助")}
                />
            </div>
            <div className={"flex-grow p-3"}>
                { active === "project" && <MenuProjectSheet /> }
                { active === "language" && <MenuLanguageSheet /> }
                { active === "branch" && <MenuBranchSheet /> }
                { active === "help" && <MenuHelpSheet /> }
            </div>
        </SheetContent>
    </Sheet>
}
