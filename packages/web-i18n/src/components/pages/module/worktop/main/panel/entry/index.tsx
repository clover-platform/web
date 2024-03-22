import { Input } from "@atom-ui/core";
import { CreateEntryButton } from "@/components/pages/module/worktop/main/panel/entry/create/button";

export const EntryPanel = () => {
    return <div className={"w-full h-full bg-muted"}>
        <div className={"p-2 flex justify-center items-center space-x-2"}>
            <Input className={"flex-1"} placeholder={"{#搜索词条#}"} />
            <CreateEntryButton />
        </div>
        <div>
            list
        </div>
    </div>
}
