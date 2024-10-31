import {LogoSelector} from "@/components/common/selector/logo";
import {Input} from "@easykit/design";
import {forwardRef, useCallback, useEffect, useState} from "react";
import classNames from "classnames";

export type NameLogoInputValue = {
    logo: string;
    name: string;
}

export type NameLogoInputProps = {
    placeholder?: string;
    className?: string;
    value?: NameLogoInputValue;
    onChange?: (value?: NameLogoInputValue) => void;
}

const DEFAULT_VALUE = {
    logo: '',
    name: '',
}

export const NameLogoInput = forwardRef<HTMLDivElement, NameLogoInputProps>((props, ref) => {
    const { className, placeholder, onChange } = props;
    const [value, setValue] = useState<NameLogoInputValue|undefined>(props.value);

    useEffect(() => {
        setValue(props.value);
    }, [props.value, onChange])

    const onLogoChange = useCallback((logo?: string) => {
        const newValue = {
            ...(value || DEFAULT_VALUE),
            logo: logo!,
        }
        setValue(newValue);
        onChange?.(newValue);
    }, [value, onChange])

    const onInputChange = useCallback((name?: string) => {
        const newValue = {
            ...(value || DEFAULT_VALUE),
            name: name!,
        }
        setValue(newValue)
        onChange?.(newValue);
    }, [value, onChange])

    return <div className={classNames("flex justify-center items-center space-x-1", className)}>
        <LogoSelector value={value?.logo} onChange={onLogoChange} />
        <Input value={value?.name || ""} onChange={(e) => onInputChange(e.target.value)} placeholder={placeholder} className={"flex-1"} />
    </div>
});
