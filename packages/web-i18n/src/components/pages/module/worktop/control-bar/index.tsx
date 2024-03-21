import { Progress, Separator } from "@atom-ui/core";
import { Action } from "@clover/public/components/common/action";
import {
    IconBack,
    IconBranch,
    IconLeftSidebar,
    IconMenu,
    IconRightSidebar,
    IconSetting,
} from "@arco-iconbox/react-clover";
import { leftSideOpenState, rightSideOpenState } from "@/state/worktop";
import { useRecoilState } from "recoil";
import { useRouter, useSearchParams } from "next/navigation";
import { MenuSheet } from "@/components/pages/module/worktop/control-bar/menu-sheet";
import { useState } from "react";

export const ControlBar = () => {
    const search = useSearchParams();
    const id = search.get("id");
    const router = useRouter();
    const [leftSideOpen, setLeftSideOpen] = useRecoilState(leftSideOpenState);
    const [rightSideOpen, setRightSideOpen] = useRecoilState(rightSideOpenState);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuActive, setMenuActive] = useState("project");

    const showMenu = () => {
        setMenuActive("project");
        setMenuOpen(true);
    }

    const showMenuByLanguage = () => {
        setMenuActive("language");
        setMenuOpen(true);
    }

    const showMenuByBranch = () => {
        setMenuActive("branch");
        setMenuOpen(true);
    }

    return <div className={"w-full sticky top-0"}>
        <Progress value={80} className={"rounded-none h-1"} />
        <div className={"flex justify-center items-center px-2 py-1 border-b shadow-sm"}>
            <div className={"flex-1 flex justify-start items-center space-x-1"}>
                <Action className={"!px-1.5 h-8"} onClick={() => router.push("/{#LANG#}/i18n/module/dashboard/?id=" + id)}>
                    <IconBack className={"text-lg"} />
                </Action>
                <Action className={"!px-1.5 h-8"} onClick={showMenu}>
                    <IconMenu className={"text-lg"} />
                </Action>
                <Separator orientation={"vertical"} className={"h-5"} />
                <Action className={"!px-1.5 h-8"} onClick={showMenuByLanguage}>
                    简体中文
                </Action>
                <Action className={"!px-1.5 h-8"} onClick={showMenuByBranch}>
                    <IconBranch className={"mr-1"} /> main
                </Action>
            </div>
            <div className={"flex-1 flex justify-end items-center space-x-1"}>
                <Action
                    onClick={() => setLeftSideOpen(!leftSideOpen)}
                    active={leftSideOpen} className={"!px-1.5 h-8"}
                >
                    <IconLeftSidebar className={"text-lg"} />
                </Action>
                <Action
                    onClick={() => setRightSideOpen(!rightSideOpen)}
                    active={rightSideOpen} className={"!px-1.5 h-8"}
                >
                    <IconRightSidebar className={"text-lg"} />
                </Action>
                <Separator orientation={"vertical"} className={"h-5"} />
                <Action className={"!px-1.5 h-8"}>
                    <IconSetting className={"text-lg"} />
                </Action>
            </div>
        </div>
        <MenuSheet
            active={menuActive}
            open={menuOpen}
            onOpenChange={setMenuOpen}
        />
    </div>
}
