import { useEntriesUpdater } from '@/components/layout/worktop/hooks'
import { remove as removeRest } from '@/rest/entry'
import { currentEntryState, entriesState, filesState } from '@/state/worktop'
import { Action } from '@clover/public/components/common/action'
import { t } from '@clover/public/utils/locale.client'
import { Badge, Dropdown, type DropdownMenuItemProps, Tooltip, useAlert, useMessage } from '@easykit/design'
import { ArrowLeftIcon, ArrowRightIcon, CopyIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import copy from 'copy-to-clipboard'
import { useAtom } from 'jotai'
import { useParams } from 'next/navigation'
import type { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { EditEntryButton } from '../../entry/edit/button'

type IconMenuItemProps = {
  icon?: ReactNode
  label: string
}

export const IconMenuItem: FC<IconMenuItemProps> = (props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="mr-2 flex h-4 w-4 items-center justify-center">{props.icon}</div>
      <div className="flex-1">{props.label}</div>
    </div>
  )
}

const menus: DropdownMenuItemProps[] = [
  {
    type: 'item',
    id: 'copy.key',
    label: <IconMenuItem icon={<CopyIcon className="text-lg" />} label={t('复制键值')} />,
  },
  {
    type: 'item',
    id: 'copy.value',
    label: <IconMenuItem icon={<CopyIcon className="text-lg" />} label={t('复制内容')} />,
  },
  {
    type: 'separator',
    id: 'separator.1',
  },
  {
    type: 'item',
    id: 'remove',
    label: <IconMenuItem label={t('删除')} />,
  },
]

export const Detail = () => {
  const [entries] = useAtom(entriesState)
  const [current, setCurrent] = useAtom(currentEntryState)
  const entry = entries[current]
  const { update, remove } = useEntriesUpdater()
  const [files] = useAtom(filesState)
  const file = files.find((b) => b.id === entry?.fileId)
  const msg = useMessage()
  const alert = useAlert()
  const { module } = useParams()
  const { t } = useTranslation()

  const prev = () => {
    if (current === entries.length - 1) {
      setCurrent(current - 1)
    }
  }

  const onItemClick = ({ id }: DropdownMenuItemProps) => {
    if (id === 'copy.key') {
      copy(entry.identifier)
      msg.success(t('复制成功'))
    } else if (id === 'copy.value') {
      copy(entry.value)
      msg.success(t('复制成功'))
    } else if (id === 'remove') {
      alert.confirm({
        title: t('删除'),
        description: t('是否删除该词条'),
        onOk: async () => {
          const { success, message } = await removeRest({
            module: module as string,
            id: entry.id,
            branch: file?.name || '',
          })
          if (success) {
            prev()
            await remove(entry.id)
          } else {
            msg.error(message)
          }
          return success
        },
      })
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-center p-2 px-4">
        <div className="flex-1 font-medium text-base">{t('原始内容')}</div>
        <div className="flex">
          <Tooltip content={t('上一个')}>
            <Action disabled={current === 0} onClick={() => setCurrent(current - 1)}>
              <ArrowLeftIcon />
            </Action>
          </Tooltip>
          <Tooltip content={t('下一个')}>
            <Action disabled={current === entries.length - 1} onClick={() => setCurrent(current + 1)}>
              <ArrowRightIcon />
            </Action>
          </Tooltip>
          <EditEntryButton
            onSuccess={async () => {
              await update(entry.id)
            }}
            entry={entry}
          />
          <Dropdown items={menus} onItemClick={onItemClick} asChild={true} align="end">
            <Action>
              <DotsHorizontalIcon />
            </Action>
          </Dropdown>
        </div>
      </div>
      <div className="mb-4 px-4">{entry?.value}</div>
      <div className="mb-4 px-4">
        <Badge className="mr-2">{file?.name}</Badge>
        <span className="text-muted-foreground">{entry?.identifier}</span>
      </div>
    </div>
  )
}
