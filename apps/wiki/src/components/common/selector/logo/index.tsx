import {ImageIconSelector, ImageIconSelectorProps} from "@easykit/common/components/selector/image-icon";
import {COVERS} from "@/config/book";
import {forwardRef, useEffect, useState} from "react";

export type LogoSelectorProps = Omit<ImageIconSelectorProps, "options"> & {};

export const LogoSelector = forwardRef<HTMLDivElement, LogoSelectorProps>((props, ref) => {
    const [value, setValue] = useState<string | undefined>(props.value);

    useEffect(() => {
        setValue(props.value);
    }, [props.value, props.onChange]);

    return <ImageIconSelector
        value={value}
        onChange={(file?: string) => {
            setValue(file);
            props.onChange?.(file);
        }}
        options={COVERS}
    />
});
