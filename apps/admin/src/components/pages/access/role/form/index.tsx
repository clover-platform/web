import {getSchema} from "@/config/pages/access/role/form";
import {Form, FormItem, Input, Switch, Textarea} from "@easykit/design";
import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthorityTree } from '../../authority/form/tree'

export interface RoleFormProps extends PropsWithChildren {
    onSubmit?: (data: any) => void;
    defaultValues?: any;
}

const RoleForm:FC<RoleFormProps> = (props) => {
    const {
        defaultValues = {
            enable: false,
        }
    } = props;
    const { t } = useTranslation()

    return (
      <Form schema={getSchema()} onSubmit={props.onSubmit} defaultValues={defaultValues}>
        <FormItem name="name" label={t('名称')}>
          <Input placeholder={t('请输入角色名称')} className="w-md" />
        </FormItem>
        <FormItem name="description" label={t('描述')}>
          <Textarea placeholder={t('请输入角色描述')} />
        </FormItem>
        <FormItem name="enable" label={t('启用状态')}>
          <Switch />
        </FormItem>
        <FormItem name="authorities" label={t('关联权限')}>
          <AuthorityTree />
        </FormItem>
        {props.children}
      </Form>
    )
}

export default RoleForm;
