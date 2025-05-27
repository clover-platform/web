import type { TabsTitleItem } from '@clover/public/components/common/tabs-title'
import { t } from "@clover/public/utils/locale.client";

export const getTabs = (): TabsTitleItem[] => [
  {
    id: 'all',
    title: t('全部'),
  },
  {
    id: 'manager',
    title: t('管理员'),
  },
  {
    id: 'translator',
    title: t('翻译员'),
  },
  {
    id: 'proofreader',
    title: t('校对员'),
  },
]
