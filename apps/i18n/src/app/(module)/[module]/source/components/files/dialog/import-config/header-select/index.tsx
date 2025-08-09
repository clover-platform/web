import { type FC, useMemo } from 'react'
import { Select, type SelectOptionProps, type SelectProps } from '@easykit/design'
import { useTranslation } from 'react-i18next'
import { useModuleInfo } from '@/hooks/use.module.info'

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
        value: `target:${language.code}`,
      })),
    ]
  }, [t, baseInfo])

  const options = useMemo<SelectOptionProps[]>(() => {
    return baseOptions.map((option) => ({
      ...option,
      disabled: disabledKeys?.includes(option.value),
    }))
  }, [baseOptions, disabledKeys])

  return (
    <Select
      allowClear
      className="min-w-48 bg-background"
      placeholder={t('请选择')}
      {...rest}
      options={options}
      value={value || ''}
    />
  )
}
