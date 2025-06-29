import {IconApps} from "@arco-iconbox/react-clover";
import { AppsItem } from '@clover/public/components/layout/main/header/apps/item'
import { AppsLoading } from '@clover/public/components/layout/main/header/apps/loading'
import {useAppsLoader} from "@clover/public/hooks/use.apps.loader";
import { Action, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@easykit/design'
import { useState } from 'react'

export const Apps = () => {
  const [open, setOpen] = useState(false);
  const {loading, apps} = useAppsLoader();
 
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Action className="!outline-none" active={open}>
          <IconApps />
        </Action>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-96 p-4">
        {loading ? (
          <AppsLoading />
        ) : (
          <div className="space-y-2">
            {apps.map((app) => (
              <AppsItem onClick={() => setOpen(false)} key={app.appId} {...app} />
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
