import { ResolvedPos } from '@tiptap/pm/model'
import { NodeSelection } from '@tiptap/pm/state'
import { Editor } from '@tiptap/react'
import { useCallback } from 'react'

export const useContentActions = (editor: Editor, currentResolvedPos: ResolvedPos) => {
    const currentNode = currentResolvedPos?.node();
    const currentNodePos = currentResolvedPos?.depth === 0 ? currentResolvedPos?.pos : currentResolvedPos?.before();

    const resetTextFormatting = useCallback(() => {
        const chain = editor.chain()

        chain.setNodeSelection(currentNodePos).unsetAllMarks()

        if (currentNode?.type.name !== 'paragraph') {
            chain.setParagraph()
        }

        chain.run()
    }, [editor, currentNodePos, currentNode?.type.name])

    const duplicateNode = useCallback(() => {
        editor.commands.setNodeSelection(currentNodePos)

        const { $anchor } = editor.state.selection
        const selectedNode = $anchor.node(1) || (editor.state.selection as NodeSelection).node

        editor
            .chain()
            .setMeta('hideDragHandle', true)
            .insertContentAt(currentNodePos + (currentNode?.nodeSize || 0), selectedNode.toJSON())
            .run()
    }, [editor, currentNodePos, currentNode?.nodeSize])

    const copyNodeToClipboard = useCallback(() => {
        editor.chain().setMeta('hideDragHandle', true).setNodeSelection(currentNodePos).run()

        document.execCommand('copy')
    }, [editor, currentNodePos])

    const deleteNode = useCallback(() => {
        editor.chain().setMeta('hideDragHandle', true).setNodeSelection(currentNodePos).deleteSelection().run()
    }, [editor, currentNodePos])

    const handleAdd = useCallback(() => {
        const nodePos = currentResolvedPos?.depth == 0 ? currentResolvedPos.pos + 1 : currentResolvedPos.after(1);
        const insertPos = nodePos;
        const currentNodeIsEmptyParagraph = currentResolvedPos?.depth === 1 && currentNode?.type.name === 'paragraph' && currentNode?.content?.size === 0
        const focusPos = currentNodeIsEmptyParagraph ? nodePos : nodePos + 2;

        editor
            .chain()
            .command(({ dispatch, tr, state }) => {
                if (dispatch) {
                    if (currentNodeIsEmptyParagraph) {
                        tr.insertText('/', currentResolvedPos.pos, currentResolvedPos.pos + 1)
                    } else {
                        tr.insert(insertPos, state.schema.nodes.paragraph.create(null, [state.schema.text('/')]))
                    }
                    return dispatch(tr)
                }
                return true
            })
            .focus(focusPos)
            .run()
    }, [currentNode, currentNodePos, editor])

    return {
        resetTextFormatting,
        duplicateNode,
        copyNodeToClipboard,
        deleteNode,
        handleAdd,
    }
}
