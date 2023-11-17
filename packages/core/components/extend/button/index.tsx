import {ButtonProps as UIButtonProps} from "@clover/core/components/ui/button";
import { Button as UIButton } from "@clover/core/components/ui/button";
import { IconSpin } from "@clover/core/icon";
import { cn } from '@clover/core/lib/utils';

export interface ButtonProps extends UIButtonProps {
    loading?: boolean;
    long?: boolean;
    htmlType?: "submit" | "reset" | "button" | undefined;
}

export const Button = (props: ButtonProps) => {
    const {
        loading = false,
        long = false,
        disabled = false,
        className,
        ...rest
    } = props;

    return <UIButton
        {...rest}
        className={cn(className, long ? 'w-full' : null)}
        disabled={loading || disabled}
    >
        { loading ? <IconSpin className="animate-spin mr-1" /> : null }
        { props.children }
    </UIButton>
};
