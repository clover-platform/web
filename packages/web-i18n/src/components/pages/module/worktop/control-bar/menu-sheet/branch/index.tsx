import {Command, CommandInput, CommandItem, CommandList, Spin} from "@atom-ui/core";
import {CheckIcon} from "@radix-ui/react-icons";
import {useRecoilValue} from "recoil";
import {branchesState} from "@/state/worktop";
import {useSearchParams} from "next/navigation";

export const MenuBranchSheet = () => {
    const search = useSearchParams();
    const branch = search.get("branch");
    const branches = useRecoilValue(branchesState);

    const switchBranch = (code: string) => {}

    return <div className={"space-y-2"}>
        <div className={"text-xl font-bold"}>{"{#分支#}"}</div>
        <Command className={"h-auto"}>
            <CommandInput className={"h-8"} placeholder="{#请输入关键词#}" />
            <CommandList className={"p-0 mt-2"}>
                {
                    branches.map((item: any) => {
                        return <CommandItem key={item.id} onSelect={() => switchBranch(item.name)}>
                            <div className={"flex justify-center items-center w-full"}>
                                <span className={"flex-1"}>{item.name}</span>
                                { item.name === branch ? <CheckIcon /> : null }
                            </div>
                        </CommandItem>
                    })
                }
            </CommandList>
        </Command>
    </div>
}
