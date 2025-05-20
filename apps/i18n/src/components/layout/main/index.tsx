import {FC} from "react";
import {MainLayout as PublicMainLayout, MainLayoutProps as PublicMainLayoutProps} from "@clover/public/components/layout/main";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";
import {Header} from "./header";
import {useUnauthorizedHandle} from "@clover/public/hooks/use.unauthorized.handle";

export type MainLayoutProps = PublicMainLayoutProps & {
  active?: string;
};

export const MainLayout: FC<MainLayoutProps> = (origin) => {
  const props = useLayoutProps<MainLayoutProps>(origin);
  useUnauthorizedHandle();

  return <PublicMainLayout
    className={"bg-secondary dark:bg-background"}
    headerProps={{
      logoUrl: "/dashboard",
      className: "bg-background dark:bg-black/50",
      extra: <Header active={props.active}/>
    }}
  >
    {props.children}
  </PublicMainLayout>
}
