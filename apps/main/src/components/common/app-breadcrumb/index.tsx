import {PublicAppBreadcrumb} from "@clover/public/components/common/breadcrumb";
import {FC, PropsWithChildren} from "react";

export type AppBreadcrumbProps = PropsWithChildren;

export const AppBreadcrumb: FC<AppBreadcrumbProps> = (props) => {
  return <PublicAppBreadcrumb appId={"dashboard"}>
    {props.children}
  </PublicAppBreadcrumb>
}
