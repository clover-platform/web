
import { isEmail } from '@clover/public/utils'
import { i18n } from '@clover/public/utils/locale.client'
import { Button, Input, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { type ChangeEvent, type ComponentProps, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export type BaseData = {
  email: string
}

interface EmailCodeInputProps<T extends BaseData> extends ComponentProps<typeof Input> {
  api: (params: T) => Promise<unknown>
  placeholder: string
  data: T
  needEmail?: boolean
}

export const EmailCodeInput = <T extends BaseData>(props: EmailCodeInputProps<T>) => {
  const { api, data, needEmail = false, onChange, ...rest } = props

  const Message = useMessage()
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

  const { mutate, isPending } = useMutation({
    mutationFn: api,
    onSuccess: () => {
      startTimer()
    },
    onError: (error) => {
      Message.error(error.message)
    },
  })

  const sendCode = useCallback(() => {
    mutate(data)
  }, [data, mutate])

  const buttonDisabled = useMemo(() => {
    if (!needEmail) return false
    const { email } = data as BaseData
    return !isEmail(email) || isPending || waiting
  }, [needEmail, data, isPending, waiting])

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
      <Button
        type="button"
        loading={isPending}
        disabled={buttonDisabled}
        className="ml-[10px]"
        onClick={sendCode}
        variant="secondary"
      >
        {buttonText}
      </Button>
    </div>
  )
}
