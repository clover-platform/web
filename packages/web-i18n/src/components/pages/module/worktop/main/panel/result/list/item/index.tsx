import classNames from "classnames";
import { Avatar, Tooltip } from "@atom-ui/core";
import { Action } from "@clover/public/components/common/action";
import { CheckIcon } from "@radix-ui/react-icons";
import { IconDelete } from "@arco-iconbox/react-clover";
import { EntryResult } from "@/types/pages/entry";
import { FC } from "react";
import TimeAgo from "javascript-time-ago";

export type ResultItemProps = {
    item: EntryResult;
}

export const ResultItem: FC<ResultItemProps> = (props) => {
    const timeAgo = new TimeAgo('{#LANG#}')
    const { item } = props;
    const { translator, verifier } = item;

    return <div className={classNames(
        "border rounded-md",
        "hover:shadow-md",
    )}>
        <div className={"p-3"}>{ item.content }</div>
        <div className={"bg-muted flex justify-center items-center p-2 space-x-2"}>
            <div className={"flex justify-start items-center"}>
                <Avatar src={translator?.avatar} fallback={translator?.username} className={"bg-muted-foreground mr-1 w-8 h-8"} />
                <span className={"text-muted-foreground"}>{translator?.email}</span>
            </div>
            <div className={"text-muted-foreground"}>{timeAgo.format(new Date(item.updateTime))}</div>
            <div className={"flex-1 flex justify-end items-center"}>
                <Tooltip content={"{#批准#}"}>
                    <Action>
                        <CheckIcon />
                    </Action>
                </Tooltip>
                <Tooltip content={"{#删除#}"}>
                    <Action>
                        <IconDelete className={"text-base"} />
                    </Action>
                </Tooltip>
            </div>
        </div>
    </div>
}
