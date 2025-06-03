
import { useProfile } from '@clover/public/hooks'
import { Action, Alert, Card } from '@easykit/design'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EditCard } from './edit-card'

export type ReadMeProps = {
  readme?: string
  id: number
}

export const ReadMe: FC<ReadMeProps> = (props) => {
  const { readme, id } = props
  const { t } = useTranslation()
  const profile = useProfile()
  const isOwner = profile.id === id
  const [isEdit, setIsEdit] = useState(false)

  const readmeTitle = (
    <div className="flex items-center justify-between">
      <div>{t('关于我')}</div>
      <div>
        {isOwner ? (
          <Action>
            <Pencil2Icon />
          </Action>
        ) : null}
      </div>
    </div>
  )

  const handleEdit = () => {
    setIsEdit(true)
  }

  return isEdit ? (
    <EditCard readme={readme} id={id} onCancel={() => setIsEdit(false)} />
  ) : readme ? (
    <Card title={readmeTitle}>{readme}</Card>
  ) : isOwner ? (
    <Alert>
      <div>
        <span>{t('你可以编辑一份说明文案，让更多人了解你')}</span>
        <span className="ml-2 cursor-pointer text-primary" onClick={handleEdit}>
          {t('编辑')}
        </span>
      </div>
    </Alert>
  ) : null
}

