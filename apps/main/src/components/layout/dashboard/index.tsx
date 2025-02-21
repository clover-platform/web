import {FC} from "react";
import {MainLayout, MainLayoutProps} from "@clover/public/components/layout/main";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";

export type DashboardLayoutProps = MainLayoutProps & {
  active?: string;
};

export const DashboardLayout: FC<DashboardLayoutProps> = (origin) => {
  const props = useLayoutProps<DashboardLayoutProps>(origin);

  return <MainLayout>
    {props.children}
  </MainLayout>
}
