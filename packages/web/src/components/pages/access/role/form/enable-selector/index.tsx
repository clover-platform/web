import {Select} from "@atom-ui/core";
import {forwardRef} from "react";

const EnableSelector = forwardRef((props, ref) => {
    return <Select
        {...props}
        placeholder={"{#请选择状态#}"}
        options={[
            { label: "{#全部#}", value: '2' },
            { label: "{#启用#}", value: '1' },
            { label: "{#禁用#}", value: '0' }
        ]}
    />
});

export default EnableSelector;
