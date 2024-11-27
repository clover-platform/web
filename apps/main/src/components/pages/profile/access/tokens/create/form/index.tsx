import {DatePicker, Form, FormItem, Input} from "@easykit/design";
import {t} from "@easykit/common/utils/locale";
import {FC, PropsWithChildren} from "react";
import {getSchema} from "@/config/pages/profile/access/form";

export type AccessTokenFormProps = PropsWithChildren<{
    onSubmit?: (data: any) => void;
}>;

export const AccessTokenForm: FC<AccessTokenFormProps> = (props) => {
    return <Form
        schema={getSchema()}
        onSubmit={props.onSubmit}
    >
        <FormItem name="name" label={t("令牌名称")}>
            <Input placeholder={t("请输入")} />
        </FormItem>
        <FormItem name="expirationTime" label={t("过期时间")} description={t("不设置则不过期，不过期的令牌有一定危险，请确认。")}>
            <DatePicker className={"w-input-xs"} format={"yyyy-MM-dd"} allowClear={true} placeholder={t("请选择")} />
        </FormItem>
        { props.children }
    </Form>
}
