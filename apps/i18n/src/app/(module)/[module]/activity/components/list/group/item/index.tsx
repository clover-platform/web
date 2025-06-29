import type { Activity } from '@/types/module/activity'
import { IconAdd, IconDelete } from '@arco-iconbox/react-clover'
import { i18n, t } from '@clover/public/utils/locale.client'
import { Avatar } from '@easykit/design'
import { CheckIcon, Cross2Icon, Pencil1Icon } from '@radix-ui/react-icons'
import dayjs from 'dayjs'
import { type FC, type ReactNode, useMemo } from 'react'

const ICONS: Record<number, ReactNode> = {
  1: <IconAdd />,
  2: <Pencil1Icon />,
  3: <IconDelete />,
  4: <CheckIcon />,
  5: <Cross2Icon />,
}

const LABELS: Record<number, string> = {
  1: t('新增了'),
  2: t('更新了'),
  3: t('删除了'),
  4: t('通过了'),
  5: t('拒绝了'),
}

const TYPES: Record<number, string> = {
  1: t('模块'),
  2: t('分支'),
  3: t('下载'),
  4: t('成员'),
  5: t('设置'),
  6: t('词条'),
}

const TYPE6_SUB_TYPES: Record<number, string> = {
  1: t('词条'),
  2: t('翻译'),
  3: t('评论'),
}

export type ActivityListGroupItemProps = {
  item: Activity
}

export const ActivityListGroupItem: FC<ActivityListGroupItemProps> = (props) => {
  const { item } = props
  const { operate, type, subType, detail } = item

  const typeText = useMemo(() => {
    if (type === 6 && subType) {
      return i18n(t('词条的%type'), { type: TYPE6_SUB_TYPES[subType] })
    }
    return TYPES[type]
  }, [type, subType])

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
  const content = useMemo(() => {
    if (type === 1) return detail?.name
    if (type === 2) return detail?.name
    if (type === 3) return detail?.name
    if (type === 4) return detail?.name
    if (type === 5) return detail?.name
    if (type === 6) {
      if (subType === 1) return detail?.value
      if (subType === 2) return detail?.content
      if (subType === 3) return detail?.content
      return '--'
    }
    return '--'
  }, [detail, type, subType])

  return (
    <div className="flex items-start justify-center">
      <div className="relative">
        <Avatar className="h-10 w-10" src="" fallback="S" />
        <div className="-right-2 absolute bottom-0 flex h-6 w-6 items-center justify-center rounded-full border bg-white dark:bg-zinc-800">
          {ICONS[operate]}
        </div>
      </div>
      <div className="mx-4 flex min-h-10 flex-1 items-center justify-start">
        {i18n(t('%operate%type：%content'), {
          operate: LABELS[operate],
          type: typeText,
          content: content || '--',
        })}
      </div>
      <div className="flex min-h-10 items-center justify-start text-muted-foreground">
        {dayjs(item.createTime).format('HH:mm')}
      </div>
    </div>
  )
}
