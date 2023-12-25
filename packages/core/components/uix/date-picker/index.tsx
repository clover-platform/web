import {forwardRef, useContext, useState} from "react";
import { addDays, format} from "date-fns"
import { Button, Select, cn } from "@atom-ui/core";
import { Calendar } from "@atom-ui/core";
import { Calendar as CalendarIcon } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@atom-ui/core"
import {UIXContext} from "@atom-ui/core/components/uix/config-provider";

export type DatePickerProps = {
    placeholder?: string,
    format?: string,
    preset?: boolean,
    className?: string,
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
    const {
        preset = false,
    } = props;
    const [date, setDate] = useState<Date>()
    const [presetValue, setPresetValue] = useState<string>('');

    const config = useContext(UIXContext);
    const locale = config.locale.DatePicker.locale;
    const formatConfig = props.format || config.locale.DatePicker.format;
    const options = config.locale.DatePicker.options;

    const calendar = <Calendar
        locale={locale}
        mode="single"
        selected={date}
        onSelect={(v) => {
            setDate(v);
            setPresetValue('');
        }}
    />;

    return <Popover>
        <PopoverTrigger asChild>
            <Button
                variant={"outline"}
                className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                    props.className
                )}
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, formatConfig) : <span>{props.placeholder}</span>}
            </Button>
        </PopoverTrigger>
        <PopoverContent
            align={"start"}
            className={cn(
                "w-fit flex",
                preset ? "flex-col space-y-2 p-2 " : "p-0"
            )}
        >
            {
                preset ? <>
                    <Select
                        className={"w-full"}
                        value={presetValue}
                        options={options}
                        placeholder={"请选择"}
                        onChange={(value) => {
                            setDate(addDays(new Date(), parseInt(value)))
                            setPresetValue(value);
                        }}
                    />
                    <div className="rounded-md border">
                        { calendar}
                    </div>
                </> : calendar
            }
        </PopoverContent>
    </Popover>;
});