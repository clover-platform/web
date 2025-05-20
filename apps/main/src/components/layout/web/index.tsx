import {FC} from "react";
import {MainLayout, MainLayoutProps} from "@clover/public/components/layout/main";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";

export type WebLayoutProps = MainLayoutProps & {
  active?: string;
};

export const WebLayout: FC<WebLayoutProps> = (origin) => {
  const props = useLayoutProps<WebLayoutProps>(origin);

  return <MainLayout
    headerProps={{
      logoUrl: "/",
      // extra: <Header active={props.active}/>
    }}
    bodyClassName={"bg-secondary"}
  >
    {props.children}
  </MainLayout>
}
