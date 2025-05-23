import { Progress, Separator, Spin, Tooltip, useMessage } from "@easykit/design";
import { Action } from "@clover/public/components/common/action";
import {
  IconBack, IconChatGPT,
  IconLeftSidebar,
  IconMenu,
  IconRightSidebar,
  IconSetting,
} from "@arco-iconbox/react-clover";
import {
  countState,
  currentBranchState,
  currentLanguageState,
  leftSideOpenState,
  rightSideOpenState
} from "@/state/worktop";
import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { MenuSheet } from "@/components/pages/worktop/control-bar/menu-sheet";
import { useCallback, useState } from "react";
import { LanguageAction } from "@/components/pages/worktop/control-bar/action/language";
import { BranchAction } from "@/components/pages/worktop/control-bar/action/branch";
import { ReloadIcon } from "@radix-ui/react-icons";
import bus from "@clover/public/events";
import { ENTRY_RELOAD } from "@/events/worktop";
import { ThemeSwitcher } from "@clover/public/components/common/theme-switcher";
import { sync as syncAll } from "@/rest/entry";
import { useTranslation } from "react-i18next";

export const ControlBar = () => {
  const { module } = useParams();
  const router = useRouter();
  const [leftSideOpen, setLeftSideOpen] = useAtom(leftSideOpenState);
  const [rightSideOpen, setRightSideOpen] = useAtom(rightSideOpenState);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuActive, setMenuActive] = useState("project");
  const [count] = useAtom(countState);
  const [currentLanguage] = useAtom(currentLanguageState);
  const [currentBranch] = useAtom(currentBranchState);
  const msg = useMessage();
  const [syncing, setSyncing] = useState(false);
  const { t } = useTranslation();

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

  const refresh = () => {
    bus.emit(ENTRY_RELOAD);
  }

  const sync = useCallback(async () => {
    const params = {
      branch: currentBranch,
      module: module as string,
      language: currentLanguage
    }
    setSyncing(true);
    const { success, message } = await syncAll(params);
    setSyncing(false);
    if (!success) {
      msg.error(message);
    }
  }, [currentBranch, module, currentLanguage, msg])

  return <div className={"w-full sticky top-0"}>
    <div className={"border-b"}>
      <Progress
        style={{ width: `${Math.ceil(count.translated / count.total * 100)}%` }}
        value={Math.ceil(count.verified / count.translated * 100)}
        className={"rounded-none h-1"}
      />
    </div>
    <div className={"flex justify-center items-center px-2 py-1 border-b shadow-sm"}>
      <div className={"flex-1 flex justify-start items-center space-x-1"}>
        <Action className={"!px-1.5 h-8 w-8"} onClick={() => router.push(`/i18n/${module}/dashboard`)}>
          <IconBack className={"text-lg"} />
        </Action>
        <Action className={"!px-1.5 h-8 w-8"} onClick={showMenu}>
          <IconMenu className={"text-lg"} />
        </Action>
        <Separator orientation={"vertical"} className={"h-5"} />
        <LanguageAction onClick={showMenuByLanguage} />
        <BranchAction onClick={showMenuByBranch} />
        <Separator orientation={"vertical"} className={"h-5"} />
        <Tooltip content={t("刷新")}>
          <Action className={"!px-1.5 h-8 w-8"} onClick={refresh}>
            <ReloadIcon className={"text-lg"} />
          </Action>
        </Tooltip>
        <Tooltip content={t("AI分析")}>
          <Action className={"!px-1.5 h-8 w-8"} onClick={sync}>
            {syncing ? <Spin className={"text-lg"} /> : <IconChatGPT className={"text-lg"} />}
          </Action>
        </Tooltip>
      </div>
      <div className={"flex-1 flex justify-end items-center space-x-1"}>
        <Action
          onClick={() => setLeftSideOpen(!leftSideOpen)}
          active={leftSideOpen} className={"!px-1.5 h-8 w-8"}
        >
          <IconLeftSidebar className={"text-lg"} />
        </Action>
        <Action
          onClick={() => setRightSideOpen(!rightSideOpen)}
          active={rightSideOpen} className={"!px-1.5 h-8 w-8"}
        >
          <IconRightSidebar className={"text-lg"} />
        </Action>
        <Separator orientation={"vertical"} className={"h-5"} />
        <Action className={"!px-1.5 h-8 w-8"}>
          <IconSetting className={"text-lg"} />
        </Action>
        <ThemeSwitcher size={"sm"} activeClassName={"bg-[rgba(31,30,36,0.08)] dark:bg-secondary"} />
      </div>
    </div>
    <MenuSheet
      active={menuActive}
      open={menuOpen}
      onOpenChange={setMenuOpen}
    />
  </div>
}
