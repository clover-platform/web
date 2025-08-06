import { useEffect, useRef } from 'react'

/**
 * 监听页面可见性变化的 Hook
 * @param callback 当页面可见性发生变化时调用的回调函数
 */
export function useVisibilityChange(callback: (isVisible: boolean) => void) {
  const callbackRef = useRef(callback)

  // 保持回调函数的最新引用
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden
      callbackRef.current(isVisible)
    }

    // 添加事件监听器
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // 清理函数：移除事件监听器
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])
}
