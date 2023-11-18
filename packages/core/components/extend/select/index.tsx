import {
    Select as UISelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select"
import {forwardRef, PropsWithChildren, ElementRef} from "react";


export interface SelectOptionProps {
    value: string;
    label: string;
}

export interface SelectProps {
    options: SelectOptionProps[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
}

export const Select = forwardRef<ElementRef<typeof UISelect>, SelectProps>((props, ref) => {
    const {
        options = [],
        value,
        onChange,
        placeholder,
        ...rest
    } = props;

    return <UISelect
        {...rest}
        onValueChange={onChange}
        defaultValue={value}
    >
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
            { options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>) }
        </SelectContent>
    </UISelect>
})
