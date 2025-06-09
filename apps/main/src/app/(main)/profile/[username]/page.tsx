
import { st } from '@clover/public/utils/locale.server'
import { getQueryClient } from '@clover/public/utils/query'
import { keywords, title } from '@clover/public/utils/seo'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { ProfilePage } from './components'
import { profile } from './components/rest'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st('个人资料')),
    keywords: await keywords(),
  }
}

type Params = {
  username: string
}

const Page = async ({ params }: { params: Promise<Params> }) => {
  const client = getQueryClient()
  const { username } = await params
  await client.prefetchQuery({
    queryKey: ['profile', username],
    queryFn: ({ queryKey }) => profile(queryKey[1]),
  })
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <ProfilePage />
    </HydrationBoundary>
  )
}

export default Page
