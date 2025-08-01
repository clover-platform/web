'use client'

import { ModuleBreadcrumb } from '@/components/common/breadcrumb/module'
import type { ModuleLayoutProps } from '@/components/layout/module'
import { MainPage } from '@clover/public/components/common/page'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { BreadcrumbItem, BreadcrumbPage, Tabs, TabsContent, TabsList, TabsTrigger } from '@easykit/design'
import { usePathname, useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getTabs } from './config'

export const SourcePage = () => {
  useLayoutConfig<ModuleLayoutProps>({
    active: 'source',
  })
  const { t } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()
  const [active, setActive] = useQueryState('type', {
    defaultValue: 'files',
    clearOnDefault: false,
  })

  const actions = useMemo(() => {
    return getTabs().find((tab) => tab.id === active)?.actions
  }, [active])

  return (
    <MainPage>
      <ModuleBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>{t('资源')}</BreadcrumbPage>
        </BreadcrumbItem>
      </ModuleBreadcrumb>
      <Tabs
        value={active}
        onValueChange={(v) => {
          router.replace(`${pathname}?type=${v}`)
        }}
      >
        <TitleBar
          title={
            <TabsList className="bg-black/8 dark:bg-white/8">
              {getTabs().map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
          }
          actions={actions}
          border={false}
        />
        {getTabs().map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </MainPage>
  )
}
