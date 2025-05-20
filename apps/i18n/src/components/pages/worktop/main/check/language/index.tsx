import { useAtom } from "jotai";
import { currentLanguageState } from "@/state/worktop";
import { FC, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

export type LanguageCheckProps = PropsWithChildren;

export const LanguageCheck: FC<LanguageCheckProps> = (props) => {
  const { t } = useTranslation();
  const [current] = useAtom(currentLanguageState);
  return current ? props.children : <div className={"w-full h-full flex justify-center items-center text-md text-muted-foreground bg-muted"}>{t("请选择语言")}</div>;
}
