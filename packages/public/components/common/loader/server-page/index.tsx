
import { getQueryClient } from '@clover/public/utils/query'
import { HydrationBoundary, type QueryClient, dehydrate } from '@tanstack/react-query'
import type { ReactElement } from 'react'

export type ServerPageLoaderProps<P> = {
  loader: (client: QueryClient, params: P) => Promise<boolean>
  params: Promise<P>
  children: ReactElement
}

export const ServerPageLoader = async <P,>(props: ServerPageLoaderProps<P>) => {
  const { loader, params, children } = props
  const p = await params
  const queryClient = getQueryClient()
  const success = await loader(queryClient, p)
  if (!success) {
    return <div>error</div>
  }
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}