import {Loading, Select, SelectProps} from "@easykit/design";
import {FC, useEffect, useMemo} from "react";
import {tt} from "@clover/public/locale";
import {Project} from "@clover/public/types/project";
import {useFetch} from "@clover/public/hooks";
import {myByTeamId} from "@clover/public/rest/team";

export type ProjectSelectorProps = Omit<SelectProps, "options"> & {
  teamId: string|number;
};

export const ProjectSelector: FC<ProjectSelectorProps> = (props) => {
  const {
    value,
    teamId,
    ...rest
  } = props;
  const { loading, load, result } = useFetch<Project[], any>(myByTeamId)
  const options = useMemo(() => {
    return result?.map((project) => {
      return {
        label: project.name,
        value: `${project.id}`
      }
    }) || [];
  }, [result])

  useEffect(() => {
    if(teamId) {
      load(teamId).then();
    }
  }, [teamId, load])

  console.log("ProjectSelector", value)

  return <Loading loading={loading}>
    <Select
      placeholder={tt("请选择")}
      {...rest}
      value={value}
      options={options}
    />
  </Loading>
}
