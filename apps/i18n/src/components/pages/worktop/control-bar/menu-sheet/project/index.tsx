import {Command, CommandInput, CommandItem, CommandList, Input, Separator, Spin} from "@atom-ui/core";
import {IconShare} from "@arco-iconbox/react-clover";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {all} from "@/rest/module";
import { CheckIcon } from '@radix-ui/react-icons';

export const MenuProjectSheet = () => {
    const search = useSearchParams();
    const id = search.get("id");
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<any>([]);

    const switchProject = (id: number) => {
        location.href = '?id=' + id;
    }

    const open = (url: string) => {
        window.open(`/{#LANG#}/i18n/${url}/?id=${id}`, `_blank`);
    }

    const load = async () => {
        setLoading(true);
        const { success, data } = await all({});
        setLoading(false);
        setProjects(success ? data : []);
    }

    useEffect(() => {
        load().then();
    }, [])

    return <div className={"space-y-2"}>
        <div className={"text-xl font-bold"}>{"{#项目#}"}</div>
        <Command className={"h-auto"}>
            <CommandList className={"p-0"}>
                <CommandItem onSelect={() => open('dashboard')}>
                    <div className={"flex justify-center items-center w-full"}>
                        <span className={"flex-1"}>{"{#概览#}"}</span>
                        <IconShare />
                    </div>
                </CommandItem>
                <CommandItem onSelect={() => open('activity')}>
                    <div className={"flex justify-center items-center w-full"}>
                        <span className={"flex-1"}>{"{#动态#}"}</span>
                        <IconShare />
                    </div>
                </CommandItem>
                <CommandItem onSelect={() => open('setting')}>
                    <div className={"flex justify-center items-center w-full"}>
                        <span className={"flex-1"}>{"{#设置#}"}</span>
                        <IconShare />
                    </div>
                </CommandItem>
            </CommandList>
        </Command>
        <Separator/>
        <div className={"text-muted-foreground text-xs"}>{"{#打开项目#}"}</div>
        <Command className={"h-auto"}>
            <CommandInput className={"h-8"} placeholder="{#请输入关键词#}" />
            {
                loading ? <div className={"flex justify-center items-center p-6"}>
                    <Spin/>
                </div> : <CommandList className={"p-0 mt-2"}>
                    {
                        projects.map((item: any) => {
                            return <CommandItem key={item.id} onSelect={() => switchProject(item.id)}>
                                <div className={"flex justify-center items-center w-full"}>
                                    <span className={"flex-1"}>{`${item.name} [${item.identifier}]`}</span>
                                    { item.id === Number(id) ? <CheckIcon /> : null }
                                </div>
                            </CommandItem>
                        })
                    }
                </CommandList>
            }
        </Command>
    </div>
}
