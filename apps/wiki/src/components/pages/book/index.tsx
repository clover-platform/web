'use client';

import type { BookLayoutProps } from '@/components/layout/book'
import { HomeCatalog } from '@/components/pages/book/home/catalog'
import { HomeEditor } from '@/components/pages/book/home/editor'
import { HomeHeader } from '@/components/pages/book/home/header'
import type { Book } from '@/types/module/book'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { t } from '@clover/public/locale'
import { Divider } from '@easykit/design'
import { useRouter } from 'next/navigation'
import { type FC, useState } from 'react'

export type BookPageProps = {
  data?: Book
}

export const BookPage: FC<BookPageProps> = (props) => {
  useLayoutConfig<BookLayoutProps>({
    path: [
      {
        title: t('知识库'),
        type: 'item',
      },
    ],
    active: 'home',
  })
  const { data } = props
  const [editing, setEditing] = useState(false)
  const [homeContent, setHomeContent] = useState<string | undefined>(data?.homePage?.content)
  const router = useRouter()

  return (
    <div className={'space-y-4'}>
      <HomeHeader data={data} onEdit={() => setEditing(true)} />
      <HomeEditor
        path={data?.path!}
        editing={editing}
        value={homeContent!}
        onSuccess={(content) => {
          setHomeContent(content)
          setEditing(false)
        }}
        onCancel={() => setEditing(false)}
      />
      {editing ? null : <Divider orientation={'center'} />}
      <HomeCatalog />
    </div>
  )
}
