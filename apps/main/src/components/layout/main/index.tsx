import {FC} from "react";
import {MainLayout as PublicMainLayout, MainLayoutProps as PublicMainLayoutProps} from "@clover/public/components/layout/main";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";
import {Header} from "./header";

export type MainLayoutProps = PublicMainLayoutProps & {
  active?: string;
};

export const MainLayout: FC<MainLayoutProps> = (origin) => {
  const props = useLayoutProps<MainLayoutProps>(origin);

  return <PublicMainLayout
    className={"bg-secondary dark:bg-background"}
    headerProps={{
      logoUrl: "/dashboard",
      className: "bg-background dark:bg-black/50",
      extra: <Header active={props.active}/>
    }}
    footerProps={{
      simple: true,
    }}
  >
    {props.children}
  </PublicMainLayout>
}
