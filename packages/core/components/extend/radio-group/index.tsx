import {RadioGroup as UIRadioGroup, RadioGroupItem} from "@clover/core/components/ui/radio-group";
import {Label} from "@clover/core/components/ui/label";
import {FC, forwardRef, PropsWithChildren, useState} from "react";

export interface RadioGroupOptionProps {
    label: string;
    value: string;
}

export interface RadioGroupProps extends PropsWithChildren {
    value?: string;
    onChange?: (value: string) => void;
    options?: RadioGroupOptionProps[];
}

export const RadioGroup: FC<RadioGroupProps> = forwardRef((props, ref) => {
    const {
        options = [],
        value,
        onChange = () => {}
    } = props;

    const [labelKey, setLabelKey] = useState(Date.now());

    return <UIRadioGroup value={value} onValueChange={onChange}>
        {
            options.map((option) => {
                const id = `${labelKey}-${option.value}`;
                return <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={id} />
                    <Label htmlFor={id}>{option.label}</Label>
                </div>
            })
        }
    </UIRadioGroup>
})
