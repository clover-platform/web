import { Node } from '@tiptap/pm/model'
import { Editor } from '@tiptap/core'
import { useCallback, useState } from 'react'

export type NodeChangeData = {
    node: Node | null; editor: Editor; pos: number
}

export type NodeData = {
    currentNode: Node | null;
    currentNodePos: number;
    handleNodeChange: (data: NodeChangeData) => void;
}

export const useData = (): NodeData => {
    const [currentNode, setCurrentNode] = useState<Node | null>(null)
    const [currentNodePos, setCurrentNodePos] = useState<number>(-1)

    const handleNodeChange = useCallback((data: NodeChangeData) => {
            if (data.node) {
                setCurrentNode(data.node)
            }
            setCurrentNodePos(data.pos)
        },
        [setCurrentNodePos, setCurrentNode],
    )

    return {
        currentNode,
        currentNodePos,
        handleNodeChange,
    }
}
