import { ARBConfigForm } from "@/components/pages/bundle/form/export-format/config/form/arb";
import { JSONConfigForm } from "@/components/pages/bundle/form/export-format/config/form/json";
import { IconAndroid, IconFlutter, IconIOS, IconJSON } from '@arco-iconbox/react-clover'
import { t } from "@clover/public/utils/locale.client";
import type { ReactElement, ReactNode } from 'react'

export type ExportFormatConfig = {
  id: string
  name: string
  icon: ReactNode
  configComponent?: ReactElement
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  configDefault?: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  config?: any
} 

export const getSupportedFormats = (): ExportFormatConfig[] => [
  {
    id: 'android',
    name: t('安卓资源文件'),
    icon: <IconAndroid className="h-8 w-8" />,
  },
  {
    id: 'ios',
    name: t('iOS 资源文件'),
    icon: <IconIOS className="h-8 w-8" />,
  },
  {
    id: 'flutter',
    name: t('Flutter .ARB 文件'),
    icon: <IconFlutter className="h-8 w-8" />,
    configComponent: <ARBConfigForm />,
    configDefault: {
      convert: false,
    },
  },
  {
    id: 'json',
    name: t('JSON 文件'),
    icon: <IconJSON className="h-8 w-8" />,
    configComponent: <JSONConfigForm />,
    configDefault: {
      convert: false,
    },
  },
]
