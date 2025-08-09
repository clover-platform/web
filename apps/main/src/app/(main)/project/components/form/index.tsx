import { getSchema } from '../config/form'

import { Button, Form, FormItem, Input, Space, useMessage } from '@easykit/design'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import BackButton from '@clover/public/components/common/button/back'
import { ImageCropper } from '@clover/public/components/common/cropper'
import { TeamSelector } from '@clover/public/components/common/selector/team'
import { useCurrentTeam } from '@clover/public/components/layout/hooks/main'
import { useStateLoader } from '@clover/public/components/layout/hooks/use.state.loader'
import { create } from '@/rest/project'

export const ProjectForm = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const load = useStateLoader()
  const msg = useMessage()
  const team = useCurrentTeam()
  const queryClient = useQueryClient()
  const { mutate: createProject, isPending: submitting } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      router.push('/project')
      load().then()
      queryClient.invalidateQueries({ queryKey: ['project:list'], exact: false })
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  return (
    <Form
      defaultValues={{
        teamId: team?.id ? `${team.id}` : undefined,
      }}
      onSubmit={(data) => createProject(data)}
      schema={getSchema()}
    >
      <FormItem label={t('图标')} name="cover">
        <ImageCropper className="h-20 w-20" />
      </FormItem>
      <FormItem label={t('名称')} name="name">
        <Input className="max-w-96" placeholder={t('请输入项目名称')} />
      </FormItem>
      <FormItem description={t('唯一标识只能是小写字母和-，小写字母开头')} label={t('标识')} name="projectKey">
        <Input className="max-w-96" placeholder={t('请输入唯一标识')} />
      </FormItem>
      <FormItem label={t('所属团队')} name="teamId">
        <TeamSelector />
      </FormItem>
      <Space>
        <Button loading={submitting} type="submit">
          {t('提交')}
        </Button>
        <BackButton />
      </Space>
    </Form>
  )
}
