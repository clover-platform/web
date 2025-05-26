import {IconDashboard, IconHome, IconI18n, IconQA, IconWiki} from "@arco-iconbox/react-clover";
import type { AppsItemProps } from '@clover/public/rest/config'
import {useRouter} from "next/navigation";
import { type FC, type ReactNode, useCallback } from 'react'

const ICONS: Record<string, ReactNode> = {
  home: <IconHome />,
  dashboard: <IconDashboard />,
  wiki: <IconWiki />,
  i18n: <IconI18n />,
  qa: <IconQA />,
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

  return (
    <div onClick={openApp} className="flex cursor-pointer items-start space-x-4 rounded-md p-2 hover:bg-secondary/80">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-2xl text-white">
        {ICONS[appId]}
      </div>
      <div className="flex-1 space-y-1">
        <div className="leading-5">{name}</div>
        <div className="text-secondary-foreground/50 text-xs leading-3">{description}</div>
      </div>
    </div>
  )
}
