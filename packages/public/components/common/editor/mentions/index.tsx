import classNames from 'classnames'
import { type FC, type Ref, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Tribute from 'tributejs'
import './index.scss'
import { htmlEscape } from '@clover/public/components/common/editor/mentions/tools'
import { useTranslation } from 'react-i18next'

export type CommentEditorProps = {
  className?: string
  value?: string
  onChange?: (value: string) => void
  ref?: Ref<{
    reset: () => void
  }>
}

export const MentionsEditor: FC<CommentEditorProps> = ({ ref, ...props }) => {
  const { value, onChange } = props
  const { t } = useTranslation()
  const [atList] = useState([
    {
      key: '1',
      value: '小明',
      position: '前端开发工程师',
    },
    {
      key: '2',
      value: '小李',
      position: '后端开发工程师',
    },
  ])
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const editorRef = useRef<any>(undefined)

  const onInput = useCallback(() => {
    const html = editorRef.current?.innerHTML
    onChange?.(htmlEscape(html))
  }, [onChange])

  useEffect(() => {
    const tributeMultipleTriggers = new Tribute({
      allowSpaces: true,
      noMatchTemplate: () => '',
      collection: [
        {
          trigger: '@',
          values: atList,
          lookup: 'name',
          fillAttr: 'name',
          selectTemplate: (item) => `@${item.original?.value}`,
          menuItemTemplate: (item) => item.original.value,
        },
      ],
    })
    tributeMultipleTriggers.attach(editorRef.current)
    editorRef.current.innerHTML = value || ''
  }, [atList, value])

  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        editorRef.current.innerHTML = ''
        onInput()
      },
    }),
    [onInput]
  )

  return (
    <div
      onInput={onInput}
      ref={editorRef}
      data-tip={t('输入 @ 以提及其他人')}
      className={classNames('comment-editor', 'max-h-32 min-h-20 p-2 outline-none', props.className)}
    />
  )
}
