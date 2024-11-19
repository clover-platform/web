import {ImageIconSelector, ImageIconSelectorProps} from "@easykit/common/components/selector/image-icon";
import {COVERS} from "@/config/book";
import {FC, useEffect, useState} from "react";

export type LogoSelectorProps = Omit<ImageIconSelectorProps, "options"> & {};

export const LogoSelector: FC<LogoSelectorProps> = (props) => {
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
}
