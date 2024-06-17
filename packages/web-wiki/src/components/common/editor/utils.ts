import {Editor} from '@tiptap/core'
import {RefObject} from "react";
import tippy from 'tippy.js';

export const initParagraphHandler = (ref: RefObject<HTMLDivElement>, editor: Editor) => {
    const nodes = ref.current?.getElementsByClassName("ProseMirror")[0].childNodes;
    // 遍历 nodes
    if (nodes) {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i] as HTMLElement;
            console.log(node.getAttribute("data-init-tippy"), node.getAttribute("data-init-tippy") === "true")
            if(node.getAttribute("data-init-tippy") === "true") {
                continue;
            }
            node.setAttribute("data-init-tippy", "true");
            tippy(node, {
                content: 'Click to edit',
                placement: 'bottom',
                appendTo: "parent"
            });
        }
    }
}
