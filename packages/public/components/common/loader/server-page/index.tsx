import type { RestResult } from '@clover/public/types/rest'
import type { ReactElement } from 'react'

export type ServerPageLoaderProps<P, D> = {
  loader: (params: P) => Promise<RestResult<D>>
  params: Promise<P>
  children: (props: { data: D }) => ReactElement
}

export const ServerPageLoader = async <P, D>(props: ServerPageLoaderProps<P, D>) => {
  const { loader, params, children } = props
  const p = await params
  const { success, data: d } = await loader(p)
  if (!success) {
    return <div>error</div>
  }
  return children({ data: d as D })
}