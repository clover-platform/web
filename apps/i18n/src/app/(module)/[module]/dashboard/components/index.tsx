'use client'
import { DetailInfoItem } from './detail/info-item'
import { DetailTitle } from './detail/title'
import { LanguageItem } from './language-item'
import { MemberItem } from './member-item'

import {
  BreadcrumbItem,
  BreadcrumbPage,
  Card,
  Empty,
  Loading,
  ScrollArea,
  ScrollBar,
  Separator,
  Space,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ValueFormatter,
} from '@easykit/design'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useParams, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { MainPage } from '@clover/public/components/common/page'
import { PageHeader } from '@clover/public/components/common/page/header'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { i18n } from '@clover/public/utils/locale.client'
import { ModuleBreadcrumb } from '@/components/common/breadcrumb/module'
import type { ModuleLayoutProps } from '@/components/layout/module'
import { dashboard } from '@/rest/module'
import { languagesState } from '@/state/public'
import type { Language } from '@/types/public'

export const DashboardPage = () => {
  useLayoutConfig<ModuleLayoutProps>({
    active: 'dashboard',
  })
  const { module } = useParams()
  const router = useRouter()
  const [all] = useAtom(languagesState)
  const { t } = useTranslation()
  const { data } = useQuery({
    queryKey: ['module:dashboard', module],
    queryFn: () => dashboard(module as string),
  })
  const { detail, languages, members, count } = data || {}

  const onRowClick = (item: Language) => {
    router.push(`/${module}/all/worktop?target=${item.code}`)
  }

  const actions = <Space />

  const title = t('概览')

  return (
    <MainPage>
      <PageHeader>
        <ModuleBreadcrumb>
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </ModuleBreadcrumb>
        <TitleBar actions={actions} border={false} title={title} />
      </PageHeader>
      <Loading>
        <div className="container flex items-start justify-start gap-4">
          <Card className="w-0 flex-1 flex-shrink-0">
            <ScrollArea className="w-full pb-2">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('语言')}</TableHead>
                    <TableHead className="w-64">{t('进度')}</TableHead>
                    <TableHead className="w-24" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {languages?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Empty />
                      </TableCell>
                    </TableRow>
                  )}
                  {languages?.map((item) => (
                    <LanguageItem key={item.id} onClick={() => onRowClick(item)} {...item} />
                  ))}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </Card>
          <Card className="w-96">
            <DetailTitle title={t('详情')}>{i18n(t('标识：%id'), { id: module })}</DetailTitle>
            <div className="space-y-3">
              <DetailInfoItem label={t('源语言')}>
                {all
                  .filter((item) => item.code === detail?.source)
                  .map((item) => item.name)
                  .join('') || ''}
              </DetailInfoItem>
              <DetailInfoItem label={t('项目成员')}>{count?.memberCount || '--'}</DetailInfoItem>
              <DetailInfoItem label={t('词条')}>{count?.wordCount || '--'}</DetailInfoItem>
              <DetailInfoItem label={t('创建时间')}>
                <ValueFormatter formatters={['time']} value={detail?.createTime} />
              </DetailInfoItem>
              <DetailInfoItem label={t('更新时间')}>
                <ValueFormatter formatters={['time']} value={detail?.updateTime} />
              </DetailInfoItem>
            </div>
            <Separator className="my-4" />
            <DetailTitle title={t('管理员')} />
            <div className="space-y-3">
              {members?.map((item) => (
                <MemberItem key={item.id} {...item} />
              ))}
            </div>
          </Card>
        </div>
      </Loading>
    </MainPage>
  )
}
