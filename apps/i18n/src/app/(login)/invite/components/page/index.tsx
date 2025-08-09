import { type FC, useState } from 'react'
import { Button, useMessage } from '@easykit/design'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { MemberRole } from '@/app/(module)/[module]/member/components/role'
import { LanguageIcon } from '@/components/common/language-icon'
import { accept } from '@/rest/member.invite'
import type { InviteDetail } from '@/types/module'
export type InvitePageBodyProps = {
  loading: boolean
  isLogin: boolean
  detail?: InviteDetail
}

export const InvitePageBody: FC<InvitePageBodyProps> = (props) => {
  const { isLogin, detail } = props
  const search = useSearchParams()
  const token = search.get('t')
  const [submitting, setSubmitting] = useState(false)
  const msg = useMessage()
  const router = useRouter()
  const { t } = useTranslation()

  const login = () => {
    location.href = `/login/?from=${encodeURIComponent(location.href)}`
  }

  const register = () => {
    location.href = `/register/?from=${encodeURIComponent(location.href)}`
  }

  const acceptInvite = async () => {
    setSubmitting(true)
    const { success, message, data } = await accept({ token: token! })
    setSubmitting(false)
    if (success) {
      router.push(`/${data}/dashboard`)
    } else {
      msg.error(message)
    }
  }

  return (
    <div className="mt-8 w-[360px] space-y-4">
      <div className="text-base">{t('邀请你加入翻译项目')}</div>
      <div className="space-y-2">
        <div className="space-x-2 text-muted-foreground">
          <span>作为</span>
          {detail?.roles?.map((role) => (
            <MemberRole key={role} value={Number(role)} />
          ))}
          <span>加入</span>
        </div>
        <div className="flex items-start justify-center rounded-md border p-3 shadow">
          <div className="mr-2">
            <LanguageIcon className="!w-12 !h-10" code={detail?.source || ''} />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-base">{detail?.name}</div>
            <div className="text-muted-foreground">{t('目标语言')}</div>
            <div className="space-y-1 rounded-md bg-muted p-2">
              {detail?.targets.map((target, index) => {
                const items = [
                  <div className="flex items-center justify-center" key={`${target.id}-item`}>
                    <div className="mr-2">
                      <LanguageIcon className="h-6 w-8 shadow" code={target.code} />
                    </div>
                    <div className="flex-1 text-md text-muted-foreground">{target.name}</div>
                  </div>,
                ]
                if (index < detail.targets.length - 1) {
                  items.push(<div className="-mx-2 h-0.5 bg-white dark:bg-black" key={`${target.id}-border`} />)
                }
                return items
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="!mt-8 flex space-x-2">
        {isLogin ? (
          <Button className="w-full" loading={submitting} onClick={acceptInvite}>
            {t('加入')}
          </Button>
        ) : (
          <>
            <Button className="flex-1" onClick={login}>
              {t('登录')}
            </Button>
            <Button className="flex-1" onClick={register} variant="outline">
              {t('注册')}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
