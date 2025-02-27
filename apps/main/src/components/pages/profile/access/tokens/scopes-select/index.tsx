import {FC, useMemo} from "react";
import {getScopes} from "@/config/pages/profile/access/scopes";
import {CheckboxGroup, CheckboxGroupOptionProps} from "@easykit/design";

export type ScopesSelectProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
}

export const ScopesSelect: FC<ScopesSelectProps> = (props) => {
  const options = useMemo<CheckboxGroupOptionProps[]>(() => getScopes().map((s) => {
    return {
      value: s.key,
      label: <div>
        <div>{s.key}</div>
        <div className={"text-secondary-foreground/50"}>{s.description}</div>
      </div>,
    }
  }), [])

  return <CheckboxGroup
    {...props}
    options={options}
    checkboxClassName={"mt-1"}
    itemClassName={"w-full !items-start"}
  />
}
