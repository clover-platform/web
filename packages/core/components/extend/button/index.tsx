import { ButtonProps as UIButtonProps } from "@clover/core/components/ui/button";
import { Button as UIButton } from "@clover/core/components/ui/button";
import { cn } from '@clover/core/lib/utils';
import { Spin } from "@clover/core/components/extend/spin";

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
        { loading ? <Spin /> : null }
        { props.children }
    </UIButton>
};
