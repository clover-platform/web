import {Select, SelectProps} from "@easykit/design";
import {FC, useMemo} from "react";
import {useAtomValue} from "jotai";
import {teamsState} from "@clover/public/state/public";
import { useTranslation } from "react-i18next";

export type TeamSelectorProps = Omit<SelectProps, "options">;

export const TeamSelector: FC<TeamSelectorProps> = (props) =>{
  const teams = useAtomValue(teamsState);
  const { t } = useTranslation();
  const options = useMemo(() => {
    return teams.map((team) => {
      return {
        label: team.name,
        value: `${team.id}`
      }
    });
  }, [teams])
  return <Select
    placeholder={t("请选择")}
    {...props}
    options={options}
  />
}
