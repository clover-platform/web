import { useState } from 'react'
import { IconApps } from '@arco-iconbox/react-clover'
import { Action, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@easykit/design'
import { AppsItem } from '@clover/public/components/layout/main/header/apps/item'
import { AppsLoading } from '@clover/public/components/layout/main/header/apps/loading'
import { useAppsLoader } from '@clover/public/hooks/use.apps.loader'

export const Apps = () => {
  const [open, setOpen] = useState(false)
  const { loading, apps } = useAppsLoader()

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild>
        <Action active={open} className="!outline-none">
          <IconApps />
        </Action>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-96 p-4">
        {loading ? (
          <AppsLoading />
        ) : (
          <div className="space-y-2">
            {apps.map((app) => (
              <AppsItem key={app.appId} onClick={() => setOpen(false)} {...app} />
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
