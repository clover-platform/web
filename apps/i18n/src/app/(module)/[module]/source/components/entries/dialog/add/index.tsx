import { FilesSelectFilter } from '../../select/files/filter'
import { type AddEntryFormData, useSchema } from './schema'

import { type FC, useRef } from 'react'
import { Alert, Button, Dialog, type DialogProps, Form, FormItem } from '@easykit/design'
import { useTranslation } from 'react-i18next'

export type AddEntryDialogProps = DialogProps

export const AddEntryDialog: FC<AddEntryDialogProps> = (props) => {
  const { t } = useTranslation()
  const schema = useSchema()
  const formRef = useRef<UseFormReturn<AddEntryFormData>>(null)

  const handleSubmit = () => {
    formRef.current?.submit()
  }

  return (
    <Dialog
      {...props}
      className="w-10/12 sm:max-w-7xl"
      footer={<Button onClick={() => {}}>{t('添加')}</Button>}
      maskClosable={false}
      title={t('添加词条')}
    >
      <div className="flex flex-col gap-4">
        <Alert className="bg-secondary">{t('即使只添加一个词条，也会生成一个变更版本。')}</Alert>
        <Form<AddEntryFormData> schema={schema}>
          <FormItem label={t('所属文件')} name="fileIdList">
            <FilesSelectFilter className="!w-input-lg" />
          </FormItem>
        </Form>
      </div>
    </Dialog>
  )
}
