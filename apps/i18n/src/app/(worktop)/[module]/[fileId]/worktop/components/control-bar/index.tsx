import { ENTRY_RELOAD } from '@/events/worktop'
import { sync as syncAll } from '@/rest/entry'
import {
  countState,
  currentFileState,
  currentLanguageState,
  leftSideOpenState,
  rightSideOpenState,
} from '@/state/worktop'
import {
  IconBack,
  IconChatGPT,
  IconLeftSidebar,
  IconMenu,
  IconRightSidebar,
  IconSetting,
} from '@arco-iconbox/react-clover'
import { Action } from '@clover/public/components/common/action'
import { ThemeSwitcher } from '@clover/public/components/common/theme-switcher'
import bus from '@clover/public/events'
import { Progress, Separator, Spin, Tooltip, useMessage } from '@easykit/design'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FileAction } from './action/file'
import { LanguageAction } from './action/language'
import { MenuSheet } from './menu-sheet'

export const ControlBar = () => {
  const { module } = useParams()
  const router = useRouter()
  const [leftSideOpen, setLeftSideOpen] = useAtom(leftSideOpenState)
  const [rightSideOpen, setRightSideOpen] = useAtom(rightSideOpenState)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuActive, setMenuActive] = useState('project')
  const [count] = useAtom(countState)
  const [currentLanguage] = useAtom(currentLanguageState)
  const [currentFile] = useAtom(currentFileState)
  const msg = useMessage()
  const [syncing, setSyncing] = useState(false)
  const { t } = useTranslation()

  const showMenu = () => {
    setMenuActive('project')
    setMenuOpen(true)
  }

  const showMenuByLanguage = () => {
    setMenuActive('language')
    setMenuOpen(true)
  }

  const showMenuByFile = () => {
    setMenuActive('file')
    setMenuOpen(true)
  }

  const refresh = () => {
    bus.emit(ENTRY_RELOAD)
  }

  const sync = useCallback(async () => {
    const params = {
      file: currentFile,
      module: module as string,
      language: currentLanguage,
    }
    setSyncing(true)
    const { success, message } = await syncAll(params)
    setSyncing(false)
    if (!success) {
      msg.error(message)
    }
  }, [currentFile, module, currentLanguage, msg])

  return (
    <div className="sticky top-0 w-full">
      <div className="border-b">
        <Progress
          style={{ width: `${Math.ceil((count.translated / count.total) * 100)}%` }}
          value={Math.ceil((count.verified / count.translated) * 100)}
          className="h-1 rounded-none"
        />
      </div>
      <div className="flex items-center justify-center border-b px-2 py-1 shadow-sm">
        <div className="flex flex-1 items-center justify-start space-x-1">
          <Action className="!px-1.5 h-8 w-8" onClick={() => router.push(`/${module}/dashboard`)}>
            <IconBack className="text-lg" />
          </Action>
          <Action className="!px-1.5 h-8 w-8" onClick={showMenu}>
            <IconMenu className="text-lg" />
          </Action>
          <Separator orientation="vertical" className="h-5" />
          <LanguageAction onClick={showMenuByLanguage} />
          <FileAction onClick={showMenuByFile} />
          <Separator orientation="vertical" className="h-5" />
          <Tooltip content={t('刷新')}>
            <Action className="!px-1.5 h-8 w-8" onClick={refresh}>
              <ReloadIcon className="text-lg" />
            </Action>
          </Tooltip>
          <Tooltip content={t('AI分析')}>
            <Action className="!px-1.5 h-8 w-8" onClick={sync}>
              {syncing ? <Spin className="text-lg" /> : <IconChatGPT className="text-lg" />}
            </Action>
          </Tooltip>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-1">
          <Action onClick={() => setLeftSideOpen(!leftSideOpen)} active={leftSideOpen} className="!px-1.5 h-8 w-8">
            <IconLeftSidebar className="text-lg" />
          </Action>
          <Action onClick={() => setRightSideOpen(!rightSideOpen)} active={rightSideOpen} className="!px-1.5 h-8 w-8">
            <IconRightSidebar className="text-lg" />
          </Action>
          <Separator orientation="vertical" className="h-5" />
          <Action className="!px-1.5 h-8 w-8">
            <IconSetting className="text-lg" />
          </Action>
          <ThemeSwitcher size="sm" activeClassName="bg-[rgba(31,30,36,0.08)] dark:bg-secondary" />
        </div>
      </div>
      <MenuSheet active={menuActive} open={menuOpen} onOpenChange={setMenuOpen} />
    </div>
  )
}
