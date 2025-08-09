import { IconCreateTeam } from '@arco-iconbox/react-clover'
import { Alert, Button, Form, FormItem, Input, Space, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { IconTitle } from '@clover/public/components/common/icon-title'
import { useStateLoader } from '@clover/public/components/layout/hooks/use.state.loader'
import { getSchema, type TeamInitFormData } from '@clover/public/config/schema/layout/guide'
import { init } from '@clover/public/rest/team'

export const Guide = () => {
  const msg = useMessage()
  const loader = useStateLoader()
  const { t } = useTranslation()
  const { mutate, isPending } = useMutation({
    mutationFn: init,
    onError: (error) => {
      msg.error(error.message)
    },
    onSuccess: () => {
      loader()
    },
  })

  const description = (
    <>
      <div>{t('团队允许您在多个项目之间进行管理与协作。团队的成员拥有访问其中所有项目的权限。')}</div>
      <div>{t('创建团队时，您需要同时在团队下创建一个初始项目。')}</div>
    </>
  )
  return (
    <div className="w-full max-w-[480px]">
      <IconTitle
        description={description}
        icon={<IconCreateTeam className="text-primary" fontSize={40} />}
        title={t('创建团队')}
      />
      <Form<TeamInitFormData> className="mt-10" onSubmit={(data) => mutate(data)} schema={getSchema()}>
        <FormItem label={t('团队名称')} name="name">
          <Input placeholder={t('请输入')} />
        </FormItem>
        <FormItem label={t('唯一标识')} name="key">
          <Input placeholder={t('请输入')} />
        </FormItem>
        <Alert className="bg-secondary text-secondary-foreground">{t('将会同时创建名为"默认项目"的初始项目。')}</Alert>
        <Space className="justify-start">
          <Button loading={isPending} type="submit">
            {t('创建团队')}
          </Button>
        </Space>
      </Form>
    </div>
  )
}
