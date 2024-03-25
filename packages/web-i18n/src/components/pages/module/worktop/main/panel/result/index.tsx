import { useRecoilValue } from "recoil";
import { currentEntryState } from "@/state/worktop";
import { Editor } from "@/components/pages/module/worktop/main/panel/result/editor";
import { ResultList } from "@/components/pages/module/worktop/main/panel/result/list";

export const ResultPanel = () => {
    const current = useRecoilValue(currentEntryState);
    return <div className={"w-full h-full flex justify-center items-center flex-col"}>
        <Editor key={`editor-${current}`} />
        <ResultList key={`list-${current}`} />
    </div>
}
