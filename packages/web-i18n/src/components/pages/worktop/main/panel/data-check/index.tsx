import {FC, PropsWithChildren, useState} from "react";
import { useRecoilValue } from "recoil";
import { currentLanguageState, entriesState } from "@/state/worktop";
import { Empty } from "@atom-ui/core";
import {InfoCircledIcon} from "@radix-ui/react-icons";
import {Action} from "@clover/public/components/common/action";
import {IconAdd} from "@arco-iconbox/react-clover";
import bus from "@easy-kit/common/events";
import {ENTRY_RELOAD} from "@/events/worktop";
import {CreateEntryModal} from "@/components/pages/worktop/main/panel/entry/create/modal";
import {FIX_ICON_PROPS} from "@easy-kit/common/utils/icon";

export const TargetTip = () => {
    return <div className={"h-full flex justify-center items-center bg-muted flex-col space-y-2"}>
        <InfoCircledIcon className={"w-10 h-10 opacity-40"} />
        <div className={"text-muted-foreground"}>
            {"{#请选择目标语言#}"}
        </div>
    </div>;
}

export type DataCheckPanelProps = PropsWithChildren<{}>;

export const DataCheckPanel: FC<DataCheckPanelProps> = (props) => {
    const [visible, setVisible] = useState(false);
    const emptyText = <div className={"flex justify-center items-center space-x-1"}>
        <div>{"{#暂无词条#}"}</div>
        <Action onClick={() => setVisible(true)} className={"!p-1"}><IconAdd {...FIX_ICON_PROPS} />{"{#添加#}"}</Action>
    </div>
    const currentLanguage = useRecoilValue(currentLanguageState);
    const entries = useRecoilValue(entriesState);
    return currentLanguage ? (!entries.length ? <div className={"h-full flex justify-center items-center bg-muted"}>
        <Empty text={emptyText} />
        <CreateEntryModal
            visible={visible}
            onCancel={() => setVisible(false)}
            onSuccess={(close) => {
                if(close) {
                    setVisible(false);
                }
                bus.emit(ENTRY_RELOAD);
            }}
        />
    </div> : props.children) : <TargetTip />;
}
