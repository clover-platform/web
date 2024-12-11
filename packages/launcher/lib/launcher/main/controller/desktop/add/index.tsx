import { Popover, PopoverTrigger, useOutside } from "@easykit/design";
import { Icon } from "@clover/launcher/common/icon";
import { useRef, useState } from "react";
import classNames from "classnames";

export const AddDesktop = () => {
    const [open, setOpen] = useState(false);
    const contentRef = useRef(null);
    const triggerRef = useRef(null);
    useOutside(() => {
        open && setOpen(false);
    }, [contentRef, triggerRef]);

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <div ref={triggerRef} className={"leading-none flex justify-center items-center group cursor-pointer w-[36px] h-[36px]"}>
                <Icon className={"!text-[28px] text-white/70 group-hover:text-white"} type={"plus"} />
            </div>
        </PopoverTrigger>
        <div ref={contentRef} className={classNames(!open && "hidden")}>
            test
        </div>
    </Popover>;
};
