import type { FC, ReactNode } from 'react'

export type IconTitleProps = {
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
}

export const IconTitle: FC<IconTitleProps> = (props) => {
  return (
    <div className="flex items-start justify-start">
      <div className="flex h-14 w-20 items-center justify-center">{props.icon}</div>
      <div className="flex-1">
        <div className="font-bold text-lg text-primary">{props.title}</div>
        <div className="mt-1 text-muted-foreground">{props.description}</div>
      </div>
    </div>
  )
}
