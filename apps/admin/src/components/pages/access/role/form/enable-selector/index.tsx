import {Select} from "@easykit/design";
import {forwardRef} from "react";
import { t } from '@easykit/common/utils/locale';

const EnableSelector = forwardRef((props, ref) => {
    return <Select
        {...props}
        placeholder={t("请选择状态")}
        options={[
            { label: t("全部"), value: '2' },
            { label: t("启用"), value: '1' },
            { label: t("禁用"), value: '0' }
        ]}
    />
});

export default EnableSelector;
