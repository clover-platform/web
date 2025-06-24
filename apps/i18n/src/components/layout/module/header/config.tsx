import { t } from '@clover/public/utils/locale.client'

export const getNavs = () => {
  return [
    {
      id: 'dashboard',
      title: t('概览'),
      href: 'dashboard',
    },
    {
      id: 'source',
      title: t('原文'),
      href: 'source',
    },
    {
      id: 'translation',
      title: t('翻译'),
      href: 'translation',
    },
    {
      id: 'member',
      title: t('成员'),
      href: 'member',
    },
    {
      id: 'activity',
      title: t('动态'),
      href: 'activity',
    },
    {
      id: 'setting',
      title: t('设置'),
      href: 'setting',
    },
  ]
}