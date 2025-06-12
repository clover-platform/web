import { create } from '@/rest/project'
import BackButton from '@clover/public/components/common/button/back'
import { ImageCropper } from '@clover/public/components/common/cropper'
import {TeamSelector} from "@clover/public/components/common/selector/team";
import { useCurrentTeam } from '@clover/public/components/layout/hooks/main'
import {useStateLoader} from "@clover/public/components/layout/hooks/use.state.loader";
import { Button, Form, FormItem, Input, Space, useMessage } from '@easykit/design'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTranslation } from "react-i18next";
import { getSchema } from '../../config/form'

export const ProjectForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const load = useStateLoader();
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
      schema={getSchema()}
      onSubmit={(data) => createProject(data)}
      defaultValues={{
        teamId: team?.id ? `${team.id}` : undefined,
      }}
    >
      <FormItem name="cover" label={t('图标')}>
        <ImageCropper className="h-20 w-20" />
      </FormItem>
      <FormItem name="name" label={t('名称')}>
        <Input placeholder={t('请输入项目名称')} className="max-w-96" />
      </FormItem>
      <FormItem name="projectKey" label={t('标识')} description={t('唯一标识只能是小写字母和-，小写字母开头')}>
        <Input placeholder={t('请输入唯一标识')} className="max-w-96" />
      </FormItem>
      <FormItem name="teamId" label={t('所属团队')}>
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
