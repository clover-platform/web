import type { TabsTitleItem } from '@clover/public/components/common/tabs-title'
import { t } from "@clover/public/utils/locale.client";

export const getTabs = (): TabsTitleItem[] => [
  {
    id: 'general',
    title: t('常规'),
  },
  {
    id: 'languages',
    title: t('语言'),
  },
  {
    id: 'ai',
    title: t('AI辅助'),
  },
  {
    id: 'api',
    title: t('API'),
  },
]
