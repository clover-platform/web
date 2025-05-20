import { MainLayout as PublicMainLayout } from "@clover/public/components/layout/main";
import { FC, PropsWithChildren } from "react";
import { useLayoutProps } from "@clover/public/components/layout/hooks/use.layout.props";

export type ModuleLayoutProps = {
  active?: string;
  className?: string;
} & PropsWithChildren;

export const ModuleLayout: FC<ModuleLayoutProps> = (origin) => {
  const props = useLayoutProps<ModuleLayoutProps>(origin);

  return <PublicMainLayout
    {...props}
  >
    {props.children}
  </PublicMainLayout>
}
