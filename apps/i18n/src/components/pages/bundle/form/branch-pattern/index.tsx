import {forwardRef, useState} from "react";
import {Input} from "@easykit/design";
import {IconAdd} from "@arco-iconbox/react-clover";
import {Action} from "@clover/public/components/common/action";
import {MinusIcon} from "@radix-ui/react-icons";

export type BranchPatternProps = {
    value?: string[];
    onChange?: (value: string[]) => void;
};

export const BranchPattern = forwardRef<HTMLInputElement, BranchPatternProps>((props, ref) => {
    const { value, onChange } = props;
    const [branches, setBranches] = useState<string[]>(value || ['']);

    const add = () => {
        const newBranches = [...branches, ''];
        setBranches(newBranches);
        onChange?.(newBranches);
    }

    const remove = (index: number) => {
        const newBranches = branches.filter((_, i) => i !== index);
        setBranches(newBranches);
        onChange?.(newBranches);
    }

    return <div className={"space-y-2"}>
        {
            branches.map((branch, index) => {
                return <div key={index} className={"relative"}>
                    <Input
                        value={branches[index]}
                        onChange={(e) => {
                            branches[index] = e.target.value;
                            const newBranches = [...branches];
                            setBranches(newBranches);
                            onChange?.(newBranches);
                        }}
                        placeholder={"{#匹配分支#}"}
                    />
                    <div className={"absolute top-1 right-1 flex"}>
                        {
                            index === 0 ? null : <Action onClick={() => remove(index)} className={"w-7 h-7 !p-0"}>
                                <MinusIcon />
                            </Action>
                        }
                        <Action onClick={add} className={"w-7 h-7 !p-0"}>
                            <IconAdd />
                        </Action>
                    </div>
                </div>
            })
        }
    </div>
})
