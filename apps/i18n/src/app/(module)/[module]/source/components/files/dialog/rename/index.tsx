import { type FC, useEffect, useMemo, useState } from 'react'
import { Button, Dialog, type DialogProps, Input, useMessage } from '@easykit/design'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useModule } from '@/hooks/use.module'
import { rename } from '@/rest/source'

export type RenameDialogProps = DialogProps & {
  fileId?: number
  fileName?: string
}

export const RenameDialog: FC<RenameDialogProps> = (props) => {
  const { fileId, fileName, onCancel, ...rest } = props
  const { t } = useTranslation()
  // 移除后缀名 .json .xlsx .xls 等
  const [name, setName] = useState(fileName?.split('.').slice(0, -1).join('.') ?? '')
  const msg = useMessage()
  const m = useModule()
  const queryClient = useQueryClient()
  const { mutate: renameMutate, isPending: submitting } = useMutation({
    mutationFn: rename,
    onSuccess: () => {
      onCancel?.()
      queryClient.invalidateQueries({ queryKey: ['module:source:files'] })
      queryClient.invalidateQueries({ queryKey: ['module:list'], exact: false })
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const subfix = useMemo(() => {
    return `.${fileName?.split('.').pop()}`
  }, [fileName])

  useEffect(() => {
    setName(fileName?.split('.').slice(0, -1).join('.') ?? '')
  }, [fileName])

  const footer = useMemo(() => {
    return (
      <div className="flex justify-end gap-2">
        <Button
          loading={submitting}
          onClick={() => renameMutate({ module: m, fileId: fileId!, name: `${name}${subfix}` })}
        >
          {t('确定')}
        </Button>
        <Button onClick={onCancel} variant="outline">
          {t('取消')}
        </Button>
      </div>
    )
  }, [t, onCancel, submitting, m, fileId, name, renameMutate, subfix])

  return (
    <Dialog title="重命名" {...rest} footer={footer} onCancel={onCancel}>
      <div className="flex items-center gap-2">
        <Input onChange={(e) => setName(e.target.value)} value={name} />
        <div className="text-secondary-foreground">{subfix}</div>
      </div>
    </Dialog>
  )
}
