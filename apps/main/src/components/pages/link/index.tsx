'use client';

import { getSchema } from '@/config/pages/link/form'
import { getSupportWay } from '@/config/pages/login/quick'
import { linkCode, loginAndLink } from '@/rest/auth'
import { MFADialog } from '@clover/public/components/pages/login/mfa-dialog'
import { encrypt } from '@clover/public/utils/crypto'
import { setToken } from '@clover/public/utils/token'
import { Button, Form, FormItem, Image, Input, Result, Space, Spin, useMessage } from '@easykit/design'
import { Link1Icon } from '@radix-ui/react-icons'
import { cloneDeep, isUndefined } from 'es-toolkit'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { type PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface LinkPageProps extends PropsWithChildren {
  type: string
}

const LinkPage = (props: LinkPageProps) => {
  const { type } = props
  const { t } = useTranslation()
  const msg = useMessage()
  const params = useSearchParams()
  const code = params.get('code') as string
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [user, setUser] = useState(null as any)
  const [submitting, setSubmitting] = useState(false)
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [formData, setFormData] = useState<any>()
  const [visible, setVisible] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const { success, data } = await linkCode({
      code,
      type,
    })
    setError(!success)
    if (success) {
      if (data?.isBind) {
        setToken(data)
        location.href = '/'
      } else {
        setLoading(false)
        setUser(data)
      }
    } else {
      setLoading(false)
    }
  }, [code, type])

  useEffect(() => {
    load().then()
  }, [load])

  const onSubmit = useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    async (data: any, submitting?: boolean) => {
      const isSubmitting = isUndefined(submitting) ? true : submitting
      console.log('onSubmit isSubmitting', isSubmitting)
      if (isSubmitting) {
        setSubmitting(true)
      }
      const originData = cloneDeep(data)
      data.password = encrypt(data.password)
      const {
        success,
        message,
        data: result,
        code,
      } = await loginAndLink({
        ...data,
        token: user.token,
      })
      if (isSubmitting) {
        setSubmitting(false)
      }
      if (success) {
        setToken(result)
        location.href = '/'
      } else if (code === 10009) {
        // 需要二次验证
        setFormData(originData)
        setVisible(true)
      } else {
        msg.error(message)
      }
    },
    [msg, user?.token]
  )

  const onCancel = useCallback(() => {
    setVisible(false)
    setFormData(null)
  }, [])

  const buttons = (
    <Space>
      <Button onClick={() => load()} variant="secondary">
        {t('重试')}
      </Button>
      <Link href="/login">
        <Button>{t('返回登录')}</Button>
      </Link>
    </Space>
  )

  const icon = getSupportWay().find((item) => item.id === type)?.icon

  return loading ? (
    <div className="flex items-center justify-center">
      <Spin />
    </div>
  ) : (
    <>
      {error ? (
        <Result status="error" subTitle={t('第三方平台接口错误或链接已超时')} extra={buttons} />
      ) : (
        <div className="w-[360px]">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#2E3340]">{icon}</div>
            <Link1Icon />
            {user ? (
              <>
                <div className="overflow-hidden rounded-[50%]">
                  <Image
                    width={28}
                    height={28}
                    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                    src={(user as any).avatar}
                    alt={t('头像')}
                  />
                </div>
                <div className="ml-[5px]">
                  {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
                  {(user as any).username}
                </div>
              </>
            ) : null}
          </div>
          <div className="mt-[30px]">
            <Form schema={getSchema()} onSubmit={(data) => onSubmit(data)}>
              <FormItem name="account" label={t('邮箱或用户名')}>
                <Input placeholder={t('请输入邮箱或用户名')} />
              </FormItem>
              <FormItem name="password" label={t('密码')}>
                <Input type="password" placeholder={t('请输入密码')} />
              </FormItem>
              <Button loading={submitting} long type="submit">
                {t('登录并绑定')}
              </Button>
            </Form>
          </div>
        </div>
      )}
      <MFADialog visible={visible} onCancel={onCancel} formData={formData} onSubmit={onSubmit} isPending={false} />
    </>
  )
}

export default LinkPage
