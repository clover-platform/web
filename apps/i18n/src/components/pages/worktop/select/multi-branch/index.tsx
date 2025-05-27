import { branchesState } from "@/state/worktop";
import { IconBranch } from "@arco-iconbox/react-clover";
import { Checkbox, ScrollArea } from '@easykit/design'
import { useAtom } from 'jotai'
import { type FC, useState } from 'react'

export type MultiBranchSelectProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
};

export const MultiBranchSelect: FC<MultiBranchSelectProps> = (props) => {
  const [branches] = useAtom(branchesState);
  const [selectId] = useState(Date.now());
  const [selected, setSelected] = useState(props.value || []);

  return (
    <ScrollArea className="h-32 rounded-md bg-muted">
      {branches.map((branch) => {
        const id = `${selectId}-${branch.id}`
        return (
          <div key={branch.id} className="flex items-center space-x-1 px-2 py-1">
            <div className="flex h-6 w-6 items-center justify-center">
              <Checkbox
                checked={selected.includes(branch.name)}
                onCheckedChange={(checked) => {
                  const newSelected = checked
                    ? [...selected, branch.name]
                    : selected.filter((item) => item !== branch.name)
                  setSelected(newSelected)
                  props.onChange?.(newSelected)
                }}
                id={id}
              />
            </div>
            <label
              htmlFor={id}
              className="flex h-6 flex-1 items-center justify-start font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <IconBranch /> {branch.name}
            </label>
          </div>
        )
      })}
    </ScrollArea>
  )
}
