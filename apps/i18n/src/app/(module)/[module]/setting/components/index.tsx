'use client'
import type { ModuleLayoutProps } from '@/components/layout/module'
import { getInfoSchema } from '@/config/schema/module'
import { useModule } from '@/hooks/use.module'
import { detail, update } from '@/rest/module'
import type { BaseInfo, UpdateInfo } from '@/types/module'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { Button, Form, FormItem, Input, Loading, Separator, Textarea, useMessage } from '@easykit/design'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SettingBasePage } from './common/base-page'
import { ModuleRemove } from './remove'

export const ModuleSettingPage = () => {
  const m = useModule()
  useLayoutConfig<ModuleLayoutProps>({
    active: 'setting',
  })
  const msg = useMessage()
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState<BaseInfo>()
  const [values, setValues] = useState<BaseInfo>()
  const [formKey, setFormKey] = useState(Date.now())
  const [submitting, setSubmitting] = useState(false)
  const { t } = useTranslation()

  const load = useCallback(async () => {
    setLoading(true)
    const data = await detail(m)
    // if (success) {
    setInfo(data!)
    setValues(data!)
    setFormKey(Date.now())
    // }
    setLoading(false)
  }, [m])

  useEffect(() => {
    load().then()
  }, [load])

  const changed = useMemo(() => {
    return JSON.stringify(info) !== JSON.stringify(values)
  }, [info, values])

  const onSubmit = async (data: UpdateInfo) => {
    data.module = m
    setSubmitting(true)
    const { success, message } = await update(data)
    setSubmitting(false)
    if (success) {
      load().then()
    } else {
      msg.error(message)
    }
  }

  const title = t('常规设置')

  return (
    <SettingBasePage title={title} active="general">
      <Loading loading={loading} className="space-y-4">
        <div className="font-medium text-lg">{t('基本信息')}</div>
        <Form
          key={formKey}
          schema={getInfoSchema()}
          onSubmit={onSubmit}
          defaultValues={info}
          onValuesChange={(vs) => setValues(vs)}
        >
          <FormItem name="name" label={t('名称')} description={t('唯一标识只能是小写字母和-，小写字母开头')}>
            <Input placeholder={t('请输入模块名称')} className="max-w-96" />
          </FormItem>
          <FormItem name="description" label={t('描述')}>
            <Textarea placeholder={t('请输入模块描述')} />
          </FormItem>
          <div>
            <Button loading={submitting} disabled={!changed} variant="default">
              {t('保存')}
            </Button>
          </div>
        </Form>
        <Separator className="!my-6" />
        <ModuleRemove />
      </Loading>
    </SettingBasePage>
  )
}
