import {Action, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@easykit/design";
import {IconApps} from "@arco-iconbox/react-clover";
import {useCallback, useEffect, useState} from "react";
import {AppsLoading} from "@clover/public/components/layout/main/header/apps/loading";
import {apps as appsRest, AppsItemProps} from "@clover/public/rest/config";
import {AppsItem} from "@clover/public/components/layout/main/header/apps/item";

export const Apps = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [apps, setApps] = useState<AppsItemProps[]>([]);

    const load = useCallback(async () => {
        const { success, data } = await appsRest();
        setLoading(false);
        setApps(success ? data! : []);
    }, [])

    useEffect(() => {
        if(open && loading) {
            load().then();
        }
    }, [open, loading])

    return <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
            <Action className={"!outline-none"} active={open}>
                <IconApps />
            </Action>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={"start"} className={"p-2 w-80"}>
            {
                loading ?
                    <AppsLoading /> :
                    <div className={"space-y-2"}>
                        { apps.map((app, index) => <AppsItem key={index} {...app}/>) }
                    </div>
            }
        </DropdownMenuContent>
    </DropdownMenu>
}
