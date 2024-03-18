import { forwardRef, useEffect, useState } from "react";
import {cn, ComboSelect, ComboSelectOptionProps, ComboSelectProps} from "@atom-ui/core";
import { languages } from "@/rest/common";

export type LanguageSelectProps = {
    className?: string;
} & ComboSelectProps;

export const LanguageSelect = forwardRef<HTMLSelectElement, LanguageSelectProps>((props, ref) => {
    const {className, ...rest} = props;
    const [options, setOptions] = useState<ComboSelectOptionProps<any>[]>([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true)
        const { success, data } = await languages();
        setLoading(false);
        if(success) {
            setOptions(data?.map((lang: any) => {
                return {
                    label: lang.name,
                    value: lang.code.toLowerCase(),
                    raw: lang,
                }
            }) || []);
        }
    }

    useEffect(() => {
        load().then();
    }, []);

    return <ComboSelect
        {...rest}
        ref={ref}
        className={cn(
            "w-full max-h-[150px] overflow-auto",
            className,
        )}
        searchPlaceholder={"{#关键词#}"}
        options={options}
        loading={loading}
        clearText={"{#清空选择#}"}
        filter={(value: string, search: string) => {
            const item = options.find((o) => o.value === value);
            const label = item?.label?.toString();
            const v = item?.value;
            return (
                label?.toLowerCase().includes(search.toLowerCase())
                || v?.toLowerCase().includes(search.toLowerCase())
            ) ? 1 : 0;
        }}
    />

})
