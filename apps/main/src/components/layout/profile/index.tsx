import {FC} from "react";
import {MainLayout, MainLayoutProps} from "@clover/public/components/layout/main";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";

export type ProfileLayoutProps = MainLayoutProps & {
  active?: string;
};

export const ProfileLayout: FC<ProfileLayoutProps> = (origin) => {
  const props = useLayoutProps<ProfileLayoutProps>(origin);

  return <MainLayout
    footerProps={{
      simple: true,
    }}
  >
    {props.children}
  </MainLayout>
}
