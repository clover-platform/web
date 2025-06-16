import { useModule } from '@/hooks/use.module'
import { deleteModule } from '@/rest/module'
import { Alert, Badge, Button, useAlert, useMessage } from '@easykit/design'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export const ModuleRemove = () => {
  const alert = useAlert()
  const msg = useMessage()
  const router = useRouter()
  const { t } = useTranslation()
  const m = useModule()
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: deleteModule,
    onSuccess: () => {
      router.push('/')
      queryClient.invalidateQueries({ queryKey: ['module:list'], exact: false })
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const remove = () => {
    alert.confirm({
      title: t('删除'),
      description: t('删除该翻译项目，所以的翻译数据将无法使用，是否继续？'),
      onOk: async () => {
        await mutateAsync(m)
        return true
      },
    })
  }

  return (
    <>
      <div className="font-medium text-lg">{t('删除项目')}</div>
      <Alert variant="destructive">
        <Badge variant="destructive">{t('重要')}</Badge>
        <span>{t('删除项目将永久删除与该项目关联的所有资源，包括上传的文件、翻译、审批等。删除的项目无法恢复！')}</span>
      </Alert>
      <div>
        <Button onClick={remove} variant="destructive">
          {t('删除项目')}
        </Button>
      </div>
    </>
  )
}