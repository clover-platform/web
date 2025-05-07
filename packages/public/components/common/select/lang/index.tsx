import {Select, SelectOptionProps} from "@easykit/design";
import {useLocale} from "@clover/public/hooks/use.locale";
import langList from "@clover/public/config/lang.list";
import {FC} from "react";
import classNames from "classnames";
import { i18n } from "@clover/public/utils/i18next";
import {COOKIE_MAX_AGE} from "@clover/public/config/app";
import {setCookie} from "cookies-next";

const options: SelectOptionProps[] = langList.map((lang) => ({
  value: lang.locale,
  label: lang.name,
}));

export type LangSelectProps = {
  className?: string;
}

export const LangSelect: FC<LangSelectProps> = (props) => {
  const {className} = props;
  const [locale, setLocale] = useLocale();

  return <Select
    value={locale}
    options={options}
    className={classNames("w-auto px-2 py-1 h-8", className)}
    align={"end"}
    onChange={async (value) => {
      if (locale !== value) {
        setLocale(value);
        setCookie("locale", value, {
          maxAge: COOKIE_MAX_AGE,
        });
        await i18n?.changeLanguage(value);
      }
    }}
  />
}
