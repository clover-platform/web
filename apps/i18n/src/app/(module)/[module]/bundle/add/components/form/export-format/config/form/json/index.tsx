import { Button, Checkbox, Form, FormItem, Space } from "@easykit/design";
import type { FC } from 'react'
import { useTranslation } from "react-i18next";
import { boolean, object } from 'zod'
export type JSONConfigFormProps = {
  onCancel?: () => void
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onConfirm?: (data: any) => void
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  defaultValues?: any
}

const SCHEMA = object({
  convert: boolean().optional(),
})


export const JSONConfigForm: FC<JSONConfigFormProps> = (props) => {
  const { onCancel, onConfirm, defaultValues } = props;
  const { t } = useTranslation();
  
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const onSubmit = (data: any) => {
      onConfirm?.(data)
    }

  return (
    <div className="space-y-4">
      <Form schema={SCHEMA} onSubmit={onSubmit} defaultValues={defaultValues}>
        <FormItem name="convert" label="">
          <Checkbox field={true} label={t('以 . 作为分隔符转换为对象')} />
        </FormItem>
        <Space className="justify-end">
          <Button type="submit">{t('确定')}</Button>
          <Button variant="outline" type="button" onClick={() => onCancel?.()}>
            {t('取消')}
          </Button>
        </Space>
      </Form>
    </div>
  )
}
