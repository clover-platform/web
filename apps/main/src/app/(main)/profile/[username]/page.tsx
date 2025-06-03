import { profile } from '@/rest/profile'
import { ServerPageLoader } from '@clover/public/components/common/loader/server-page'
import type { Account } from '@clover/public/types/account'
import { st } from '@clover/public/utils/locale.server'
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import { ProfilePage } from './components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st('个人资料')),
    keywords: await keywords(),
  }
}

type Params = {
  username: string
}

const Page = ({ params }: { params: Promise<Params> }) => (
  <ServerPageLoader<Params, Account> loader={(params) => profile(params.username)} params={params}>
    {({ data }) => <ProfilePage account={data} />}
  </ServerPageLoader>
)

export default Page
