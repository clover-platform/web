import {
    Form as UIForm,
    FormControl,
    FormDescription,
    FormField,
    FormItem as UIFormItem,
    FormLabel,
    FormMessage,
} from "@clover/core/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import {ControllerRenderProps, SubmitHandler, useForm} from "react-hook-form"
import * as z from "zod"
import { FC, PropsWithChildren, ReactElement, ReactNode, cloneElement, FormHTMLAttributes } from "react";
import { ZodObject } from "zod";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { DeepPartial } from "react-hook-form/dist/types/utils";
import { WatchObserver } from "react-hook-form/dist/types/form";
import { useMemo, Children } from "react";
import isObject from "lodash/isObject";
import { Control } from "react-hook-form/dist/types";
import { ZodEffects } from "zod/lib/types";
import { cn } from "@clover/core/lib/utils";

export interface RenderProps extends ControllerRenderProps {
    placeholder?: string;
}

export interface FieldItem extends PropsWithChildren {
    name: string;
    label: string | ReactNode
    description?: string;
    control?: Control<FieldValues>;
    defaultValue?: any;
}

export type FormValues = DeepPartial<FieldValues>;

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    schema?: ZodObject<any> | ZodEffects<any, any>;
    defaultValues?: object
    onSubmit?: SubmitHandler<FormValues>;
    className?: string;
    onValuesChange?: WatchObserver<FieldValues>
}

export const FormItem: FC<FieldItem> = (props) => {
    const render = (field: ControllerRenderProps) => {
        if(Children.count(props.children) === 1) {
            const ele = (props.children as ReactElement);
            return cloneElement(ele, {
                ...ele.props,
                ...field,
                value: field.value || props.defaultValue || '', // a component is changing an uncontrolled input to be controlled
            })
        }
        return props.children;
    };

    return <FormField
        control={props.control}
        name={props.name}
        render={({ field }) => (
            <UIFormItem>
                { props.label ? <FormLabel>{ props.label }</FormLabel> : null }
                <FormControl>
                    <div>
                        { render(field) }
                    </div>
                </FormControl>
                { props.description ? <FormDescription>{props.description}</FormDescription> : null }
                <FormMessage />
            </UIFormItem>
        )}
    />;
}

export const Form: FC<FormProps> = (props) => {
    const {
        schema = null,
        defaultValues = null,
        onSubmit = () => {},
        className = "space-y-6",
        onValuesChange,
        ...rest
    } = props;

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues,
    })
    form.watch(onValuesChange);

    const children = useMemo<ReactNode[]>(() => {
        return Children.map(props.children, (child, index) => {
            if(isObject(child) && ('type' in (child as ReactElement))) {
                const ele = (child as ReactElement);
                if(ele.type === FormItem) {
                    return cloneElement(ele, {
                        ...ele.props,
                        control: form.control,
                        defaultValue: (defaultValues || {})[ele.props.name],
                    })
                }
            }
            return child;
        })
    }, [props.children])

    return <UIForm {...form}>
        <form
            {...rest}
            onSubmit={form.handleSubmit(onSubmit)}
            className={className}
        >
            { children }
        </form>
    </UIForm>
};
