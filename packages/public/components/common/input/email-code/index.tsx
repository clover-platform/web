import type { CancellablePromise, RestResult } from '@clover/public/types/rest'
import { isEmail } from '@clover/public/utils'
import { i18n } from '@clover/public/utils/locale.client'
import { Button, Input, useMessage } from '@easykit/design'
import {
  type ChangeEvent,
  type ComponentProps,
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

interface EmailCodeInputProps extends ComponentProps<typeof Input> {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  api: (params: any) => CancellablePromise<RestResult<any>>
  placeholder: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data?: any
  needEmail?: boolean
}

export const EmailCodeInput: FC<EmailCodeInputProps> = (props: EmailCodeInputProps) => {
  const { api, data, needEmail = false, onChange, ...rest } = props

  const Message = useMessage()
  const [loading, setLoading] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const [time, setTime] = useState(60)
  const timeRef = useRef(60)
  const timerRef = useRef(0)
  const { t } = useTranslation()

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current)
    }
  }, [])

  const startTimer = useCallback(() => {
    setWaiting(true)
    timerRef.current = window.setInterval(() => {
      const next = timeRef.current - 1
      if (next === 0) {
        clearInterval(timerRef.current)
        setWaiting(false)
        timeRef.current = 60
        setTime(60)
        return
      }
      timeRef.current = next
      setTime(next)
    }, 1000)
  }, [])

  const sendCode = useCallback(async () => {
    setLoading(true)
    const { success, message } = await api(data)
    setLoading(false)
    if (success) {
      startTimer()
    } else {
      Message.error(message)
    }
  }, [Message, api, data, startTimer])

  const buttonDisabled = useMemo(() => {
    if (!needEmail) return false
    const { email } = data || {}
    return !isEmail(email) || loading || waiting
  }, [needEmail, data, loading, waiting])

  const buttonText = useMemo(() => {
    return waiting ? i18n(t('%time秒后重发'), { time }) : t('发送验证码')
  }, [waiting, t, time])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value
    v = v ? v.replace(/\D/g, '') : v
    e.target.value = v
    onChange?.(e)
  }

  return (
    <div className="flex items-center justify-center">
      <Input className="flex-1" {...rest} onChange={handleChange} maxLength={6} />
      <Button loading={loading} disabled={buttonDisabled} className="ml-[10px]" onClick={sendCode} variant="secondary">
        {buttonText}
      </Button>
    </div>
  )
}
