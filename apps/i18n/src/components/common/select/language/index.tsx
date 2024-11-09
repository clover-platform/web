import { forwardRef } from "react";
import {cn, ComboSelect, ComboSelectProps} from "@easykit/design";
import { useRecoilValue } from "recoil";
import { languagesState } from "@/state/public";
import { t } from '@easykit/common/utils/locale';

export type LanguageSelectProps = {
    className?: string;
} & ComboSelectProps;

export const LanguageSelect = forwardRef<HTMLSelectElement, LanguageSelectProps>((props, ref) => {
    const {className, ...rest} = props;
    const languages = useRecoilValue(languagesState);

    const options = languages.map((lang) => {
        return {
            label: lang.name,
            value: lang.code,
            aw: lang,
        }
    });

    return <ComboSelect
        {...rest}
        ref={ref}
        className={cn(
            "w-full max-h-[150px] overflow-auto",
            className,
        )}
        searchPlaceholder={t("关键词")}
        options={options}
        clearText={t("清空选择")}
        filter={(value: string, search: string) => {
            const item = options.find((o) => o.value.toLowerCase() === value);
            const label = item?.label?.toString();
            const v = item?.value;
            return (
                label?.toLowerCase().includes(search.toLowerCase())
                || v?.toLowerCase().includes(search.toLowerCase())
            ) ? 1 : 0;
        }}
    />

})
