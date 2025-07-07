import { type TeamFormData, getSchema } from '@/config/schema/team'
import { create } from '@/rest/team'
import BackButton from '@clover/public/components/common/button/back'
import { ImageCropper } from '@clover/public/components/common/cropper'
import { useStateLoader } from '@clover/public/components/layout/hooks/use.state.loader'
import { Alert, Button, Form, FormItem, Input, Space, useMessage } from '@easykit/design'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export const TeamForm = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const load = useStateLoader()
  const queryClient = useQueryClient()
  const msg = useMessage()
  const { mutate: createTeamMutation, isPending: isCreatingTeam } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      router.push('/team')
      load().then()
      queryClient.invalidateQueries({ queryKey: ['team:list'], exact: false })
      queryClient.invalidateQueries({ queryKey: ['project:list'], exact: false })
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  return (
    <Form<TeamFormData> schema={getSchema()} onSubmit={(data) => createTeamMutation(data)}>
      <FormItem name="cover" label={t('图标')}>
        <ImageCropper className="h-20 w-20" />
      </FormItem>
      <FormItem name="name" label={t('名称')}>
        <Input placeholder={t('请输入')} className="max-w-96" />
      </FormItem>
      <FormItem name="teamKey" label={t('标识')} description={t('4-20字符，只能是小写字母和-，小写字母开头')}>
        <Input placeholder={t('请输入')} className="max-w-96" />
      </FormItem>
      <Alert className="bg-secondary text-secondary-foreground">{t('将会同时创建名为“默认项目”的初始项目。')}</Alert>
      <Space>
        <Button loading={isCreatingTeam} type="submit">
          {t('提交')}
        </Button>
        <BackButton />
      </Space>
    </Form>
  )
}
