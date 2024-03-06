import { Select, SelectOptionProps } from "@atom-ui/core";

const options: SelectOptionProps[] = [
    {
        value: 'zh-cn',
        label: '简体中文'
    },
    {
        value: 'en-us',
        label: 'English'
    }
]

export const LangSelect = () => {
    const current = "{#LANG#}";

    return <Select
        value={current}
        options={options}
        className={"w-auto px-2 py-1 h-auto"}
        align={"end"}
        onChange={(value) => {
            if(current !== value) {
                localStorage.setItem('lang', value);
                location.href = location.href.replaceAll(current, value);
            }
        }}
    />
}
