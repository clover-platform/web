'use client'

import { type LinkFormData, getSchema } from '@/config/schema/login/link'
import { type LinkCodeResult, linkCode, loginAndLink } from '@/rest/login/link'
import { MFADialog } from '@clover/public/components/pages/login/mfa-dialog'
import { encrypt } from '@clover/public/utils/crypto'
import { RestError } from '@clover/public/utils/rest'
import { type Token, setToken } from '@clover/public/utils/token'
import { Button, Form, FormItem, Image, Input, Result, Space, Spin, useMessage } from '@easykit/design'
import { Link1Icon } from '@radix-ui/react-icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { cloneDeep, isUndefined } from 'es-toolkit'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { type PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getSupportWay } from '../../login/components/config'

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
    [mutate, user]
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
            <Form<LinkFormData> schema={getSchema()} onSubmit={(data) => onSubmit(data)}>
              <FormItem name="account" label={t('邮箱或用户名')}>
                <Input placeholder={t('请输入邮箱或用户名')} />
              </FormItem>
              <FormItem name="password" label={t('密码')}>
                <Input type="password" placeholder={t('请输入密码')} />
              </FormItem>
              <Button loading={submitting && showLoading} long type="submit">
                {t('登录并绑定')}
              </Button>
            </Form>
          </div>
        </div>
      )}
      <MFADialog<LinkFormData>
        visible={visible}
        onCancel={onCancel}
        formData={formData}
        onSubmit={onSubmit}
        isPending={submitting}
      />
    </>
  )
}

export default LinkPage
