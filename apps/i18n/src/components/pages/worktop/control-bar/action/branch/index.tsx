import { branchesState, currentBranchState } from '@/state/worktop'
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
  const [branches] = useAtom(branchesState)
  const [current] = useAtom(currentBranchState)
  const branch = branches.find((item) => item.name === current)

  return (
    <Action className="!px-1.5 h-8" onClick={props.onClick}>
      <IconBranch className="mr-1" /> {branch ? branch.name : t('所有分支')}
    </Action>
  )
}
