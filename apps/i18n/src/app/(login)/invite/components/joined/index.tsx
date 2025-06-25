import { Button } from '@easykit/design'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

export type InvitePageJoinedProps = {
  module: string
}

export const InvitePageJoined: FC<InvitePageJoinedProps> = (props) => {
  const router = useRouter()
  const { module } = props
  const { t } = useTranslation()

  const detail = () => {
    router.push(`/${module}/dashboard`)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-6">
        <CheckCircledIcon className="h-12 w-12 text-primary" />
      </div>
      <div>
        <span className="text-muted-foreground">{t('你已经加入该项目')}</span>
        <Button onClick={detail} className="p-1" variant="link">
          {t('查看详情')}
        </Button>
      </div>
    </div>
  )
}
