import { FC, PropsWithChildren } from "react";
import { useRecoilValue } from "recoil";
import { currentLanguageState, entriesState } from "@/state/worktop";
import { Empty } from "@atom-ui/core";

export const TargetTip = () => {
    return <div className={"h-full flex justify-center items-center bg-muted"}>
        <div className={"m-6 flex-col text-muted-foreground"}>
            {"{#请选择目标语言#}"}
        </div>
    </div>;
}

export type DataCheckPanelProps = PropsWithChildren<{}>;

export const DataCheckPanel: FC<DataCheckPanelProps> = (props) => {
    const currentLanguage = useRecoilValue(currentLanguageState);
    const entries = useRecoilValue(entriesState);
    return currentLanguage ? (!entries.length ? <div className={"h-full flex justify-center items-center bg-muted"}>
        <Empty text={"{#暂无词条#}"} />
    </div> : props.children) : <TargetTip />;
}
