import { currentFileState, filesState } from '@/state/worktop'
import { IconBranch } from '@arco-iconbox/react-clover'
import { Action } from '@clover/public/components/common/action'
import { useAtom } from 'jotai'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

export type BranchActionProps = {
  onClick: () => void
}

export const BranchAction: FC<BranchActionProps> = (props) => {
  const { t } = useTranslation()
  const [files] = useAtom(filesState)
  const [current] = useAtom(currentFileState)
  const file = files.find((item) => item.name === current)

  return (
    <Action className="!px-1.5 h-8" onClick={props.onClick}>
      <IconBranch className="mr-1" /> {file ? file.name : t('所有文件')}
    </Action>
  )
}
