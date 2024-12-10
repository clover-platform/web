import {Select, SelectProps} from "@easykit/design";
import { t } from '@clover/public/locale';
import {FC} from "react";

export const EnableSelector: FC<Omit<SelectProps, "options">> = (props) => {
    return <Select
        {...props}
        placeholder={t("请选择状态")}
        options={[
            { label: t("全部"), value: '2' },
            { label: t("启用"), value: '1' },
            { label: t("禁用"), value: '0' }
        ]}
    />
}
