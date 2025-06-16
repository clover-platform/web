'use client';

import type { BookLayoutProps } from '@/components/layout/book'
import { CollectAction } from '@/components/pages/book/page/actions/collect'
import { save } from '@/rest/page'
import type { PageDetail, PageProps } from '@/types/module/page'
import { Action } from '@clover/public/components/common/action'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useTimeAgo } from '@clover/public/hooks/use.time.ago'
import { i18n } from '@clover/public/locale'
import { t } from '@clover/public/locale'
import type { RestResult } from '@clover/public/types/rest'
import type { AbortPromise } from '@clover/public/utils/rest'
import { useMessage } from '@easykit/design'
import { ContentViewer } from '@easykit/editor'
import { Pencil1Icon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { type FC, useCallback, useMemo, useRef } from 'react'

export type DetailPageProps = {
  detail: PageDetail
} & PageProps

export const DetailPage: FC<DetailPageProps> = (props) => {
  const { detail } = props
  const { bookPath, pageId } = props.params
  useLayoutConfig<BookLayoutProps>({
    path: [
      {
        title: t('知识库'),
        type: 'link',
        href: `/wiki/book/${bookPath}`,
      },
      {
        title: t('详情'),
        type: 'item',
      },
    ],
  })
  const msg = useMessage()
  const saveHandler = useRef<AbortPromise<RestResult<any>>>(undefined)
  const timeAgo = useTimeAgo()
  const router = useRouter()

  const onChange = useCallback(
    async (json: string) => {
      saveHandler.current?.abort()
      saveHandler.current = save({
        bookPath: bookPath as string,
        id: pageId!,
        title: detail?.title!,
        content: json,
        newVersion: false,
      })
      const res = await saveHandler.current
      const { success, message } = res
      if (!success && message !== 'ERR_CANCELED') {
        msg.error(message)
      }
    },
    [bookPath, pageId, detail, saveHandler]
  )

  const lastAuthor = useMemo(() => {
    const { userList, updateUser } = detail || {}
    const user = userList?.find(({ userId }) => userId === updateUser)
    return user?.account
  }, [detail])

  return (
    <div className={'space-y-4'}>
      <div className={'-m-4 sticky top-[48px] z-50 flex items-center justify-center border-b bg-background px-4 py-2'}>
        <div className={'flex flex-1 items-center justify-start space-x-2'}>
          <div className={'flex items-center justify-center space-x-2'}>
            <div
              className={classNames(
                'h-6 w-6 rounded-full bg-[url(@clover/public/assets/image/default/avatar.png)] bg-center bg-contain'
              )}
            />
            <div className={'text-secondary-foreground/70'}>
              <div>
                {i18n(t('由 %author 最后更新于 %time'), {
                  author: lastAuthor?.username,
                  time: detail?.updateTime ? timeAgo.format(new Date(detail?.updateTime!)) : '--',
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={'flex space-x-2'}>
          <CollectAction id={Number(pageId)} collected={detail?.collected!} />
          <Action
            onClick={() => {
              router.push(`/wiki/book/${bookPath}/page/${pageId}/edit`)
            }}
          >
            <Pencil1Icon />
          </Action>
        </div>
      </div>
      <div className={'mx-auto max-w-[860px] p-16 pt-4'}>
        <div className={'py-4 pb-6 font-medium text-2xl'}>{detail?.title}</div>
        <ContentViewer onChange={onChange} value={detail?.content} />
      </div>
    </div>
  )
}
