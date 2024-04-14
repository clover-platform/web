import {Command, CommandItem, CommandList} from "@atom-ui/core";
import {IconShare} from "@arco-iconbox/react-clover";
import {FIX_ICON_PROPS} from "@easy-kit/common/utils/icon";

export const MenuHelpSheet = () => {
    return <div className={"space-y-2"}>
        <div className={"text-xl font-bold"}>{"{#帮助#}"}</div>
        <Command className={"h-auto"}>
            <CommandList className={"p-0"}>
                <CommandItem>
                    <div className={"flex justify-center items-center w-full"}>
                        <span className={"flex-1"}>{"{#快速上手#}"}</span>
                        <IconShare {...FIX_ICON_PROPS} />
                    </div>
                </CommandItem>
                <CommandItem>
                    <div className={"flex justify-center items-center w-full"}>
                        <span className={"flex-1"}>{"{#设置#}"}</span>
                    </div>
                </CommandItem>
            </CommandList>
        </Command>
    </div>
}
