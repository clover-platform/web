'use client'

import { ControlBar } from './control-bar'
import { MainPanel } from './main'

export const ModuleWorktopPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <ControlBar />
      <MainPanel />
    </div>
  )
}
