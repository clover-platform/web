
import { TeamSelector } from '@clover/public/components/common/selector/team'
import {useStateLoader} from "@clover/public/components/layout/hooks/use.state.loader";
import { useFormSubmit } from '@clover/public/hooks/use.form.submit'
import { change } from '@clover/public/rest/team'
import { t } from '@clover/public/utils/locale.client'
import { Button, Dialog, Form, FormItem } from '@easykit/design'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { type FC, type PropsWithChildren, useState } from 'react'
import { useTranslation } from "react-i18next";
import { object, string } from 'zod'

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
  const { t } = useTranslation();
  const [open, setOpen] = useState(false)
  const loader = useStateLoader();
  const queryClient = useQueryClient()
  const {ref, onSubmit, submitting} = useFormSubmit({
    action: change,
    onSuccess: () => {
      queryClient.resetQueries()
      onSuccess?.();
      setOpen(false);
      loader().then();
    }
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
      <Dialog title={title} visible={open} onCancel={() => setOpen(false)} className="w-96">
        <Form
          ref={ref}
          schema={getSchema()}
          onSubmit={onSubmit}
          defaultValues={{
            teamId: teamId ? `${teamId}` : '',
          }}
        >
          <FormItem name="teamId" label={t('团队')}>
            <TeamSelector className="w-full" />
          </FormItem>
          <Button loading={submitting} type="submit" className="w-full">
            {t('切换')}
          </Button>
        </Form>
      </Dialog>
    </div>
  )
}
