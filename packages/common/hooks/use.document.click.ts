import { useEffect, RefObject } from 'react';

// 定义处理函数的类型
type EventHandler = (event: MouseEvent) => void;

export function useDocumentClick(refs: RefObject<HTMLElement>[], handler: EventHandler): void {
    useEffect(() => {
        // 事件监听器
        const listener = (event: MouseEvent) => {
            // 检查点击的元素是否是任一ref的子元素
            const isInsideRefs = refs.some(ref => {
                return ref.current && ref.current.contains(event.target as Node);
            });

            // 如果点击事件不是在refs中的任何一个元素或其子元素上发生，调用handler
            if (!isInsideRefs) {
                handler(event);
            }
        };

        // 绑定click事件到document
        document.addEventListener('click', listener);

        // 组件卸载时，清除事件监听
        return () => {
            document.removeEventListener('click', listener);
        };
    }, [refs, handler]); // 当refs或handler变化时，重新绑定
}
