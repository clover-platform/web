import { Popover, PopoverTrigger, useOutside } from "@atom-ui/core";
import { Icon } from "@/common/icon";
import { useRef, useState } from "react";
import classNames from "classnames";

export const AddDesktop = () => {
    const [open, setOpen] = useState(false);
    const contentRef = useRef();
    const triggerRef = useRef();
    useOutside(() => {
        open && setOpen(false);
    }, [contentRef, triggerRef]);

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <div ref={triggerRef} className={"leading-none flex justify-center items-center group cursor-pointer"}>
                <Icon className={"!text-[36px] text-white/70 group-hover:text-white"} type={"plus"} />
            </div>
        </PopoverTrigger>
        <div ref={contentRef} className={classNames(!open && "hidden")}>
            test
        </div>
    </Popover>;
};
