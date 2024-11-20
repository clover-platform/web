import {getSchema} from "@/config/pages/access/role/form";
import {Form, FormItem, Input, Switch, Textarea} from "@easykit/design";
import {FC, PropsWithChildren} from "react";
import { AuthorityTree } from "../../authority/form/tree";
import { t } from '@easykit/common/utils/locale';

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

    return <Form
        schema={getSchema()}
        onSubmit={props.onSubmit}
        defaultValues={defaultValues}
    >
        <FormItem name="name" label={t("名称")}>
            <Input placeholder={t("请输入角色名称")} className={"w-input-md"} />
        </FormItem>
        <FormItem name="description" label={t("描述")}>
            <Textarea placeholder={t("请输入角色描述")} />
        </FormItem>
        <FormItem name="enable" label={t("启用状态")}>
            <Switch />
        </FormItem>
        <FormItem name="authorities" label={t("关联接口")}>
            <AuthorityTree />
        </FormItem>
        { props.children }
    </Form>
}

export default RoleForm;
