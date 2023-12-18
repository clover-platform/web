import { ButtonProps as UIButtonProps } from "@atom-ui/core/components/ui/button";
import { Button as UIButton } from "@atom-ui/core/components/ui/button";
import { cn } from '@atom-ui/core/lib/utils';
import { Spin } from "@atom-ui/core/components/uix/spin";
import {forwardRef} from "react";

export interface ButtonProps extends UIButtonProps {
    loading?: boolean;
    long?: boolean;
    htmlType?: "submit" | "reset" | "button" | undefined;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        loading = false,
        long = false,
        disabled = false,
        className,
        ...rest
    } = props;

    return <UIButton
        {...rest}
        ref={ref}
        className={cn(className, long ? 'w-full' : null)}
        disabled={loading || disabled}
    >
        { loading ? <Spin /> : null }
        { props.children }
    </UIButton>
});
