import { ElementRef, forwardRef, ComponentPropsWithoutRef } from "react";
import { Checkbox as UICheckbox } from "@clover/core/components/ui/checkbox";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@clover/core/lib/utils";
import { MinusIcon } from "@radix-ui/react-icons";

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>{
    indeterminate?: string;
}

export const Checkbox = forwardRef<
    ElementRef<typeof UICheckbox>,
    CheckboxProps
>((props, ref) => {
    const { indeterminate } = props;
    const indeterminateValue = (indeterminate === "true");
    return <UICheckbox
        ref={ref}
        {...props}
        className={cn(
            indeterminateValue && "bg-primary text-primary-foreground",
            indeterminateValue && "flex items-center justify-center",
            props.className
        )}
    >
        { indeterminateValue && <MinusIcon className="h-4 w-4" /> }
    </UICheckbox>
})
