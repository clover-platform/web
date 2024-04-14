import { forwardRef, useState } from "react";
import { Checkbox, ScrollArea } from "@atom-ui/core";
import { useRecoilValue } from "recoil";
import { branchesState } from "@/state/worktop";
import { IconBranch } from "@arco-iconbox/react-clover";
import {FIX_ICON_PROPS} from "@easy-kit/common/utils/icon";

export type MultiBranchSelectProps = {
    value?: string[];
    onChange?: (value: string[]) => void;
};

export const MultiBranchSelect = forwardRef<HTMLSelectElement, MultiBranchSelectProps>((props, ref) => {
    const branches = useRecoilValue(branchesState);
    const [selectId] = useState(Date.now());
    const [selected, setSelected] = useState(props.value || []);

    return <ScrollArea className={"h-32 bg-muted rounded-md"}>
        {
            branches.map((branch) => {
                const id = `${selectId}-${branch.id}`
                return <div key={branch.id} className="flex items-center space-x-1 px-2 py-1">
                    <div className={"w-6 h-6 flex justify-center items-center"}>
                        <Checkbox
                            checked={selected.includes(branch.name)}
                            onCheckedChange={(checked) => {
                                const newSelected = checked ? [...selected, branch.name] : selected.filter((item) => item !== branch.name);
                                setSelected(newSelected);
                                props.onChange?.(newSelected)
                            }}
                            id={id}
                        />
                    </div>
                    <label
                        htmlFor={id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 h-6 flex justify-start items-center"
                    >
                        <IconBranch {...FIX_ICON_PROPS} /> {branch.name}
                    </label>
                </div>
            })
        }
    </ScrollArea>
})
