import { Progress, Separator } from "@easykit/design";
import { Action } from "@clover/public/components/common/action";
import {
    IconBack,
    IconBranch,
    IconLeftSidebar,
    IconMenu,
    IconRightSidebar,
    IconSetting,
} from "@arco-iconbox/react-clover";
import { countState, leftSideOpenState, rightSideOpenState } from "@/state/worktop";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter, useSearchParams } from "next/navigation";
import { MenuSheet } from "@/components/pages/worktop/control-bar/menu-sheet";
import { useState } from "react";
import { LanguageAction } from "@/components/pages/worktop/control-bar/action/language";
import { BranchAction } from "@/components/pages/worktop/control-bar/action/branch";

export const ControlBar = () => {
    const search = useSearchParams();
    const id = search.get("id");
    const router = useRouter();
    const [leftSideOpen, setLeftSideOpen] = useRecoilState(leftSideOpenState);
    const [rightSideOpen, setRightSideOpen] = useRecoilState(rightSideOpenState);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuActive, setMenuActive] = useState("project");
    const count = useRecoilValue(countState);

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
        <div className={"border-b"}>
            <Progress
                style={{width: `${Math.ceil(count.translated / count.total * 100)}%`}}
                value={Math.ceil(count.verified / count.translated * 100)}
                className={"rounded-none h-1"}
            />
        </div>
        <div className={"flex justify-center items-center px-2 py-1 border-b shadow-sm"}>
            <div className={"flex-1 flex justify-start items-center space-x-1"}>
                <Action className={"!px-1.5 h-8"} onClick={() => router.push("/{#LANG#}/i18n/dashboard/?id=" + id)}>
                    <IconBack className={"text-lg"} />
                </Action>
                <Action className={"!px-1.5 h-8"} onClick={showMenu}>
                    <IconMenu className={"text-lg"} />
                </Action>
                <Separator orientation={"vertical"} className={"h-5"} />
                <LanguageAction onClick={showMenuByLanguage} />
                <BranchAction onClick={showMenuByBranch} />
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
