import React, {useMemo, forwardRef, PropsWithChildren} from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import {renderElement, renderLeaf, renderToolbarItem, toggleMark} from "./utils";
import {HOTKEYS, HOTKEYS_TYPE, TOOLBARS} from "./config";
import "github-markdown-css/github-markdown.css";

export type HTMLEditorProps = {
    value?: any,
    placeholder?: string,
    onChange?: (value: any) => void,
} & PropsWithChildren;

const initValue = [{
    type: 'paragraph',
    children: [{text: ''}],
}];

export const HTMLEditor = forwardRef<HTMLDivElement, HTMLEditorProps>((props, ref) => {
    const {
        placeholder,
        value,
        onChange = (v) => {},
    } = props;
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const initialValue = useMemo(() => value || initValue, [value]);

    return <div ref={ref} className={"border rounded-md shadow-sm overflow-hidden"}>
        <Slate
            editor={editor}
            initialValue={initialValue}
            onValueChange={onChange}
        >
            <div className={"flex justify-start items-center p-1 border-b-[1px] space-x-1"}>
                { TOOLBARS.map(renderToolbarItem) }
            </div>
            <div className={"p-2 markdown-body pb-0 !-mb-2"}>
                <Editable
                    className={"focus-visible:outline-none"}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder={placeholder}
                    spellCheck
                    autoFocus
                    onKeyDown={event => {
                        for (const hotkey in HOTKEYS) {
                            if (isHotkey(hotkey, event as any)) {
                                event.preventDefault()
                                const mark = HOTKEYS[hotkey as keyof HOTKEYS_TYPE];
                                toggleMark(editor, mark)
                            }
                        }
                    }}
                />
            </div>
        </Slate>
    </div>
})
