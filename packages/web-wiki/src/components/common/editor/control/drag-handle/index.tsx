import {Action} from "@clover/public/components/common/action";
import {HamburgerMenuIcon, PlusIcon} from "@radix-ui/react-icons";
import { Editor } from '@tiptap/react'
import {FC, useEffect, useRef} from "react";
import {NodeData} from "@/components/common/editor/control/drag-handle/use.data";
import {useContentActions} from "@/components/common/editor/control/drag-handle/use.content.actions";
import {Dropdown} from "@atom-ui/core";

export type DragHandleControlProps = {
    className?: string;
    editor: Editor;
    id: string;
    data: NodeData;
}

export const DragHandleControl:FC<DragHandleControlProps> = (props) => {
    const { editor, data } = props;
    const handleRef = useRef<HTMLDivElement>(null);
    const actions = useContentActions(editor!, data.currentNode, data.currentNodePos)

    const onMouseLeave = () => {
        if(handleRef.current) {
            // handleRef.current.style.top = "-1000px";
        }
    }

    useEffect(() => {
        const container = handleRef.current?.parentElement;
        container?.addEventListener("mouseleave", onMouseLeave);
        return () => {
            container?.removeEventListener("mouseleave", onMouseLeave);
        }
    }, [])

    const actionClassName = "w-7 h-7 !p-0";
    return <div ref={handleRef} id={props.id} className={"absolute bg-black !left-0"} style={{top: -1000}}>
        <div className={"absolute -top-0.5 -right-1 pr-3 space-x-2 flex"}>
            <Action className={actionClassName} onClick={actions.handleAdd}>
                <PlusIcon />
            </Action>
            <Dropdown
                items={[
                    {
                        label: "Clear formatting",
                        type: "item",
                        id: "clear-formatting",
                    },
                    {
                        label: "Copy to clipboard",
                        type: "item",
                        id: "copy-to-clipboard",
                    },
                    {
                        label: "Duplicate",
                        type: "item",
                        id: "duplicate",
                    },
                    {
                        type: "separator",
                        id: "separator"
                    },
                    {
                        label: "Delete",
                        type: "item",
                        id: "delete",
                    }
                ]}
                align={"start"}
                asChild={true}
                onItemClick={(item) => {
                    actions.resetTextFormatting();
                }}
            >
                <Action
                    className={actionClassName}>
                    <HamburgerMenuIcon/>
                </Action>
            </Dropdown>
        </div>
    </div>
}
