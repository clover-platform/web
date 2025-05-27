import { EntryPanel } from '@/components/pages/worktop/main/panel/entry'
import { PluginPanel } from '@/components/pages/worktop/main/panel/plugin'
import { ResultPanel } from '@/components/pages/worktop/main/panel/result'
import { leftSideOpenState, rightSideOpenState } from '@/state/worktop'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@easykit/design'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import type { ImperativePanelHandle } from 'react-resizable-panels'

export const MainPanel = () => {
  const [leftSideOpen, setLeftSideOpen] = useAtom(leftSideOpenState)
  const [rightSideOpen, setRightSideOpen] = useAtom(rightSideOpenState)
  const leftRef = useRef<ImperativePanelHandle>(null)
  const rightRef = useRef<ImperativePanelHandle>(null)

  useEffect(() => {
    if (leftSideOpen) {
      leftRef.current?.expand()
    } else {
      leftRef.current?.collapse()
    }
  }, [leftSideOpen])

  useEffect(() => {
    if (rightSideOpen) {
      rightRef.current?.expand()
    } else {
      rightRef.current?.collapse()
    }
  }, [rightSideOpen])

  return (
    <div className="h-0 w-full flex-1 flex-shrink-0">
      <ResizablePanelGroup direction="horizontal" autoSaveId="module.worktop">
        <ResizablePanel
          className={classNames(leftSideOpen ? 'shadow-md' : 'hidden')}
          collapsible={true}
          ref={leftRef}
          defaultSize={30}
          onCollapse={() => setLeftSideOpen(false)}
          onExpand={() => setLeftSideOpen(true)}
        >
          <EntryPanel />
        </ResizablePanel>
        <ResizableHandle className={leftSideOpen ? '' : 'hidden'} />
        <ResizablePanel defaultSize={40}>
          <ResultPanel />
        </ResizablePanel>
        <ResizableHandle className={rightSideOpen ? '' : 'hidden'} />
        <ResizablePanel
          className={classNames(rightSideOpen ? 'shadow-md' : 'hidden')}
          collapsible={true}
          ref={rightRef}
          defaultSize={30}
          onCollapse={() => setRightSideOpen(false)}
          onExpand={() => setRightSideOpen(true)}
        >
          <PluginPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
