'use client'

import { getSupportWay } from '../../login/components/config'

import { type PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { Button, Form, FormItem, Image, Input, Result, Space, Spin, useMessage } from '@easykit/design'
import { Link1Icon } from '@radix-ui/react-icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { cloneDeep, isUndefined } from 'es-toolkit'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { MFADialog } from '@clover/public/components/pages/login/mfa-dialog'
import { useEncrypt } from '@clover/public/hooks'
import { RestError } from '@clover/public/utils/rest'
import { setToken, type Token } from '@clover/public/utils/token'
import { getSchema, type LinkFormData } from '@/config/schema/login/link'
import { type LinkCodeResult, linkCode, loginAndLink } from '@/rest/login/link'

export interface LinkPageProps extends PropsWithChildren {
  type: string
}

const LinkPage = (props: LinkPageProps) => {
  const { type } = props
  const { t } = useTranslation()
  const msg = useMessage()
  const params = useSearchParams()
  const code = params.get('code') as string
  const [user, setUser] = useState<LinkCodeResult>()
  const [showLoading, setShowLoading] = useState(false)
  const [formData, setFormData] = useState<LinkFormData | null>(null)
  const [visible, setVisible] = useState(false)
  const queryClient = useQueryClient()
  const encrypt = useEncrypt()
  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ['link', code, type],
    retry: false,
    queryFn: ({ queryKey }) =>
      linkCode({
        code: queryKey[1],
        type: queryKey[2],
      }),
  })

  const reload = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['link', code, type] })
  }, [code, type, queryClient])

  useEffect(() => {
    if (isFetched) {
      if (data?.isBind) {
        setToken(data as Token)
        location.href = '/'
      } else {
        setUser(data)
      }
    }
  }, [isFetched, data])

  const { mutate, isPending: submitting } = useMutation({
    mutationFn: loginAndLink,
    onSuccess: (data) => {
      setShowLoading(false)
      if (data) {
        setToken(data)
        location.href = '/'
      }
    },
    onError: (error) => {
      setShowLoading(false)
      if (error instanceof RestError) {
        const { code, message } = error
        if (code === 10009) {
          setVisible(true)
        } else {
          msg.error(message)
        }
      } else {
        msg.error(error.message)
      }
    },
  })

  const onSubmit = useCallback(
    (data: LinkFormData, submitting?: boolean) => {
      setShowLoading(isUndefined(submitting) ? true : submitting)
      setFormData(data)
      const originData = cloneDeep(data)
      originData.password = encrypt(originData.password)
      mutate({
        ...originData,
        token: user?.token!,
      })
    },
    [mutate, user, encrypt]
  )

  const onCancel = useCallback(() => {
    setVisible(false)
    setFormData(null)
  }, [])

  const buttons = (
    <Space>
      <Button onClick={reload} variant="secondary">
        {t('重试')}
      </Button>
      <Link href="/login">
        <Button>{t('返回登录')}</Button>
      </Link>
    </Space>
  )

  const icon = getSupportWay().find((item) => item.id === type)?.icon

  return isLoading ? (
    <div className="flex items-center justify-center">
      <Spin />
    </div>
  ) : (
    <>
      {isError ? (
        <Result extra={buttons} status="error" subTitle={t('第三方平台接口错误或链接已超时')} />
      ) : (
        <div className="w-[360px]">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#2E3340]">{icon}</div>
            <Link1Icon />
            {user ? (
              <>
                <div className="overflow-hidden rounded-[50%]">
                  <Image
                    alt={t('头像')}
                    height={28}
                    // biome-ignore lint/suspicious/noExplicitAny: avatar
                    src={(user as any).avatar}
                    width={28}
                  />
                </div>
                <div className="ml-[5px]">
                  {/* biome-ignore lint/suspicious/noExplicitAny: username */}
                  {(user as any).username}
                </div>
              </>
            ) : null}
          </div>
          <div className="mt-[30px]">
            <Form<LinkFormData> onSubmit={(data) => onSubmit(data)} schema={getSchema()}>
              <FormItem label={t('邮箱或用户名')} name="account">
                <Input placeholder={t('请输入邮箱或用户名')} />
              </FormItem>
              <FormItem label={t('密码')} name="password">
                <Input placeholder={t('请输入密码')} type="password" />
              </FormItem>
              <Button loading={submitting && showLoading} long type="submit">
                {t('登录并绑定')}
              </Button>
            </Form>
          </div>
        </div>
      )}
      <MFADialog<LinkFormData>
        formData={formData}
        isPending={submitting}
        onCancel={onCancel}
        onSubmit={onSubmit}
        visible={visible}
      />
    </>
  )
}

export default LinkPage
