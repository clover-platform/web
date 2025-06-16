'use client';

import type { BookLayoutProps } from '@/components/layout/book'
import { getTabs } from '@/config/pages/book/setting'
import type { Book } from '@/types/module/book'
import { TabsTitle } from '@clover/public/components/common/tabs-title'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { t } from '@clover/public/locale'
import { useParams } from 'next/navigation'
import { type FC, useState } from 'react'

export type BookSettingPageProps = {
  data?: Book
}

export const BookSettingPage: FC<BookSettingPageProps> = (props) => {
  const { data } = props
  const params = useParams()
  const { bookPath } = params
  useLayoutConfig<BookLayoutProps>({
    path: [
      {
        title: t('知识库'),
        type: 'link',
        href: `/wiki/book/${bookPath}`,
      },
      {
        title: t('设置'),
        type: 'item',
      },
    ],
  })
  const [active, setActive] = useState('setting')

  return (
    <div>
      <TabsTitle active={active} items={getTabs()} onChange={setActive} />
    </div>
  )
}
