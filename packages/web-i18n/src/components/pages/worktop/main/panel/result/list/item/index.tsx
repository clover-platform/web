import classNames from "classnames";
import { Avatar, Badge, Tooltip, useAlert, useMessage } from "@atom-ui/core";
import { Action } from "@clover/public/components/common/action";
import { CheckIcon } from "@radix-ui/react-icons";
import { IconDelete } from "@arco-iconbox/react-clover";
import { EntryResult } from "@/types/pages/entry";
import { FC } from "react";
import { approve as approveRest, deleteResult, removeApproval as removeApprovalRest } from "@/rest/entry.result";
import bus from "@easy-kit/common/events";
import { ENTRY_RESULT_EDITOR_RESET, ENTRY_RESULT_RELOAD } from "@/events/worktop";
import { useEntriesUpdater } from "@/components/layout/worktop/hooks";
import { RestResult } from "@easy-kit/common/types/rest";
import { TimeAgo } from "@easy-kit/common/components/time-ago";
import {FIX_ICON_PROPS} from "@easy-kit/common/utils/icon";

export type ResultItemProps = {
    item: EntryResult;
}

export const ResultItem: FC<ResultItemProps> = (props) => {
    const { item } = props;
    const { translator, verifier } = item;
    const alert = useAlert();
    const msg = useMessage();
    const { update } = useEntriesUpdater();

    const resultWrapper = async (result: RestResult<any>) => {
        const { success, message } = result;
        if(success) {
            bus.emit(ENTRY_RESULT_RELOAD);
            await update(item.entryId);
            bus.emit(ENTRY_RESULT_EDITOR_RESET);
        }else{
            msg.error(message);
        }
        return success;
    }

    const deleteItem = () => {
        alert.confirm({
            title: "{#删除#}",
            description: "{#是否删除此翻译#}",
            onOk: async () => {
                return resultWrapper(await deleteResult({ id: item.id }));
            }
        })
    }

    const approve = () => {
        alert.confirm({
            title: "{#批准#}",
            description: "{#是否批准改翻译作为有效结果#}",
            onOk: async () => {
                return resultWrapper(await approveRest({ id: item.id }));
            }
        })
    }

    const removeApproval = () => {
        alert.confirm({
            title: "{#撤销批准#}",
            description: "{#是否撤销此翻译的有效结果#}",
            onOk: async () => {
                return resultWrapper(await removeApprovalRest({ id: item.id }));
            }
        })
    }

    return <div className={classNames(
        "border rounded-md",
        "hover:border-primary",
    )}>
        <div className={"bg-muted px-3 py-2 flex justify-center items-start rounded-t-md"}>
            <div className={"flex-1 mr-2 py-1"}>{item.content}</div>
            <div className={"space-x-1 flex justify-center items-center"}>
                <Tooltip content={item.verified ? "{#撤销批准#}" : "{#批准#}"}>
                    <Action onClick={item.verified ? removeApproval : approve} active={item.verified}>
                        <CheckIcon />
                    </Action>
                </Tooltip>
                <Tooltip content={"{#删除#}"}>
                    <Action onClick={deleteItem}>
                        <IconDelete {...FIX_ICON_PROPS} className={"text-base"} />
                    </Action>
                </Tooltip>
            </div>
        </div>
        <div className={"p-2 space-y-2"}>
            <div className={"flex justify-start items-center space-x-2"}>
                <div className={"flex justify-start items-center"}>
                    <Avatar
                        src={translator?.avatar!}
                        fallback={translator?.username}
                        className={"bg-muted-foreground mr-1 w-8 h-8"}
                    />
                    <span className={"text-muted-foreground"}>{translator?.username}</span>
                </div>
                <div className={"text-muted-foreground"}>
                    <TimeAgo time={item.updateTime}/>
                </div>
            </div>
            {
                item.verified ? <div className={"flex justify-start items-center space-x-2"}>
                    <div className={"w-4 h-5 border-l border-b rounded-bl-lg ml-4 -mt-3"} />
                    <Badge variant={"outline"} className={"px-1 bg-success text-success-foreground"}>
                        <CheckIcon />
                    </Badge>
                    <span className={"text-success-foreground"}>{"{#已批准#}"}</span>
                    <div className={"flex justify-start items-center"}>
                        <Avatar
                            src={verifier?.avatar!}
                            fallback={verifier?.username}
                            className={"bg-muted-foreground mr-1 w-8 h-8"}
                        />
                        <span className={"text-muted-foreground"}>{verifier?.username}</span>
                    </div>
                    <div className={"text-muted-foreground"}>
                        <TimeAgo time={item.verifiedTime!}/>
                    </div>
                </div> : null
            }
        </div>
    </div>
}
