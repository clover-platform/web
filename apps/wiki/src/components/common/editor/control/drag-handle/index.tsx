import {Action} from "@clover/public/components/common/action";
import {HamburgerMenuIcon, PlusIcon} from "@radix-ui/react-icons";
import { Editor } from '@tiptap/react'
import {FC, useEffect, useRef, useState} from "react";
import {NodeData} from "@/components/common/editor/control/drag-handle/use.data";
import {useContentActions} from "@/components/common/editor/control/drag-handle/use.content.actions";
import {Dropdown} from "@atom-ui/core";
import classNames from "classnames";

export type DragHandleControlProps = {
    className?: string;
    editor: Editor;
    id: string;
    data: NodeData;
}

export const DragHandleControl:FC<DragHandleControlProps> = (props) => {
    const { editor, data } = props;
    const handleRef = useRef<HTMLDivElement>(null);
    const actions = useContentActions(editor!, data.currentNode!)
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMenuOpen(false);
    }, [data.currentNode, data.hidden]);

    const actionClassName = "w-7 h-7 !p-0";
    return <div ref={handleRef} id={props.id} className={"absolute bg-black !left-0"} style={{top: -1000}}>
        <div className={"absolute -top-0.5 -right-1 pr-3 space-x-1 flex"}>
            <Action className={actionClassName} onClick={actions.handleAdd}>
                <PlusIcon />
            </Action>
            <div className={"relative"}>
                <Action
                    className={classNames(actionClassName, "relative z-1")}
                    onClick={() => setMenuOpen(true)}
                >
                    <HamburgerMenuIcon/>
                </Action>
                <Dropdown
                    modal={false}
                    open={menuOpen}
                    onOpenChange={setMenuOpen}
                    className={data.hidden ? "hidden" : ""}
                    items={[
                        {
                            label: "{#清空格式#}",
                            type: "item",
                            id: "clear-formatting",
                        },
                        {
                            label: "{#复制到剪切板#}",
                            type: "item",
                            id: "copy-to-clipboard",
                        },
                        {
                            label: "{#复制#}",
                            type: "item",
                            id: "duplicate",
                        },
                        {
                            type: "separator",
                            id: "separator"
                        },
                        {
                            label: "{#删除#}",
                            type: "item",
                            id: "delete",
                        }
                    ]}
                    align={"start"}
                    asChild={true}
                    onItemClick={(item) => {
                        if(item.id === 'clear-formatting') {
                            actions.resetTextFormatting();
                        }else if(item.id === 'copy-to-clipboard') {
                            actions.copyNodeToClipboard();
                        }else if(item.id === 'duplicate') {
                            actions.duplicateNode();
                        }else if(item.id === 'delete') {
                            actions.deleteNode();
                        }
                    }}
                >
                    <Action className={classNames(actionClassName, "absolute invisible z-0 top-0 left-0")}>
                        <HamburgerMenuIcon/>
                    </Action>
                </Dropdown>
            </div>
        </div>
    </div>
}
