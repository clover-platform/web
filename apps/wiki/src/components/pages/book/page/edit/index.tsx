'use client';

import { AiWriter } from '@/components/common/editor/ai/extensions'
import type { BookLayoutProps } from '@/components/layout/book'
import { CollectAction } from '@/components/pages/book/page/actions/collect'
import { UPDATE_TITLE } from '@/events/book'
import { save } from '@/rest/page'
import type { PageDetail, PageProps } from '@/types/module/page'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import bus from '@clover/public/events'
import { i18n, t, tt } from '@clover/public/locale'
import { Button, Input, Separator, useMessage } from '@easykit/design'
import { Editor, type EditorEvents, type EditorRef } from '@easykit/editor'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { type FC, useCallback, useEffect, useRef, useState } from 'react'

export type EditPageProps = {
  detail: PageDetail
} & PageProps

export const EditPage: FC<EditPageProps> = (props) => {
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
        title: t('编辑'),
        type: 'item',
      },
    ],
  })
  const editorRef = useRef<EditorRef>(null)
  const [value, setValue] = useState<string>(detail?.content)
  const [title, setTitle] = useState<string>(detail?.title)
  const msg = useMessage()
  const [pending, setPending] = useState<boolean>(false)
  const router = useRouter()
  const [size, setSize] = useState<number>(0)

  useEffect(() => {
    setSize(editorRef.current?.editor?.storage.characterCount.characters() || 0)
  }, [editorRef, value])

  const onCreate = useCallback(({ editor }: EditorEvents['create']) => {
    setSize(editor?.storage.characterCount.characters() || 0)
  }, [])

  const submit = useCallback(async () => {
    setPending(true)
    const html = editorRef.current?.editor?.getHTML()
    const { success, message } = await save({
      bookPath,
      id: pageId!,
      title,
      content: value,
      html: html?.replace(/\s*data-id\s*=\s*"[^"]*"/g, ''),
      newVersion: true,
    })
    setPending(false)
    if (success) {
      bus.emit(UPDATE_TITLE, {
        id: Number(pageId),
        title,
      })
      router.push(`/wiki/book/${bookPath}/page/${pageId}`)
    } else {
      msg.error(message)
    }
  }, [title, value, bookPath, pageId])

  return (
    <div className={'space-y-4'}>
      <div className={'-m-4 sticky top-[48px] z-50 flex items-center justify-center border-b bg-background px-4 py-2'}>
        <div className={'flex flex-1 items-center justify-start space-x-2'}>
          <div className={'flex items-center justify-center space-x-1'}>
            <div
              className={classNames(
                'h-6 w-6 rounded-full bg-[url(@clover/public/assets/image/default/avatar.png)] bg-center bg-contain'
              )}
            />
            <div className={'h-2 w-2 rounded-full bg-green-500'} />
            <span>{t('已连接')}</span>
          </div>
          <Separator orientation={'vertical'} className={'h-6'} />
          <span>{i18n(t('%size 字'), { size })}</span>
        </div>
        <div className={'flex space-x-2'}>
          <CollectAction collected={detail?.collected!} id={Number(pageId)} />
          <Button disabled={pending} onClick={submit} loading={pending} className={'h-8'}>
            {t('更新')}
          </Button>
        </div>
      </div>
      <div className={'mx-auto max-w-[860px] p-16 pt-4'}>
        <div className={'py-4 pb-6'}>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('请输入标题')}
            className={'m-0 h-auto rounded-none border-none p-0 font-medium text-2xl shadow-none focus-visible:ring-0'}
          />
        </div>
        <Editor
          ref={editorRef}
          value={value}
          onChange={setValue}
          onCreate={onCreate}
          extensions={[AiWriter]}
          slashCommandProps={{
            groups: [
              {
                name: 'ai',
                title: 'AI',
                position: 'start',
                commands: [
                  {
                    name: 'aiWriter',
                    label: tt('生成文本'),
                    iconName: 'Sparkles',
                    description: tt('使用 AI 生成文本'),
                    shouldBeHidden: (editor) => editor.isActive('columns'),
                    action: (editor) => editor.chain().focus().setAiWriter().run(),
                  },
                ],
              },
            ],
          }}
        />
      </div>
    </div>
  )
}
