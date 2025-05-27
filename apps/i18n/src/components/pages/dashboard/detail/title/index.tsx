import type { FC, PropsWithChildren } from 'react'

export type DetailTitleProps = PropsWithChildren<{
  title: string;
}>


export const DetailTitle: FC<DetailTitleProps> = (props) => {
  return (
    <div className="mb-4 flex items-center justify-center">
      <div className="flex-1 font-medium text-lg">{props.title}</div>
      <div className="text-muted-foreground">{props.children}</div>
    </div>
  )
}
