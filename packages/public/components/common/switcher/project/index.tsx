import { type FC, type PropsWithChildren, useState } from 'react'
import { Button, Dialog, Form, FormItem } from '@easykit/design'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { object, string } from 'zod'
import { TeamSelector } from '@clover/public/components/common/selector/team'
import { useStateLoader } from '@clover/public/components/layout/hooks/use.state.loader'
import { useFormSubmit } from '@clover/public/hooks/use.form.submit'
import { change } from '@clover/public/rest/team'
import { t } from '@clover/public/utils/locale.client'

export const getSchema = () =>
  object({
    teamId: string().min(1, t('请选择团队')),
  })

export type ProjectSwitcherProps = PropsWithChildren<{
  className?: string
  onSuccess?: () => void
  title: string
  teamId?: number
}>

export const ProjectSwitcher: FC<ProjectSwitcherProps> = (props) => {
  const { title, children, className, teamId, onSuccess } = props
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const loader = useStateLoader()
  const queryClient = useQueryClient()
  const { ref, onSubmit, submitting } = useFormSubmit({
    action: change,
    onSuccess: () => {
      queryClient.resetQueries()
      onSuccess?.()
      setOpen(false)
      loader().then()
    },
  })

  return (
    <div
      className={classNames('w-full', className)}
      onClick={(e) => {
        e.stopPropagation()
        setOpen(true)
      }}
    >
      {children}
      <Dialog className="w-96" onCancel={() => setOpen(false)} title={title} visible={open}>
        <Form
          defaultValues={{
            teamId: teamId ? `${teamId}` : '',
          }}
          onSubmit={onSubmit}
          ref={ref}
          schema={getSchema()}
        >
          <FormItem label={t('团队')} name="teamId">
            <TeamSelector className="w-full" />
          </FormItem>
          <Button className="w-full" loading={submitting} type="submit">
            {t('切换')}
          </Button>
        </Form>
      </Dialog>
    </div>
  )
}
