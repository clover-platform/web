import {
  Action, Avatar, DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  useAlert,
  useMessage,
} from "@easykit/design";
import {FC, ReactNode, useCallback, useState} from "react";
import {t, tt} from "@clover/public/locale";
import {AccountInfo} from "@clover/public/components/layout/main/header/profile-menu/account-info";
import Link from "next/link";
import {logout} from "@clover/public/rest/auth";
import {useAtomValue} from "jotai";
import {accountInfoState} from "@clover/public/state/account";
import {useCurrentProject, useCurrentTeam} from "@clover/public/components/layout/hooks/main";
import {ProjectSwitcher} from "@clover/public/components/common/switcher/project";

export type ProfileMenuProps = {
  extra?: ReactNode;
}

export const ProfileMenu: FC<ProfileMenuProps> = (props) => {
  const { extra } = props;
  const [open, setOpen] = useState(false);
  const alert = useAlert();
  const msg = useMessage();
  const account = useAtomValue(accountInfoState);
  const team = useCurrentTeam();
  const project = useCurrentProject();

  const exit = useCallback(() => {
    alert.confirm({
      title: t("退出"),
      description: t("是否要退出当前账号？"),
      onOk: async () => {
        const { success, message } = await logout();
        if(success) {
          location.href = "/";
        }else{
          msg.error(message);
        }
        return success;
      }
    });
  }, [alert, msg])

  return <DropdownMenu open={open} onOpenChange={setOpen}>
    <DropdownMenuTrigger asChild>
      <Action className={"!outline-none !rounded-full !p-0.5"} active={open}>
        <Avatar className={"w-7 h-7"} src={"/assets/main/image/default/avatar.png"} alt={"cover"}/>
      </Action>
    </DropdownMenuTrigger>
    <DropdownMenuContent align={"end"} className={"w-64 p-0"}>
      <DropdownMenuLabel className={"text-secondary-foreground/50"}>{tt("账户")}</DropdownMenuLabel>
      <AccountInfo />
      <DropdownMenuSeparator />
      <Link href={`/profile/${account.username}`}>
        <DropdownMenuItem>{tt("个人资料")}</DropdownMenuItem>
      </Link>
      <DropdownMenuItem>
        <ProjectSwitcher
          title={tt("切换团队")}
          asChild={true}
          teamId={team?.id}
          projectId={project?.id}
        >
          <div className={"flex justify-start items-center space-x-1"}>
            <span>{tt("切换团队")}</span>
            <span className={"text-secondary-foreground/60"}>{"@"+team?.name}</span>
          </div>
        </ProjectSwitcher>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <ProjectSwitcher
          title={tt("切换项目")}
          asChild={true}
          teamId={team?.id}
          projectId={project?.id}
        >
          <div className={"flex justify-start items-center space-x-1"}>
            <span>{tt("切换项目")}</span>
            <span className={"text-secondary-foreground/60"}>{"@"+project?.name}</span>
          </div>
        </ProjectSwitcher>
      </DropdownMenuItem>
      {extra}
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={exit}>{tt("退出")}</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}
