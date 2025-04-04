import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList, BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, Skeleton
} from "@easykit/design";
import {FC, PropsWithChildren, useCallback, useMemo} from "react";
import {useAppsLoader} from "@clover/public/hooks/use.apps.loader";
import {IconHome} from "@arco-iconbox/react-clover";
import {useRouter} from "next/navigation";

export type PublicAppBreadcrumbProps = PropsWithChildren<{
  appId: string;
}>;

export const PublicAppBreadcrumb: FC<PublicAppBreadcrumbProps> = (props) => {
  const { appId } = props;
  const {loading, apps} = useAppsLoader();
  const router = useRouter();

  const current = useMemo(() => {
    const app = apps.find((app) => app.appId === appId);
    return app?.name;
  }, [appId, apps])

  const openApp = useCallback((href: string) => {
    if(href.startsWith(location.origin)) {
      router.push(href.replace(location.origin, ""))
    }else{
      window.open(href)
    }
  }, [router])

  return <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            {
              loading ? <Skeleton className={"w-20 h-5"} /> : <span className={"flex justify-center items-center space-x-1"}>
                <IconHome /> <span>{current}</span>
              </span>
            }
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {
              apps.map((app) => <DropdownMenuItem
                key={app.appId}
                onClick={() => openApp(app.href)}
              >
                {app.name}
              </DropdownMenuItem>)
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      {props.children}
    </BreadcrumbList>
  </Breadcrumb>
}
