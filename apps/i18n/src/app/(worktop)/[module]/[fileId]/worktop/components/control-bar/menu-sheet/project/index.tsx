import { all } from '@/rest/module'
import type { Module } from '@/types/module'
import { IconShare } from '@arco-iconbox/react-clover'
import { Command, CommandInput, CommandItem, CommandList, Separator, Spin } from '@easykit/design'
import { CheckIcon } from '@radix-ui/react-icons'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const MenuProjectSheet = () => {
  const params = useParams()
  const { module } = params
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<Module[]>([])
  const { t } = useTranslation()

  const switchProject = (identifier: string) => {
    location.href = `/${identifier}/all/worktop`
  }

  const open = (url: string) => {
    window.open(`/${module}/${url}`, '_blank')
  }

  const load = useCallback(async () => {
    setLoading(true)
    const { success, data } = await all({})
    setLoading(false)
    setProjects(success ? (data ?? []) : [])
  }, [])

  useEffect(() => {
    load().then()
  }, [load])

  return (
    <div className="space-y-2">
      <div className="font-bold text-xl">{t('项目')}</div>
      <Command className="h-auto">
        <CommandList className="p-0">
          <CommandItem onSelect={() => open('dashboard')}>
            <div className="flex w-full items-center justify-center">
              <span className="flex-1">{t('概览')}</span>
              <IconShare />
            </div>
          </CommandItem>
          <CommandItem onSelect={() => open('activity')}>
            <div className="flex w-full items-center justify-center">
              <span className="flex-1">{t('动态')}</span>
              <IconShare />
            </div>
          </CommandItem>
          <CommandItem onSelect={() => open('setting')}>
            <div className="flex w-full items-center justify-center">
              <span className="flex-1">{t('设置')}</span>
              <IconShare />
            </div>
          </CommandItem>
        </CommandList>
      </Command>
      <Separator />
      <div className="text-muted-foreground text-xs">{t('打开项目')}</div>
      <Command className="h-auto">
        <CommandInput className="h-8" placeholder={t('请输入关键词')} />
        {loading ? (
          <div className="flex items-center justify-center p-6">
            <Spin />
          </div>
        ) : (
          <CommandList className="mt-2 p-0">
            {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
            {projects.map((item: any) => {
              return (
                <CommandItem key={item.id} onSelect={() => switchProject(item.identifier)}>
                  <div className="flex w-full items-center justify-center">
                    <span className="flex-1">{`${item.name} [${item.identifier}]`}</span>
                    {item.identifier === module ? <CheckIcon /> : null}
                  </div>
                </CommandItem>
              )
            })}
          </CommandList>
        )}
      </Command>
    </div>
  )
}
