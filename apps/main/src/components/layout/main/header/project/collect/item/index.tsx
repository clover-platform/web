import {IconProject, IconSwitch} from "@arco-iconbox/react-clover";
import {Action, Badge, Tooltip} from "@easykit/design";
import {t} from "@clover/public/utils/i18next";
import React, {FC, useCallback} from "react";
import {useCurrent} from "@clover/public/components/layout/hooks/main";
import {useRouter} from "next/navigation";
import {ProjectSwitcher} from "@clover/public/components/common/switcher/project";
import {Project} from "@clover/public/types/project";

export type CollectProjectItemProps = {
  project: Project;
}

export const CollectProjectItem: FC<CollectProjectItemProps> = (props) => {
  const { project } = props;
  const { projectId } = useCurrent();
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push(`/team/${project.projectKey}?tab=info`)
  }, [router, project.projectKey])

  return <div className={"p-2 hover:bg-secondary rounded-md flex justify-center items-center space-x-2 cursor-pointer group"}>
    <div
      onClick={onClick}
      className={"bg-primary w-8 h-8 rounded-md flex justify-center items-center text-white"}
    >
      { project.cover ? <img className={"w-full h-full object-cover"} alt={"Cover"} src={project.cover}/> : <IconProject /> }
    </div>
    <div onClick={onClick} className={"flex-1"}>
      <span>{project.name}</span>
      <span className={"opacity-60 ml-1"}>@{project.projectKey}</span>
    </div>
    {
      project.id === projectId ? <div>
        <Badge>{t("当前")}</Badge>
      </div> : <div className={"hidden group-hover:flex"}>
        <Tooltip content={t("切换到此项目")}>
          <ProjectSwitcher
            title={t("切换项目")}
            teamId={project.teamId}
            projectId={project.id}
          >
            <Action className={"!p-1.5"}>
              <IconSwitch />
            </Action>
          </ProjectSwitcher>
        </Tooltip>
      </div>
    }
  </div>
}
