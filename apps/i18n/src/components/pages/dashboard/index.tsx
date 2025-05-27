'use client';

import type { ModuleLayoutProps } from '@/components/layout/module'
import { DetailInfoItem } from '@/components/pages/dashboard/detail/info-item'
import { DetailTitle } from '@/components/pages/dashboard/detail/title'
import { LanguageItem } from '@/components/pages/dashboard/language-item'
import { MemberItem } from '@/components/pages/dashboard/member-item'
import { languagesState } from '@/state/public'
import type { Member, ModuleCount, ModuleDetail } from '@/types/pages/module'
import type { Language, LanguageWithCount } from '@/types/pages/public'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { i18n } from '@clover/public/utils/locale.client'
import {
  Button,
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
import { useAtom } from 'jotai'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
export type DashboardPageProps = {
  detail: ModuleDetail
  languages: LanguageWithCount[]
  members: Member[]
  count: ModuleCount
}

export const DashboardPage: FC<DashboardPageProps> = (props) => {
  useLayoutConfig<ModuleLayoutProps>({
    active: 'dashboard',
  })
  const { detail, members, languages, count } = props
  const { module } = useParams()
  const router = useRouter()
  const [all] = useAtom(languagesState)
  const { t } = useTranslation()

  const onRowClick = (item: Language) => {
    router.push(`/i18n/${module}/worktop?target=${item.code}`)
  }

  const actions = (
    <Space>
      <Link href={`/i18n/${module}/worktop`}>
        <Button>{t('工作台')}</Button>
      </Link>
    </Space>
  )

  return (
    <>
      <TitleBar title={t('概览')} actions={actions} border={false} />
      <Loading>
        <div className="flex items-start justify-start">
          <div className="mr-4 w-0 flex-1 flex-shrink-0">
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
                  {languages.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Empty />
                      </TableCell>
                    </TableRow>
                  )}
                  {languages.map((item) => (
                    <LanguageItem onClick={() => onRowClick(item)} key={item.id} {...item} />
                  ))}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <div className="w-96 rounded-md bg-muted p-4">
            <DetailTitle title={t('详情')}>{i18n(t('标识：%id'), { id: module })}</DetailTitle>
            <div className="space-y-3">
              <DetailInfoItem label={t('源语言')}>
                {all
                  .filter((item) => item.code === detail.source)
                  .map((item) => item.name)
                  .join('') || ''}
              </DetailInfoItem>
              <DetailInfoItem label={t('项目成员')}>{count?.memberCount || '--'}</DetailInfoItem>
              <DetailInfoItem label={t('词条')}>{count?.wordCount || '--'}</DetailInfoItem>
              <DetailInfoItem label={t('创建时间')}>
                <ValueFormatter value={detail.createTime} formatters={['time']} />
              </DetailInfoItem>
              <DetailInfoItem label={t('更新时间')}>
                <ValueFormatter value={detail.updateTime} formatters={['time']} />
              </DetailInfoItem>
            </div>
            <Separator className="my-4" />
            <DetailTitle title={t('管理员')} />
            <div className="space-y-3">
              {members.map((item) => (
                <MemberItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </Loading>
    </>
  )
}
