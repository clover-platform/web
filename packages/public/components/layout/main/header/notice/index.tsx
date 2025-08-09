import { useState } from 'react'
import { IconNotice, IconShare } from '@arco-iconbox/react-clover'
import {
  Action,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Empty,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@easykit/design'
import { useTranslation } from 'react-i18next'

export const Notice = () => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild>
        <Action active={open} className="!outline-none">
          <IconNotice />
        </Action>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[540px] space-y-3 p-4">
        <div className="flex items-center justify-center">
          <div className="font-bold text-xl">{t('通知')}</div>
          <div className="flex flex-1 justify-end">
            <Action>
              <IconShare />
            </Action>
          </div>
        </div>
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="all">{t('全部')}</TabsTrigger>
            <TabsTrigger value="follow">{t('未读')}</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Empty text={t('暂无通知')} />
          </TabsContent>
          <TabsContent value="follow">
            <Empty text={t('暂无通知')} />
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
