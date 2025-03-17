import {FC, ReactNode, useCallback} from "react";
import {AppsItemProps} from "@clover/public/rest/config";
import {IconDashboard, IconHome, IconI18n, IconQA, IconWiki} from "@arco-iconbox/react-clover";
import {useRouter} from "next/navigation";

const ICONS: Record<string, ReactNode> = {
  "home": <IconHome/>,
  "dashboard": <IconDashboard/>,
  "wiki": <IconWiki/>,
  "i18n": <IconI18n/>,
  "qa": <IconQA/>,
}

export const AppsItem: FC<AppsItemProps> = (props) => {
  const {name, description, appId, href} = props;
  const router = useRouter();

  const openApp = useCallback(() => {
    if(href.startsWith(location.origin)) {
      router.push(href.replace(location.origin, ""))
    }else{
      window.open(href)
    }
  }, [href, router])

  return <div onClick={openApp} className={"flex items-start space-x-4 cursor-pointer hover:bg-secondary/80 p-2 rounded-md"}>
    <div
      className="h-10 w-10 bg-primary rounded-md flex justify-center items-center text-white text-2xl">{ICONS[appId]}</div>
    <div className="space-y-1 flex-1">
      <div className={"leading-5"}>{name}</div>
      <div className={"leading-3 text-xs text-secondary-foreground/50"}>{description}</div>
    </div>
  </div>
}
