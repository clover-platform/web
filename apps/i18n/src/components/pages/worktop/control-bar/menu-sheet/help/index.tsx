import {Command, CommandItem, CommandList} from "@easykit/design";
import {IconShare} from "@arco-iconbox/react-clover";
import { t } from '@clover/public/locale';

export const MenuHelpSheet = () => {
    return <div className={"space-y-2"}>
        <div className={"text-xl font-bold"}>{t("帮助")}</div>
        <Command className={"h-auto"}>
            <CommandList className={"p-0"}>
                <CommandItem>
                    <div className={"flex justify-center items-center w-full"}>
                        <span className={"flex-1"}>{t("快速上手")}</span>
                        <IconShare />
                    </div>
                </CommandItem>
                <CommandItem>
                    <div className={"flex justify-center items-center w-full"}>
                        <span className={"flex-1"}>{t("设置")}</span>
                    </div>
                </CommandItem>
            </CommandList>
        </Command>
    </div>
}
