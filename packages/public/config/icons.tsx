import { IconDashboard, IconHome, IconI18n, IconQA, IconWiki } from '@arco-iconbox/react-clover'
import type { ReactNode } from 'react'

export const ICONS: Record<string, ReactNode> = {
  home: <IconHome />,
  dashboard: <IconDashboard />,
  wiki: <IconWiki />,
  i18n: <IconI18n />,
  qa: <IconQA />,
}
