import { DashboardPage } from './components'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { st } from '@clover/public/utils/locale.server'
import { getQueryClient } from '@clover/public/utils/query'
import { keywords, title } from '@clover/public/utils/seo'
import { dashboard } from '@/rest/module'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st('概览')),
    keywords: await keywords(),
  }
}

export type Params = {
  module: string
}

const Page = async ({ params }: { params: Promise<Params> }) => {
  const { module } = await params
  const client = getQueryClient()
  await client.prefetchQuery({
    queryKey: ['module:dashboard', module],
    queryFn: ({ queryKey }) => dashboard(queryKey[1]),
  })
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <DashboardPage />
    </HydrationBoundary>
  )
}

export default Page
