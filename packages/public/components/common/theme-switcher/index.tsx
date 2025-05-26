import {IconDark, IconLight, IconSystem} from "@arco-iconbox/react-clover";
import classNames from 'classnames'
import {useTheme} from "next-themes";
import { type FC, useEffect, useState } from 'react'

export type Theme = {
  name: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  icon: any
}

const themes: Theme[] = [
  {
    name: 'light',
    icon: IconLight,
  },
  {
    name: 'system',
    icon: IconSystem,
  },
  {
    name: 'dark',
    icon: IconDark,
  },
]

const BUTTON_SIZE = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10"
}

const CONTAINER_SIZE = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12"
}

const ICON_SIZE = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg"
}

export type ThemeSwitcherProps = {
  size?: "sm" | "md" | "lg";
  activeClassName?: string;
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
  const [mounted, setMounted] = useState(false)
  const {theme, setTheme} = useTheme();
  const {size = "md", activeClassName = "bg-secondary"} = props;

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={classNames('flex items-center rounded-full border px-1', CONTAINER_SIZE[size], props.className)}
      key={`switcher-${mounted}`}
    >
      {themes.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.name}
            className={classNames(
              BUTTON_SIZE[size],
              'flex cursor-pointer items-center justify-center rounded-full',
              theme === item.name ? activeClassName : ''
            )}
            onClick={() => setTheme(item.name)}
            suppressHydrationWarning={true}
          >
            <Icon className={ICON_SIZE[size]} />
          </div>
        )
      })}
    </div>
  )
}
