
import { Action, Card } from '@easykit/design'
import { Pencil2Icon } from '@radix-ui/react-icons'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

export type ReadMeProps = {
  readme?: string
}

export const ReadMe: FC<ReadMeProps> = (props) => {
  const { readme } = props
  const { t } = useTranslation()

  const readmeTitle = (
    <div>
      <div>{t('关于我')}</div>
      <div>
        <Action>
          <Pencil2Icon />
        </Action>
      </div>
    </div>
  )

  return <Card title={readmeTitle}>{readme ?? t('暂无自我介绍')}</Card>
}

