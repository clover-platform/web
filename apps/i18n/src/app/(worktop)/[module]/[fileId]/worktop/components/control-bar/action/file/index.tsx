import type { FC } from 'react'
import { IconBranch } from '@arco-iconbox/react-clover'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { Action } from '@clover/public/components/common/action'
import { currentFileState, filesState } from '@/state/worktop'

export type FileActionProps = {
  onClick: () => void
}

export const FileAction: FC<FileActionProps> = (props) => {
  const { t } = useTranslation()
  const [files] = useAtom(filesState)
  const [current] = useAtom(currentFileState)
  const file = files.find((item) => item.id === Number(current))

  return (
    <Action className="!px-1.5 h-8" onClick={props.onClick}>
      <IconBranch className="mr-1" /> {file ? file.name : t('所有文件')}
    </Action>
  )
}
