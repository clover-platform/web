import {PropsWithChildren, FC, ReactNode} from "react";
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@clover/core/components/ui/dropdown-menu"
import {cn} from "@clover/core/lib/utils";
import {Align} from "@radix-ui/react-popper";

export type onDropdownMenuClick = (item: DropdownMenuItemProps) => void;
export type onCheckedChange = (item: DropdownMenuItemProps, checked: boolean) => void;

export interface DropdownMenuItemProps {
    label?: ReactNode;
    id: string;
    type: "label" | "separator" | "item" | "checkbox";
    checked?: boolean;
    shortcut?: string;
    disabled?: boolean;
    children?: DropdownMenuItemProps[];
    onItemClick?: onDropdownMenuClick;
    onCheckedChange?: onCheckedChange;
}

export interface DropdownProps extends PropsWithChildren {
    items?: DropdownMenuItemProps[];
    className?: string;
    onItemClick?: onDropdownMenuClick;
    onCheckedChange?: onCheckedChange;
    align?: Align;
}

type Callback = {
    onItemClick?: onDropdownMenuClick;
    onCheckedChange?: onCheckedChange;
}

const renderItem = (item: DropdownMenuItemProps, call: Callback) => {
    const clickCall = item.onItemClick || call.onItemClick;
    const checkedCall = item.onCheckedChange || call.onCheckedChange;
    if (item.type === "label") {
        return <DropdownMenuLabel key={item.id}>{ item.label }</DropdownMenuLabel>
    } else if (item.type === "separator") {
        return <DropdownMenuSeparator key={item.id} />
    } else if(item.type === "checkbox") {
        return <DropdownMenuCheckboxItem
            key={item.id}
            className="capitalize"
            checked={item.checked}
            onCheckedChange={(value) => checkedCall(item, value)}
        >
            {item.label}
        </DropdownMenuCheckboxItem>
    } else {
        if(item.children && item.children.length) {
            return <DropdownMenuSub key={item.id}>
                <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        { item.children.map((child) => renderItem(child, call)) }
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
        }else {
            return <DropdownMenuItem onClick={() => clickCall(item)} key={item.id} disabled={item.disabled}>
                { item.label }
                { item.shortcut && <DropdownMenuShortcut>{ item.shortcut }</DropdownMenuShortcut> }
            </DropdownMenuItem>
        }
    }
}

export const Dropdown: FC<DropdownProps> = (props) => {
    const {
        items = [],
        onItemClick = () => {},
        onCheckedChange = () => {},
        align
    } = props;
    return <DropdownMenu>
        <DropdownMenuTrigger>
            { props.children }
        </DropdownMenuTrigger>
        <DropdownMenuContent
            align={align}
            className={cn(
                "w-48",
                props.className
            )}
        >
            { items.map((child) => renderItem(child, {onItemClick, onCheckedChange})) }
        </DropdownMenuContent>
    </DropdownMenu>;
}
