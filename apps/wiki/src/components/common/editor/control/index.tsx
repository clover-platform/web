import {CharacterCountControl} from "@/components/common/editor/control/character-count";
import {DragHandleControl} from "@/components/common/editor/control/drag-handle";
import LinkMenu from "../../../menus/LinkMenu/LinkMenu";
import ColumnsMenu from "../extension/multi-column/menus/ColumnsMenu";
import {TableColumnMenu, TableRowMenu} from "@/components/common/editor/extension/table/menus";
import {Editor} from "@tiptap/react";
import {FC, RefObject} from "react";
import {NodeData} from "@/components/common/editor/control/drag-handle/use.data";
import {TextMenu} from "@/components/menus/TextMenu";
import ImageBlockMenu from "@/components/common/editor/extension/image-block/components/ImageBlockMenu";

export type EditorControllerProps = {
    limit?: number;
    editor: Editor | null;
    handleId: string;
    appendTo: RefObject<HTMLElement>;
    data: NodeData;
}

export const EditorController: FC<EditorControllerProps> = (props) => {
    const { limit, data, editor, handleId, appendTo } = props;
    return editor ? <>
        {limit ? <CharacterCountControl editor={editor} limit={limit} /> : null}
        <DragHandleControl data={data} editor={editor} id={handleId} />
        <LinkMenu editor={editor} appendTo={appendTo} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={appendTo} />
        <TableRowMenu editor={editor} appendTo={appendTo} />
        <TableColumnMenu editor={editor} appendTo={appendTo} />
        <ImageBlockMenu editor={editor} appendTo={appendTo} />
    </> : null;
}
