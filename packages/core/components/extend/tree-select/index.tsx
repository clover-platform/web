import {Popover, PopoverContent, PopoverTrigger} from "@clover/core/components/ui/popover";
import { FC, forwardRef, PropsWithRef, useEffect, useMemo, useRef, useState } from "react";
import {cn} from "@clover/core/lib/utils";
import { Button } from "@clover/core/components/ui/button";
import {useSize} from "@clover/core/components/hooks/resize";
import {Tree, TreeProps} from "@clover/core/components/extend/tree";
import { findNodeById, initExpansion } from "@clover/core/components/extend/tree/utils";
import {Spin} from "@clover/core/components/extend/spin";

export interface TreeSelectProps extends PropsWithRef<TreeProps>{
    className?: string;
    loading?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
}

export const TreeSelect: FC<TreeSelectProps> = forwardRef((props, ref) => {
    const {
        className,
        loading,
        items,
        value,
        onChange = (v: string) => {},
        placeholder = "Please select"
    } = props;

    const initValue = `${value || ''}`;
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    const size = useSize(containerRef);
    const [expansion, setExpansion] = useState(initExpansion(items, initValue));
    const [selected, setSelected] = useState(initValue);
    const node = useMemo(() => findNodeById(items, selected), [selected, items])

    useEffect(() => {
        setExpansion(initExpansion(items, initValue));
    }, [items]);

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                ref={containerRef}
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                    "justify-between min-w-[150px] items-center h-10",
                    className,
                )}
                disabled={loading}
            >
                { loading ? <Spin /> : (node ? node.content.label : placeholder) }
            </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 max-h-[300px] overflow-auto" style={{width: size.width}}>
            <Tree
                border={false}
                items={items}
                onExpandedChange={setExpansion}
                expanded={expansion}
                selected={selected}
                onSelectedChange={(id) => {
                    setSelected(id);
                    onChange(id);
                    id && setOpen(false);
                }}
            />
        </PopoverContent>
    </Popover>
})
