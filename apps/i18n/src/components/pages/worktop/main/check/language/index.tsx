import {useRecoilValue} from "recoil";
import {currentLanguageState} from "@/state/worktop";
import {FC, PropsWithChildren} from "react";
import { t } from '@easykit/common/utils/locale';

export type LanguageCheckProps = PropsWithChildren;

export const LanguageCheck: FC<LanguageCheckProps> = (props) => {
    const current = useRecoilValue(currentLanguageState);
    return current ? props.children : <div className={"w-full h-full flex justify-center items-center text-md text-muted-foreground bg-muted"}>{t("请选择语言")}</div>;
}
