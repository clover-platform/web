import { FilesSelect } from '../../select/files'
import { EntryEditor } from './entry-editor'
import { type AddEntryFormData, useSchema } from './schema'

import type { FC } from 'react'
import { Alert, Button, Dialog, type DialogProps, Form, FormItem } from '@easykit/design'
import { useTranslation } from 'react-i18next'

export type AddEntryDialogProps = DialogProps

export const AddEntryDialog: FC<AddEntryDialogProps> = (props) => {
  const { t } = useTranslation()
  const schema = useSchema()
  const form = Form.useForm<AddEntryFormData>()
  const fileIdList = Form.useWatch('fileIdList', form)

  console.log('fileIdList', fileIdList)

  const handleSubmit = () => {
    form.submit()
  }

  const onSubmit = (data: AddEntryFormData) => {
    console.log(data)
  }

  return (
    <Dialog
      {...props}
      className="sm:!max-w-7xl w-10/12"
      footer={
        <div className="flex gap-2">
          <Button onClick={handleSubmit}>{t('添加')}</Button>
          <Button onClick={props.onCancel} variant="outline">
            {t('取消')}
          </Button>
        </div>
      }
      maskClosable={false}
      title={t('添加词条')}
    >
      <div className="flex flex-col gap-4">
        <Alert className="bg-secondary">{t('即使只添加一个词条，也会生成一个变更版本。')}</Alert>
        <Form<AddEntryFormData> form={form} onSubmit={onSubmit} schema={schema}>
          <FormItem label={t('添加到')} name="fileIdList">
            <FilesSelect className="!w-input-lg" />
          </FormItem>
          <FormItem label={t('词条')} name="entries">
            <EntryEditor />
          </FormItem>
        </Form>
      </div>
    </Dialog>
  )
}
