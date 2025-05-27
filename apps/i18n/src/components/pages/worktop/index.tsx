'use client';

import { ControlBar } from "@/components/pages/worktop/control-bar";
import { MainPanel } from "@/components/pages/worktop/main";

export const ModuleWorktopPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <ControlBar />
      <MainPanel />
    </div>
  )
}
