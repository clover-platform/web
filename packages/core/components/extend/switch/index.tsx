import { Switch as UISwitch } from "@clover/core/components/ui/switch";
import {FC, forwardRef, useState} from "react";

export interface SwitchProps {
    value?: boolean;
    onChange?: (value: boolean) => void;
}

export const Switch: FC<SwitchProps> = forwardRef((props, ref) => {
    const {
        onChange = () => {},
    } = props;

    const [checked, setChecked] = useState(props.value);
    return <UISwitch
        checked={checked}
        onCheckedChange={(checked) => {
            setChecked(checked)
            onChange(checked);
        }}
    />
});
