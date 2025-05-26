import {IconProject, IconSwitch} from "@arco-iconbox/react-clover";
import { ProjectSwitcher } from '@clover/public/components/common/switcher/project'
import {useCurrent} from "@clover/public/components/layout/hooks/main";
import type { Project } from '@clover/public/types/project'
import { Action, Badge, Tooltip } from '@easykit/design'
import {useRouter} from "next/navigation";
import { type FC, useCallback } from 'react'
import { useTranslation } from "react-i18next";
export type CollectProjectItemProps = {
  project: Project;
}

export const CollectProjectItem: FC<CollectProjectItemProps> = (props) => {
  const { project } = props;
  const { projectId } = useCurrent();
  const router = useRouter();
  const { t } = useTranslation();

  const onClick = useCallback(() => {
    router.push(`/team/${project.projectKey}?tab=info`)
  }, [router, project.projectKey])

  return (
    <div className="group flex cursor-pointer items-center justify-center space-x-2 rounded-md p-2 hover:bg-secondary">
      <div onClick={onClick} className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
        {project.cover ? (
          // biome-ignore lint/nursery/noImgElement: <explanation>
          <img className="h-full w-full object-cover" alt="Cover" src={project.cover} />
        ) : (
          <IconProject />
        )}
      </div>
      <div onClick={onClick} className="flex-1">
        <span>{project.name}</span>
        <span className="ml-1 opacity-60">@{project.projectKey}</span>
      </div>
      {project.id === projectId ? (
        <div>
          <Badge>{t('当前')}</Badge>
        </div>
      ) : (
        <div className="hidden group-hover:flex">
          <Tooltip content={t('切换到此项目')}>
            <ProjectSwitcher title={t('切换项目')} teamId={project.teamId} projectId={project.id}>
              <Action className="!p-1.5">
                <IconSwitch />
              </Action>
            </ProjectSwitcher>
          </Tooltip>
        </div>
      )}
    </div>
  )
}
