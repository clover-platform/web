import { Button, Card } from '@easykit/design'
import '@easykit/editor/style.css'
import { useProfile } from '@clover/public/hooks'
import { Editor } from '@easykit/editor'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

export type EditCardProps = {
  readme?: string
  id: number
  onCancel: () => void
}

export const EditCard: FC<EditCardProps> = (props) => {
  const { readme, id, onCancel } = props
  const { t } = useTranslation()
  const [value, setValue] = useState(readme)
  const profile = useProfile()
  const isOwner = profile.id === id

  const handleSave = () => {
    console.log(value)
  }

  const editTitle = (
    <div className="flex items-center justify-between">
      <div>{t('关于我')}</div>
      <div className="flex items-center gap-2">
        {isOwner ? (
          <>
            <Button size="sm" onClick={handleSave}>
              {t('保存')}
            </Button>
            <Button size="sm" variant="outline" onClick={onCancel}>
              {t('取消')}
            </Button>
          </>
        ) : null}
      </div>
    </div>
  )

  return (
    <Card title={editTitle}>
      <div className="ml-[60px]">
        <Editor value={value} onChange={setValue} />
      </div>
    </Card>
  )
}