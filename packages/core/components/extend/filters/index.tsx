import {PropsWithChildren, FC, useEffect, cloneElement, ReactElement, useRef} from "react";
import {useForm, Controller, SubmitHandler} from "react-hook-form"
import {Control} from "react-hook-form/dist/types";
import {Button} from "@clover/core/components/extend/button";

export interface FilterItemProps {
    field: string;
    render: () => ReactElement;
    label?: string;
}

export interface FiltersProps extends PropsWithChildren{
    items: FilterItemProps[];
    defaultValues?: object;
}

const renderItem = (item: FilterItemProps, form: {control: Control, defaultValue: any}) => {
    const ele = item.render();

    return <div key={item.field} className={"m-2 my-1"}>
        <div className={"text-sm text-muted-foreground mb-1"}>{ item.label }</div>
        <div>
            <Controller
                name={item.field}
                control={form.control}
                render={({ field }) => cloneElement(ele, {...ele.props, ...field, value: field.value || form.defaultValue})}
            />
        </div>
    </div>
}

export const Filters: FC<FiltersProps> = (props) => {
    const {
        items = [],
        defaultValues = null
    } = props;

    const { control, handleSubmit } = useForm({
        defaultValues,
    })

    const onSubmit: SubmitHandler<any> = (data) => {
        console.log(data);
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"flex justify-start items-end -mx-2 flex-wrap"}>
            { items.map((item) => renderItem(item, {control, defaultValue: (defaultValues||{})[item.field] || ''})) }
            {
                items && items.length ? <div className={"m-2 my-1 flex justify-start items-center flex-1"}>
                    <Button type={"submit"}>提交</Button>
                    <Button type={"reset"} className={"ml-2"} variant={"secondary"}>重置</Button>
                </div> : null
            }
        </div>
    </form>
}
