import 'flag-icons/css/flag-icons.min.css'

import type { FC } from 'react'

export type FlagIconProps = {
  code: string
  className?: string
}

export const FlagIcon: FC<FlagIconProps> = (props) => {
  const { code, className } = props
  return <i className={`fi fi-${code} ${className}`} />
}
