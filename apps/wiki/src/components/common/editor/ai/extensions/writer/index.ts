import { Node, ReactNodeViewRenderer } from '@tiptap/react'
import { AiWriterView } from './view/AiWriterView'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        imageUpload: {
            setAiWriter: () => ReturnType
        }
    }
}

export const AiWriter = Node.create({
    name: 'AiWriter',

    isolating: true,

    defining: true,

    group: 'block',

    draggable: true,

    selectable: false,

    inline: false,

    parseHTML() {
        return [
            {
                tag: `div[data-type="${this.name}"]`,
            },
        ]
    },

    renderHTML() {
        return ['div', { 'data-type': this.name }]
    },

    addCommands() {
        return {
            setAiWriter:
                () =>
                    ({ commands }) =>
                        commands.insertContent(`<div data-type="${this.name}"></div>`),
        }
    },

    addNodeView() {
        return ReactNodeViewRenderer(AiWriterView)
    },
})

export default AiWriter
