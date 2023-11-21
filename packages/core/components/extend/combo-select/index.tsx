import { Popover, PopoverContent, PopoverTrigger } from "@clover/core/components/ui/popover";
import { Button } from "@clover/core/components/ui/button";
import { FC, forwardRef, PropsWithRef, ReactNode, useEffect, useRef, useState } from "react";
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
    Command,
    CommandEmpty, CommandGroup,
    CommandInput,
    CommandItem,
    CommandList, CommandSeparator
} from "@clover/core/components/ui/command";
import { cn } from "@clover/core/lib/utils";
import { Spin } from "@clover/core/components/extend/spin";
import remove from 'lodash/remove';
import cloneDeep from "lodash/cloneDeep";
import {useSize} from "@clover/core/components/hooks/resize";

export interface ComboSelectOptionProps<Data> {
    value: string;
    label: ReactNode;
    raw?: Data;
}

export interface ComboSelectProps extends PropsWithRef<any>{
    options?: ComboSelectOptionProps<any>[];
    placeholder?: string;
    searchPlaceholder?: string;
    empty?: ReactNode;
    className?: string;
    onChange?: (value: string|string[]) => void;
    value?: any;
    loading?: boolean;
    filter?: (value: string, search: string) => number;
    multiple?: boolean;
    title?: string;
    clearable?: boolean;
    clearText?: string;
}

export const ComboSelect: FC<ComboSelectProps> = forwardRef((props, ref) => {
    const {
        options = [],
        placeholder,
        searchPlaceholder,
        empty = "No data",
        className,
        onChange = (v: string|string[]) => {},
        value,
        loading = false,
        multiple = false,
        title,
        clearable = true,
        clearText = "Clear",
    } = props;

    const [open, setOpen] = useState(false)
    const containerRef = useRef(null);
    const [valueState, setValueState] = useState(value);
    const [selectedValues, setSelectedValues] = useState<string[]>(value || []);
    const size = useSize(containerRef);

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                ref={containerRef}
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                    "justify-between min-w-[150px] items-center h-10",
                    multiple ? "border-dashed justify-start flex-wrap" : null,
                    multiple && selectedValues && selectedValues.length ? "p-1 pb-2 space-x-1 space-y-1 h-auto" : null,
                    className,
                )}
                disabled={loading}
            >
                {
                    loading ? <Spin /> : <>
                        {
                            multiple ? <>
                                {
                                    selectedValues && selectedValues.length ? <>
                                        <span />
                                        {
                                            selectedValues.map((v) => {
                                                const label = options.find((option) => option.value === v)?.label;
                                                return label ? <div className={"bg-secondary py-1 px-2 rounded"} key={v}>{label}</div> : null
                                            })
                                        }
                                    </> : <>
                                        <PlusCircledIcon className="mr-2 h-4 w-4" />
                                        { title }
                                    </>
                                }
                            </> : <>
                                <span>{valueState ? options.find((option) => option.value === valueState)?.label : placeholder}</span>
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </>
                        }
                    </>
                }
            </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" style={{width: size.width}}>
            <Command filter={props.filter}>
                <CommandInput placeholder={searchPlaceholder} className="h-9" />
                <CommandEmpty>{ empty }</CommandEmpty>
                <CommandList>
                    {
                        options.map((option) => {
                            const isSelected = selectedValues.includes(option.value)
                            return <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(currentValue) => {
                                    if(multiple) {
                                        if(isSelected) {
                                            remove(selectedValues, (item) => item === currentValue);
                                        }else{
                                            selectedValues.push(currentValue);
                                        }
                                        const v = cloneDeep(selectedValues);
                                        setSelectedValues(v);
                                        onChange(v);
                                    }else{
                                        const v = currentValue === valueState ? "" : currentValue;
                                        setValueState(v);
                                        onChange(v);
                                        setOpen(false)
                                    }
                                }}
                            >
                                <div
                                    className={cn(
                                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                        isSelected
                                            ? "bg-primary text-primary-foreground"
                                            : "opacity-50 [&_svg]:invisible"
                                    )}
                                >
                                    <CheckIcon className={cn("h-4 w-4")} />
                                </div>
                                { option.label }
                                {
                                    !multiple ? <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    /> : null
                                }
                            </CommandItem>
                        })
                    }
                </CommandList>
                {
                    clearable &&  selectedValues.length > 0 ? (
                        <>
                            <CommandSeparator />
                            <CommandGroup>
                                <CommandItem
                                    onSelect={() => {
                                        setSelectedValues([]);
                                        onChange([]);
                                    }}
                                    className="justify-center text-center"
                                >
                                    { clearText }
                                </CommandItem>
                            </CommandGroup>
                        </>
                    ) : null
                }
            </Command>
        </PopoverContent>
    </Popover>
})
