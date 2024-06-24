import {ResolvedPos} from '@tiptap/pm/model'
import { useCallback, useState } from 'react'

export type NodeData = {
    currentNode?: ResolvedPos;
    handleNodeChange: (node: ResolvedPos) => void;
    setHidden: (hidden: boolean) => void;
    hidden: boolean;
}

export const useData = (): NodeData => {
    const [currentNode, setCurrentNode] = useState<ResolvedPos>();
    const [hidden, setHidden] = useState(false);

    const handleNodeChange = useCallback((node: ResolvedPos) => {
        setCurrentNode(node)
    }, [setCurrentNode],)

    return {
        currentNode,
        handleNodeChange,
        setHidden,
        hidden
    }
}
