import { Badge, Dropdown, DropdownMenuItemProps, Tooltip, useAlert, useMessage } from "@atom-ui/core";
import { Action } from "@clover/public/components/common/action";
import { ArrowLeftIcon, ArrowRightIcon, CopyIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { EditEntryButton } from "@/components/pages/module/worktop/main/panel/entry/edit/button";
import { useRecoilState, useRecoilValue } from "recoil";
import { branchesState, currentEntryState, entriesState } from "@/state/worktop";
import { useEntriesUpdater } from "@/components/layout/worktop/hooks";
import { FC, ReactNode } from "react";
import copy from 'copy-to-clipboard';
import { remove as removeRest } from "@/rest/entry";

type IconMenuItemProps = {
    icon?: ReactNode;
    label: string;
}

export const IconMenuItem: FC<IconMenuItemProps> = (props) => {
    return <div className={"flex justify-center items-center"}>
        <div className={"w-4 h-4 flex justify-center items-center mr-2"}>
            { props.icon }
        </div>
        <div className={"flex-1"}>{ props.label }</div>
    </div>;
}

const menus: DropdownMenuItemProps[] = [
    {
        type: "item",
        id: "copy.key",
        label: <IconMenuItem icon={<CopyIcon className={"text-lg"} />} label={"{#复制键值#}"}/>,
    },
    {
        type: "item",
        id: "copy.value",
        label: <IconMenuItem icon={<CopyIcon className={"text-lg"} />} label={"{#复制内容#}"}/>
    },
    {
        type: "separator",
        id: "separator.1",
    },
    {
        type: "item",
        id: "remove",
        label: <IconMenuItem label={"{#删除#}"}/>,
    },
];

export const Detail = () => {
    const entries = useRecoilValue(entriesState);
    const [current, setCurrent] = useRecoilState(currentEntryState);
    const entry = entries[current];
    const { update, remove } = useEntriesUpdater();
    const branches = useRecoilValue(branchesState);
    const branch = branches.find(b => b.id === entry.branchId);
    const msg = useMessage();
    const alert = useAlert();

    const prev = () => {
        if(current === entries.length - 1) {
            setCurrent(current - 1);
        }
    }

    const onItemClick = ({id}: DropdownMenuItemProps) => {
        if(id === "copy.key") {
            copy(entry.key);
            msg.success("{#复制成功#}")
        }else if(id === "copy.value") {
            copy(entry.value);
            msg.success("{#复制成功#}")
        }else if(id === "remove") {
            alert.confirm({
                title: "{#撤销批准#}",
                description: "{#是否撤销此翻译的有效结果#}",
                onOk: async () => {
                    const { success, message } = await removeRest(entry.id)
                    if(success) {
                        prev();
                        await remove(entry.id);
                    }else{
                        msg.error(message);
                    }
                    return success;
                }
            })
        }
    }

    return <div className={"w-full"}>
        <div className={"flex justify-center items-center p-2 px-4"}>
            <div className={"flex-1 text-base text-muted-foreground"}>{"{#原始内容#}"}</div>
            <div className={"flex"}>
                <Tooltip content={"{#上一个#}"}>
                    <Action disabled={current === 0} onClick={() => setCurrent(current - 1)}>
                        <ArrowLeftIcon />
                    </Action>
                </Tooltip>
                <Tooltip content={"{#下一个#}"}>
                    <Action disabled={current === entries.length - 1} onClick={() => setCurrent(current + 1)}>
                        <ArrowRightIcon />
                    </Action>
                </Tooltip>
                <EditEntryButton
                    onSuccess={async () => {
                        await update(entry.id);
                    }}
                    entry={entry}
                />
                <Dropdown
                    items={menus}
                    onItemClick={onItemClick}
                    asChild={true}
                >
                    <Action>
                        <DotsHorizontalIcon />
                    </Action>
                </Dropdown>

            </div>
        </div>
        <div className={"px-4 mb-4"}>
            {entry.value}
        </div>
        <div className={"px-4 mb-4"}>
            <Badge className={"mr-2"}>{branch?.name}</Badge>
            <span className={"text-muted-foreground"}>{entry.key}</span>
        </div>
    </div>
}
