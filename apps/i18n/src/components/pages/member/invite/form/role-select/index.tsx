import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Button, Checkbox,
} from "@easykit/design";
import { forwardRef, useRef, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useDocumentClick } from "@easy-kit/common/hooks";

export type RoleSelectProps = {
    value?: string[];
    onChange?: (value: string[]) => void;
};

type RoleOption = {
    label: string;
    value: string;
    description: string;
};

const ROLE_OPTIONS: RoleOption[] = [
    {
        label: "{#管理员#}",
        value: "1",
        description: "{#对整个项目拥有无限的控制权#}",
    },
    {
        label: "{#翻译者#}",
        value: "3",
        description: "{#可以翻译内容并对现有翻译进行投票#}",
    },
    {
        label: "{#校对人#}",
        value: "4",
        description: "{#可以翻译和校对内容#}",
    },
];

export const RoleSelect = forwardRef<HTMLButtonElement, RoleSelectProps>((props, ref) => {
    const [open, setOpen] = useState(false);
    const contentRef = useRef<any>(null);
    const buttonRef = useRef<any>(null);
    const [selected, setSelected] = useState<string[]>(props.value || []);
    useDocumentClick([buttonRef, contentRef], () => {
        setOpen(false);
    });

    const onCheckedChange = (value: string, checked: boolean) => {
        let newSelected = [...selected];
        if (checked) {
            newSelected = [...selected, value]
        } else {
            newSelected = selected.filter((item) => item !== value);
        }
        setSelected(newSelected);
        props.onChange?.(newSelected);
    }

    return <DropdownMenu open={open}>
        <DropdownMenuTrigger asChild>
            <Button ref={buttonRef} variant="outline" onClick={() => setOpen(true)}>
                {
                    selected.length > 0 ? <div className={"flex justify-start items-center"}>
                        {
                            selected.map((item) => {
                                const option = ROLE_OPTIONS.find((option) => option.value === item);
                                return <span key={item} className={"mr-1"}>{option?.label}</span>;
                            })
                        }
                        <ChevronDownIcon className={"ml-1"} />
                    </div> : <div className={"text-muted-foreground flex justify-start items-center"}>
                        <span>{"{#请选择#}"}</span>
                        <ChevronDownIcon className={"ml-1"} />
                    </div>
                }
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent ref={contentRef} align={"start"} className="w-96">
            <DropdownMenuLabel>{"{#请选择角色#}"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {
                ROLE_OPTIONS.map((option) => {
                    const checked = selected.includes(option.value);
                    return <DropdownMenuItem
                        key={option.value}
                        onClick={() => onCheckedChange(option.value, !checked)}
                    >
                        <div className={"flex justify-start items-start"}>
                            <div className={"p-0.5 mr-1"}>
                                <Checkbox
                                    checked={checked}
                                    onCheckedChange={(checked: boolean) => onCheckedChange(option.value, checked)}
                                />
                            </div>
                            <div className={"flex flex-col space-y-1"}>
                                <span>{option.label}</span>
                                <span className={"text-xs text-muted-foreground"}>{option.description}</span>
                            </div>
                        </div>
                    </DropdownMenuItem>
                })
            }
        </DropdownMenuContent>
    </DropdownMenu>
});
