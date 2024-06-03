import {useRecoilValue} from "recoil";
import {currentLanguageState} from "@/state/worktop";
import {FC, PropsWithChildren} from "react";

export type LanguageCheckProps = PropsWithChildren;

export const LanguageCheck: FC<LanguageCheckProps> = (props) => {
    const current = useRecoilValue(currentLanguageState);
    return current ? props.children : <div className={"w-full h-full flex justify-center items-center text-md text-muted-foreground bg-muted"}>{"{#请选择语言#}"}</div>;
}