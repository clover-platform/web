import { IconBranch, IconHelp, IconProject, IconTranslation } from '@arco-iconbox/react-clover'
import { Action } from '@clover/public/components/common/action'
import { Separator, Sheet, SheetContent, SheetDescription, SheetTitle } from '@easykit/design'
import { type FC, type ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MenuFileSheet } from './file'
import { MenuHelpSheet } from './help'
import { MenuLanguageSheet } from './language'
import { MenuProjectSheet } from './project'

export type MenuItemProps = {
  icon: ReactNode
  label: ReactNode
  active?: boolean
  onClick?: () => void
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  return (
    <Action
      onClick={props.onClick}
      active={props.active}
      className="!px-1 !py-0.5 flex w-full items-center justify-start"
    >
      <div className="flex h-8 w-9 items-center justify-center">{props.icon}</div>
      <div className="flex-1 text-left">{props.label}</div>
    </Action>
  )
}

export type MenuSheetProps = {
  active?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const MenuSheet: FC<MenuSheetProps> = (props) => {
  const [active, setActive] = useState(props.active)
  const { t } = useTranslation()

  useEffect(() => {
    setActive(props.active)
  }, [props.active])

  return (
    <Sheet {...props}>
      <SheetContent side="left" className="flex w-96 flex-row gap-0 p-0">
        <SheetTitle />
        <SheetDescription />
        <button type="button" />
        <div className="w-36 flex-shrink-0 space-y-1 border-r p-2">
          <MenuItem
            active={active === 'project'}
            onClick={() => setActive('project')}
            icon={<IconProject className="text-lg" />}
            label={t('项目')}
          />
          <MenuItem
            active={active === 'language'}
            onClick={() => setActive('language')}
            icon={<IconTranslation className="text-lg" />}
            label={t('语言')}
          />
          <MenuItem
            active={active === 'file'}
            onClick={() => setActive('file')}
            icon={<IconBranch className="text-lg" />}
            label={t('文件')}
          />
          <Separator className="my-1" />
          <MenuItem
            active={active === 'help'}
            onClick={() => setActive('help')}
            icon={<IconHelp className="text-lg" />}
            label={t('帮助')}
          />
        </div>
        <div className="flex-grow p-4">
          {active === 'project' && <MenuProjectSheet />}
          {active === 'language' && <MenuLanguageSheet />}
          {active === 'file' && <MenuFileSheet />}
          {active === 'help' && <MenuHelpSheet />}
        </div>
      </SheetContent>
    </Sheet>
  )
}
