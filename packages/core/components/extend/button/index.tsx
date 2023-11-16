import {ButtonProps as UIButtonProps} from "@clover/core/components/ui/button";
import { Button as UIButton } from "@clover/core/components/ui/button";
import { IconSpin } from "@arco-iconbox/react-clover";
import { cn } from '@clover/core/lib/utils';

export interface ButtonProps extends UIButtonProps {
    loading?: boolean;
    long?: boolean;
    htmlType?: "submit" | "reset" | "button" | undefined;
}

const Button = (props: ButtonProps) => {
    const {
        loading = false,
        long = false,
        disabled = false,
        className,
        htmlType,
        ...rest
    } = props;

    return <UIButton
        {...rest}
        type={htmlType || 'button'}
        className={cn(className, long ? 'w-full' : null)}
        disabled={loading || disabled}
    >
        { loading ? <IconSpin className="animate-spin mr-1" /> : null }
        { props.children }
    </UIButton>
};

export default Button;
