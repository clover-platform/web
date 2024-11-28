import {DatePicker, Form, FormItem, Input} from "@easykit/design";
import {t} from "@easykit/common/utils/locale";
import {FC, PropsWithChildren, useRef} from "react";
import {getSchema} from "@/config/pages/profile/access/form";
import {FormResult, useFormResult} from "@clover/public/hooks/use.form.result";
import {CreateData} from "@/rest/profile/access/token";
import {ScopesSelect} from "@/components/pages/profile/access/tokens/scopes-select";

export type AccessTokenFormProps = PropsWithChildren<{
    onSubmit?: (data: CreateData, call: FormResult<string>) => void | Promise<void>;
    onSuccess: (result?: string) => void;
}>;

export const AccessTokenForm: FC<AccessTokenFormProps> = (props) => {
    const { onSuccess, onSubmit } = props;
    const ref = useRef();
    const formResult = useFormResult<string>({
        ref,
        onSuccess
    });
    return <Form
        ref={ref}
        schema={getSchema()}
        onSubmit={(data) => onSubmit?.(data as CreateData, formResult)}
    >
        <FormItem name="name" label={t("令牌名称")}>
            <Input placeholder={t("请输入")} className={"w-input-md"} />
        </FormItem>
        <FormItem name="expirationTime" label={t("过期时间")} description={t("不设置则不过期，不过期的令牌有一定危险，请确认。")}>
            <DatePicker className={"w-input-xs"} format={"yyyy-MM-dd"} allowClear={true} placeholder={t("请选择")} />
        </FormItem>
        <FormItem name="scopes" label={t("范围")}>
            <ScopesSelect />
        </FormItem>
        { props.children }
    </Form>
}
