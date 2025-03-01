import {IconSwitch, IconTeam} from "@arco-iconbox/react-clover";
import {Action, Badge, Tooltip} from "@easykit/design";
import {tt} from "@clover/public/locale";
import React, {FC} from "react";
import {Team} from "@clover/public/types/team";
import {useCurrent} from "@clover/public/components/layout/hooks/main";

export type CollectTeamItemProps = {
  team: Team;
}

export const CollectTeamItem: FC<CollectTeamItemProps> = (props) => {
  const {team} = props;
  const { teamId } = useCurrent();
  return <div className={"p-2 hover:bg-secondary rounded-md flex justify-center items-center space-x-2 cursor-pointer group"}>
    <div className={"bg-primary w-8 h-8 rounded-md flex justify-center items-center text-white"}>
      <IconTeam />
    </div>
    <div className={"flex-1"}>
      <span>{team.name}</span>
      <span className={"opacity-60 ml-1"}>@{team.teamKey}</span>
    </div>
    {
      team.id === teamId ? <div>
        <Badge>{tt("当前")}</Badge>
      </div> : <div className={"hidden group-hover:flex"}>
        <Tooltip content={tt("切换到此团队")}>
          <Action className={"!p-1.5"}>
            <IconSwitch />
          </Action>
        </Tooltip>
      </div>
    }
  </div>
}
