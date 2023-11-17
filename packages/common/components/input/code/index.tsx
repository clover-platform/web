import {Input, InputProps} from "@clover/core";
import {ChangeEvent, forwardRef} from "react";

const CodeInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        onChange = (e) => {},
        ...rest
    } = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let v = e.target.value;
        v = v ? v.replace(/[^\d]/g, '') : v;
        e.target.value = v;
        onChange(e);
    }

    return <Input
        {...rest}
        ref={ref}
        onChange={handleChange}
        maxLength={6}
    />
});

export default CodeInput;
