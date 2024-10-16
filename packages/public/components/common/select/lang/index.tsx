import { Select, SelectOptionProps } from "@easykit/design";
import {useLocale} from "@clover/public/hooks/use.locale";

const options: SelectOptionProps[] = [
    {
        value: 'zh-cn',
        label: '简体中文'
    },
    {
        value: 'zh-tw',
        label: '繁體中文'
    },
    {
        value: 'en-us',
        label: 'English'
    }
]

export const LangSelect = () => {
    const locale = useLocale().toLowerCase();

    return <Select
        value={locale}
        options={options}
        className={"w-auto px-2 py-1 h-auto"}
        align={"end"}
        onChange={(value) => {
            if(locale !== value) {
                localStorage.setItem('lang', value);
                location.href = location.href.replaceAll(locale, value);
            }
        }}
    />
}
