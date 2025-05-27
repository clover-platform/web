'use client';

import type { ModuleLayoutProps } from '@/components/layout/module'
import { BundleForm } from '@/components/pages/bundle/form'
import { useModule } from '@/hooks/use.module'
import { type AddBundleData, create } from '@/rest/bundle'
import BackButton from '@clover/public/components/common/button/back'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { Button, Space, useMessage } from '@easykit/design'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const AddBundlePage = () => {
  const m = useModule()
  useLayoutConfig<ModuleLayoutProps>({
    active: 'download',
  })
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const msg = useMessage()
  const router = useRouter()

  const onSubmit = async (data: AddBundleData) => {
    setLoading(true)
    data.module = m
    const { success, message } = await create(data)
    setLoading(false)
    if (success) {
      router.push(`/i18n/${m}/bundle`)
    } else {
      msg.error(message)
    }
  }

  return (
    <>
      <TitleBar title={t('添加文件')} />
      <BundleForm onSubmit={onSubmit}>
        <Space>
          <Button loading={loading} type="submit">
            {t('提交')}
          </Button>
          <BackButton />
        </Space>
      </BundleForm>
    </>
  )
}
