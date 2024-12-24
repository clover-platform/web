import {
    Button,
    Command,
    CommandGroup,
    CommandItem,
    CommandList, Popover,
    PopoverContent,
    PopoverTrigger,
    Separator
} from "@easykit/design";
import {ChevronDownIcon, GearIcon} from "@radix-ui/react-icons";
import {Action} from "@clover/public/components/common/action";
import {FC, useState} from "react";
import Link from "next/link";

export type SwitcherItemProps = {
    value: number;
    label: string;
}

export type SwitcherProps = {
    title: string;
    description?: string;
    subtitle?: string;
    newButtonLabel?: string;
    items: SwitcherItemProps[];
    newUrl?: string;
    listUrl?: string;
    value?: number;
    onChange?: (value: number) => void;
};

export const Switcher: FC<SwitcherProps> = (props) => {
    const {
        items,
        value
    } = props;

    const current = items.find(item => item.value === value);
    const [open, setOpen] = useState(false);

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
            <div className={"flex justify-center items-center"}>
                {current?.label || '--'} <ChevronDownIcon />
            </div>
        </PopoverTrigger>
        <PopoverContent
            align={"start"} className={"p-0"}
            onOpenAutoFocus={(event) => event.preventDefault()}
            onClick={() => setOpen(false)}
        >
            <div className={"py-2 px-4 flex justify-center items-center"}>
                <div className={"flex-1"}>
                    <span className={"text-base font-bold"}>{props.title}</span>
                    <span className={"text-sm opacity-60 ml-2"}>{props.description}</span>
                </div>
                <Link href={props.listUrl!}>
                    <Action theme={"dark"} elType={"span"}>
                        <GearIcon/>
                    </Action>
                </Link>
            </div>
            <Separator/>
            <Command className={"p-2"}>
                <CommandList>
                    <CommandGroup className={"p-0"} heading={props.subtitle}>
                        {
                            props.items.map((item) => {
                                return <CommandItem key={item.value}>
                                    <span>{item.label}</span>
                                </CommandItem>
                            })
                        }
                    </CommandGroup>
                </CommandList>
            </Command>
            <Separator />
            <div className={"p-2"}>
                <Link href={props.newUrl!}>
                    <Button size={"sm"} className={"w-full"}>{props.newButtonLabel}</Button>
                </Link>
            </div>
        </PopoverContent>
    </Popover>
}
