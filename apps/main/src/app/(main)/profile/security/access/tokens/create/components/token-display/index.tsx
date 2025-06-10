import { Action } from '@clover/public/components/common/action'
import { Alert, useMessage } from '@easykit/design'
import { CheckCircledIcon, CopyIcon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { type FC, useCallback, useMemo, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTranslation } from 'react-i18next'

export type TokenDisplayProps = {
  token: string
}

export const TokenDisplay: FC<TokenDisplayProps> = (props) => {
  const { token } = props
  const [visible, setVisible] = useState(false)
  const msg = useMessage()
  const { t } = useTranslation()

  const content = useMemo(() => {
    if (visible) return token
    return token.replace(/./g, '*')
  }, [token, visible])

  const toggle = useCallback(() => {
    setVisible(!visible)
  }, [visible])

  return (
    <Alert title={t('您的新个人访问令牌')} icon={<CheckCircledIcon />} className="bg-success">
      <div className="flex items-center justify-center rounded-sm border bg-white">
        <div className="flex-1 px-2">{content}</div>
        <Action onClick={toggle} className="rounded-none">
          {visible ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </Action>
        <CopyToClipboard
          text={token}
          onCopy={() => {
            msg.success(t('已复制到剪贴板'))
          }}
        >
          <Action className="rounded-none rounded-r">
            <CopyIcon />
          </Action>
        </CopyToClipboard>
      </div>
      <div className="text-secondary-foreground/50">{t('请确保妥善保存它，您无法再次访问它的内容。')}</div>
    </Alert>
  )
}
