import { t } from '@clover/public/utils/locale.client'
import type { SimpleRadioGroupOptionProps } from '@easykit/design'
import { object, string } from 'zod'

const NAME_REGEX = /^[a-z0-9][0-9a-z.-]*$/

export const getSchema = () =>
  object({
    type: string().min(1, t('请选择创建方式')),
    name: string().min(1, t('名称不能为空')).max(255, t('最多 255 个字符')),
  }).superRefine(({ name }, ctx) => {
    if (!NAME_REGEX.test(name)) {
      ctx.addIssue({
        code: 'custom',
        path: ['name'],
        message: t('名称只能是小写字母、符号：. -，小写字母开头'),
      })
    }
  })

export const getTypeOptions = (): SimpleRadioGroupOptionProps[] => [
  {
    label: t('从主分支克隆'),
    value: 'clone',
  },
  {
    label: t('空分支'),
    value: 'empty',
  },
]
