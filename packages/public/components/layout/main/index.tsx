import {FC, PropsWithChildren} from "react";
import {Header, HeaderProps} from "@clover/public/components/layout/main/header";
import {Footer, FooterProps} from "@clover/public/components/layout/main/footer";
import classNames from "classnames";

export type MainLayoutProps = PropsWithChildren<{
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
  bodyClassName?: string;
  className?: string;
  container?: boolean;
}>;

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const {
    footerProps = {},
    headerProps = {},
    className,
    bodyClassName,
    children,
    container = true,
  } = props;

  return <div className={classNames("flex justify-center items-center flex-col min-h-[100vh]", className)}>
    <Header {...headerProps}/>
    <div className={classNames("flex-1 w-full", bodyClassName)}>
      {container ? <div className={"container py-4"}>{children}</div> : children}
    </div>
    <Footer {...footerProps}/>
  </div>
}
