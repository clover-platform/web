import { IconButton } from "@/common/button/icon";
import classNames from "classnames";
import { useState } from "react";
import { useConfig } from "@/state";

const ICON_MAP: Record<string, string> = {
    "full": "leaf",
    "simple": "apps"
}

export const ViewController = () => {
    const [view, setView] = useState<"full" | "simple">("full");
    const { update } = useConfig();

    const changeView = () => {
        const target = view === "full" ? "simple" : "full";
        setView(target);
        update({
            view: {
                mode: target,
            }
        })
    }

    return <div className={classNames(
        "group p-1 flex justify-center items-center space-x-2",
        "absolute left-2 top-2",
        "hover:bg-black/40 rounded-md"
    )}>
        <IconButton type={ICON_MAP[view]} onClick={changeView} />
        { view === "simple" ? <IconButton type={"controls"} /> : null }
        <IconButton type={"more"} className={"opacity-0 group-hover:opacity-100"} />
    </div>
};
