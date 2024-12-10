import { Command, CommandInput, CommandItem, CommandList, SheetClose } from "@easykit/design";
import {CheckIcon} from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import { currentLanguageState, languagesState } from "@/state/worktop";
import { t } from '@clover/public/locale';

export const MenuLanguageSheet = () => {
    const [languages] = useAtom(languagesState);
    const [current, setCurrent] = useAtom(currentLanguageState);

    return <div className={"space-y-2"}>
        <div className={"text-xl font-bold"}>{t("语言")}</div>
        <Command className={"h-auto"}>
            <CommandInput className={"h-8"} placeholder={t("请输入关键词")} />
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
