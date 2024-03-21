import {Command, CommandInput, CommandItem, CommandList, Spin} from "@atom-ui/core";
import {CheckIcon} from "@radix-ui/react-icons";
import {useRecoilValue} from "recoil";
import {languagesState} from "@/state/worktop";
import {useSearchParams} from "next/navigation";

export const MenuLanguageSheet = () => {
    const search = useSearchParams();
    const target = search.get("target");
    const languages = useRecoilValue(languagesState);

    const switchLanguage = (code: string) => {}

    return <div className={"space-y-2"}>
        <div className={"text-xl font-bold"}>{"{#语言#}"}</div>
        <Command className={"h-auto"}>
            <CommandInput className={"h-8"} placeholder="{#请输入关键词#}" />
            <CommandList className={"p-0 mt-2"}>
                {
                    languages.map((item: any) => {
                        return <CommandItem key={item.id} onSelect={() => switchLanguage(item.code)}>
                            <div className={"flex justify-center items-center w-full"}>
                                <span className={"flex-1"}>{item.name}</span>
                                { item.code === target ? <CheckIcon /> : null }
                            </div>
                        </CommandItem>
                    })
                }
            </CommandList>
        </Command>
    </div>
}
