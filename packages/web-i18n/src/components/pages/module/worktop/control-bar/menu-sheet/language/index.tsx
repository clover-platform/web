import { Command, CommandInput, CommandItem, CommandList, SheetClose } from "@atom-ui/core";
import {CheckIcon} from "@radix-ui/react-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentLanguageState, languagesState } from "@/state/worktop";
import {useSearchParams} from "next/navigation";

export const MenuLanguageSheet = () => {
    const languages = useRecoilValue(languagesState);
    const [current, setCurrent] = useRecoilState(currentLanguageState);

    return <div className={"space-y-2"}>
        <div className={"text-xl font-bold"}>{"{#语言#}"}</div>
        <Command className={"h-auto"}>
            <CommandInput className={"h-8"} placeholder="{#请输入关键词#}" />
            <SheetClose>
                <CommandList className={"p-0 mt-2 text-left"}>
                    {
                        languages.map((item: any) => {
                            return <CommandItem key={item.id} onSelect={() => setCurrent(item.code)}>
                                <div className={"flex justify-center items-center w-full"}>
                                    <span className={"flex-1"}>{item.name}</span>
                                    { item.code === current ? <CheckIcon /> : null }
                                </div>
                            </CommandItem>
                        })
                    }
                </CommandList>
            </SheetClose>
        </Command>
    </div>
}