import { FlagIcon } from '@/components/common/flag-icon'
import { COUNTRIES } from "@/components/common/flag-icon/config";
import classNames from "classnames";
import type { FC } from 'react'

export type LanguageIconProps = {
  code: string
  className?: string
}

export const LanguageIcon: FC<LanguageIconProps> = (props) => {
  const { code } = props;
  const area = (code.split("-")[1] || code).toLowerCase();
  const inCountries = !!COUNTRIES.find((item) => item.code === area);
  return (
    <div
      className={classNames(
        'flex items-center justify-center overflow-hidden rounded-sm',
        'h-6 w-8 bg-muted',
        props.className
      )}
    >
      {inCountries ? (
        <FlagIcon code={area} className="!w-full !h-full" />
      ) : (
        <span className="font-bold text-muted-foreground leading-none">{code}</span>
      )}
    </div>
  )
}
