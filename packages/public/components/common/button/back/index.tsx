import type { FC, PropsWithChildren } from 'react'
import { Button } from '@easykit/design'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
export interface BackButtonProps extends PropsWithChildren {
  text?: string
}

const BackButton: FC<BackButtonProps> = (props) => {
  const { t } = useTranslation()
  const { text = t('返回') } = props

  const router = useRouter()
  return (
    <Button {...props} onClick={() => router.back()} type="button" variant="outline">
      {text}
    </Button>
  )
}

export default BackButton
