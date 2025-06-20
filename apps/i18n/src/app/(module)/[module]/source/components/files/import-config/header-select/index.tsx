import { useModuleInfo } from '@/hooks/use.module.info'
import { Select, type SelectOptionProps, type SelectProps } from '@easykit/design'
import { type FC, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export type HeaderSelectProps = Omit<SelectProps, 'options'> & {
  disabledKeys?: string[]
}

export const HeaderSelect: FC<HeaderSelectProps> = (props) => {
  const { disabledKeys, value, ...rest } = props
  const { t } = useTranslation()
  const [baseInfo] = useModuleInfo()

  const baseOptions = useMemo<SelectOptionProps[]>(() => {
    const { languages = [] } = baseInfo || {}
    return [
      {
        label: t('标识'),
        value: 'identifier',
      },
      {
        label: t('原文'),
        value: 'value',
      },
      {
        label: t('上下文'),
        value: 'context',
      },
      ...languages.map((language) => ({
        label: t('翻译：{{language}}', { language: language.name }),
        value: language.code,
      })),
    ]
  }, [t, baseInfo])

  const options = useMemo<SelectOptionProps[]>(() => {
    return baseOptions.map((option) => ({
      ...option,
      disabled: disabledKeys?.includes(option.value),
    }))
  }, [baseOptions, disabledKeys])

  useEffect(() => {
    console.log('value change', props.value)
  }, [props.value])

  return (
    <Select allowClear className="min-w-48" placeholder={t('请选择')} {...rest} options={options} value={value || ''} />
  )
}