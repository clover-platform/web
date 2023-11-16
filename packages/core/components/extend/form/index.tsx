import {
    Form as UIForm,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@clover/core/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import {ControllerRenderProps, SubmitHandler, useForm} from "react-hook-form"
import * as z from "zod"
import {PropsWithChildren, ReactNode} from "react";
import {ZodObject} from "zod";

export interface RenderProps extends ControllerRenderProps {
    placeholder?: string;
}

export type RenderFunction = (field: RenderProps) => ReactNode;

export interface FieldItem {
    name: any;
    label: string | ReactNode
    description?: string;
    placeholder?: string;
    render: RenderFunction;
}

export interface FormProps extends PropsWithChildren {
    fields: FieldItem[];
    schema?: ZodObject<any>;
    defaultValues?: object
    onSubmit?: SubmitHandler<any>;
    className?: string;
}

const Form = (props: FormProps) => {
    const {
        fields = [],
        schema = null,
        defaultValues = null,
        onSubmit = () => {},
        className = "space-y-6"
    } = props;

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues,
    })

    return <UIForm {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
            {
                fields.map((item: FieldItem) => {
                    return <FormField
                        key={item.name}
                        control={form.control}
                        name={item.name}
                        render={({ field }) => (
                            <FormItem>
                                { item.label ? <FormLabel>{item.label}</FormLabel> : null }
                                <FormControl>
                                    { item.render({...field, placeholder: item.placeholder }) }
                                </FormControl>
                                { item.description ? <FormDescription>{item.description}</FormDescription> : null }
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                })
            }
            { props.children }
        </form>
    </UIForm>
};

export default Form;
