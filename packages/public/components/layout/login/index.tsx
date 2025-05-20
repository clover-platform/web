import {FC, PropsWithChildren} from "react";
import classNames from "classnames";
import Link from "@clover/public/components/common/link";
import {LangSelect} from "@clover/public/components/common/select/lang";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";
import {ThemeSwitcher} from "@clover/public/components/common/theme-switcher";
import {Card} from "@easykit/design";
import { useTranslation } from 'react-i18next';
import { LayoutLogo } from "../main/logo";

export type LoginLayoutProps = PropsWithChildren<{  
  showLogo?: boolean;
  appName?: string;
}>;

export const LoginLayout: FC<LoginLayoutProps> = (originProps) => {
  const props = useLayoutProps<LoginLayoutProps>(originProps);
  const { t } = useTranslation();
  const {
    showLogo = true,
    appName
  } = props;

  return <div className={"flex justify-center w-full min-h-[100vh] flex-col bg-secondary"}>
    <div className={"flex-1 flex justify-center items-center flex-col p-8 mb-[--login-footer-height]"}>
      <Card className={"shadow-none px-8 py-10"}>
        {
          showLogo ? <a href={"/"} className="flex justify-center items-center mb-6">
            <LayoutLogo />
            {appName ? <span className={"text-lg font-bold ml-1"}>· {appName}</span> : null}
          </a> : null
        }
        {props.children}
      </Card>
    </div>
    <div className={classNames(
      "fixed bottom-0 left-0 right-0 border-0 border-t",
      "flex justify-center items-center bg-white dark:bg-[#121212]",
    )}>
      <div className={"container flex justify-center items-center"}>
        <div className={"flex-1 space-x-2"}>
          <Link href={"#"}>{t("探索")}</Link>
          <Link href={"#"}>{t("帮助")}</Link>
          <Link href={"#"}>{t("关于")}</Link>
          <Link href={"#"}>{t("社区论坛")}</Link>
        </div>
        <div className={"flex-1 space-x-2 flex justify-end py-2"}>
          <ThemeSwitcher size={"sm"}/>
          <LangSelect/>
        </div>
      </div>
    </div>
  </div>
};
