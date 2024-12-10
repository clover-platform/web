import { Select, SelectOptionProps } from "@easykit/design";
import {useLocale} from "@clover/public/hooks/use.locale";
import { setCookie } from "cookies-next"
import langList from "@clover/public/config/lang.list";
import {COOKIE_MAX_AGE} from "@clover/public/config/app";

const options: SelectOptionProps[] = langList.map((lang) => ({
    value: lang.locale,
    label: lang.name,
}));

export const LangSelect = () => {
    const locale = useLocale();

    return <Select
        value={locale}
        options={options}
        className={"w-auto px-2 py-1 h-auto"}
        align={"end"}
        onChange={(value) => {
            if(locale !== value) {
                setCookie("locale", value, {
                    maxAge: COOKIE_MAX_AGE,
                });
                location.href = location.href.replaceAll(locale, value);
            }
        }}
    />
}
