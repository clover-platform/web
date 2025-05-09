import {FC, PropsWithChildren} from "react";
import Logo from "@clover/public/components/common/logo";
import classNames from "classnames";
import Link from "@clover/public/components/common/link";
import {LangSelect} from "@clover/public/components/common/select/lang";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";
import {ThemeSwitcher} from "@clover/public/components/common/theme-switcher";
import {Card} from "@easykit/design";
import { useTranslation } from 'react-i18next';

export type LoginLayoutProps = PropsWithChildren<{
  title?: string;
  showLogo?: boolean;
}>;

export const LoginLayout: FC<LoginLayoutProps> = (originProps) => {
  const props = useLayoutProps<LoginLayoutProps>(originProps);
  const { t } = useTranslation();
  const {
    title = t("幸运草"),
    showLogo = true
  } = props;

  return <div className={"flex justify-center w-full min-h-[100vh] flex-col bg-secondary"}>
    <div className={"flex-1 flex justify-center items-center flex-col p-8 mb-[--login-footer-height]"}>
      <Card className={"shadow-none px-8 py-6"}>
        {
          showLogo ? <a href={"/"}>
            <div className={"mb-6 flex justify-center items-center space-x-2"}>
              <Logo size={48}/>
              <div className={"text-center font-bold text-2xl"}>{title}</div>
            </div>
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
