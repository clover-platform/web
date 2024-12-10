import {Spin, Tooltip} from "@easykit/design";
import {Action} from "@clover/public/components/common/action";
import {ArrowBottomLeftIcon, CheckIcon} from "@radix-ui/react-icons";
import {FC, useCallback} from "react";
import {useResultSubmit} from "@/components/pages/worktop/main/panel/result/hooks/use.result.submit";
import { t } from '@clover/public/locale';
import bus from "@clover/public/events";
import {ENTRY_RESULT_AI_INSERT} from "@/events/worktop";

export type AIItemProps = {
    value: string;
}

export const AIItem: FC<AIItemProps> = (props) => {
    const [submit, loading] = useResultSubmit();

    const insert = useCallback((value: string) => {
        bus.emit(ENTRY_RESULT_AI_INSERT, value);
    }, [])

    return <div className={"flex bg-muted p-3 rounded-lg justify-center items-center space-x-1 group"}>
        <div className={"flex-1 min-h-7 flex justify-start items-center"}>{props.value}</div>
        <div className={"h-7 hidden justify-center items-center group-hover:flex space-x-1"}>
            <Tooltip content={t("采用")}>
                <Action disabled={loading} onClick={() => insert(props.value)} className={"!p-1"}>
                    <ArrowBottomLeftIcon />
                </Action>
            </Tooltip>
            <Tooltip content={t("采用并保存")}>
                <Action disabled={loading} onClick={() => submit(props.value)} className={"!p-1"}>
                    { loading ? <Spin /> : <CheckIcon /> }
                </Action>
            </Tooltip>
        </div>
    </div>
}
