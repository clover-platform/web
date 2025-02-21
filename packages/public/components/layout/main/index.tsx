import {FC, PropsWithChildren} from "react";
import {Header, HeaderProps} from "@clover/public/components/layout/main/header";
import {Footer, FooterProps} from "@clover/public/components/layout/main/footer";
import classNames from "classnames";

export type MainLayoutProps = PropsWithChildren<{
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
  bodyClassName?: string;
}>;

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const {
    footerProps = {},
    headerProps = {},
    bodyClassName,
    children
  } = props;

  return <div className={"flex justify-center items-center flex-col min-h-[100vh]"}>
    <Header {...headerProps}/>
    <div className={classNames("flex-1 w-full", bodyClassName)}>
      <div className={"container py-6"}>
        {children}
      </div>
    </div>
    <Footer {...footerProps}/>
  </div>
}
