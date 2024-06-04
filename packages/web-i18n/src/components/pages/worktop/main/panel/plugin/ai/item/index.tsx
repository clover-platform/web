import {Spin, Tooltip} from "@atom-ui/core";
import {Action} from "@clover/public/components/common/action";
import {CheckIcon} from "@radix-ui/react-icons";
import {FC} from "react";
import {useResultSubmit} from "@/components/pages/worktop/main/panel/result/hooks/use.result.submit";

export type AIItemProps = {
    value: string;
}

export const AIItem: FC<AIItemProps> = (props) => {
    const [submit, loading] = useResultSubmit();

    return <div className={"flex bg-muted p-3 rounded-lg justify-center items-center space-x-1 group"}>
        <div className={"flex-1 min-h-7 flex justify-start items-center"}>{props.value}</div>
        <div className={"w-7 h-7 hidden justify-center items-center group-hover:flex"}>
            <Tooltip content={"{#采用该建议#}"}>
                <Action disabled={loading} onClick={() => submit(props.value)} className={"!p-1"}>
                    { loading ? <Spin /> : <CheckIcon /> }
                </Action>
            </Tooltip>
        </div>
    </div>
}
