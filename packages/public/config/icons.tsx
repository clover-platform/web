import type { ReactNode } from 'react'
import { IconDashboard, IconHome, IconI18n, IconQA, IconWiki } from '@arco-iconbox/react-clover'

export const ICONS: Record<string, ReactNode> = {
  www: <IconHome />,
  main: <IconDashboard />,
  wiki: <IconWiki />,
  i18n: <IconI18n />,
  qa: <IconQA />,
}
