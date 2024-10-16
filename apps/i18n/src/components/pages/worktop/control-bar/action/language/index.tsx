import { Action } from "@clover/public/components/common/action";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { currentLanguageState, languagesState } from "@/state/worktop";
import { t } from '@easykit/common/utils/locale';

export type LanguageActionProps = {
    onClick: () => void;
};

export const LanguageAction: FC<LanguageActionProps> = (props) => {
    const languages = useRecoilValue(languagesState);
    const current = useRecoilValue(currentLanguageState);
    const language = languages.find(item => item.code === current);

    return <Action className={"!px-1.5 h-8"} onClick={props.onClick}>
        { language ? language.name : t("请选择语言") }
    </Action>
}
