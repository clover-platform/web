import { getSchema } from '@/config/schema/module/file'
import type { FileFormData } from '@/config/schema/module/file'
import { uploadHandle } from '@clover/public/utils/file'
import { Form, FormItem, Uploader } from '@easykit/design'
import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

export type ModuleFileFormProps = PropsWithChildren<{
  onSubmit?: (data: FileFormData) => void
  defaultValues?: FileFormData
}>

export const ModuleFileForm: FC<ModuleFileFormProps> = (props) => {
  const { defaultValues = { files: [] } } = props
  const { t } = useTranslation()

  return (
    <Form<FileFormData> schema={getSchema()} onSubmit={props.onSubmit} defaultValues={defaultValues}>
      <FormItem name="files" label={t('文件')}>
        <Uploader
          accept={{
            'application/json': ['.json'],
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
          }}
          data={{
            type: 1, // 私有
          }}
          uploadHandle={uploadHandle}
        />
      </FormItem>
      {props.children}
    </Form>
  )
}
