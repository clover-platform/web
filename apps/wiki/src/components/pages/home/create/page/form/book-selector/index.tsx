import { list } from '@/rest/book'
import type { Book } from '@/types/module/book'
import { ComboSelect, type ComboSelectOptionProps, type ComboSelectProps } from '@easykit/design'
import { debounce } from 'es-toolkit'
import { type FC, useCallback, useEffect, useMemo, useState } from 'react'

export type BookSelectorProps = ComboSelectProps

export const BookSelector: FC<BookSelectorProps> = (props) => {
  const [result, setResult] = useState<Book[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const options = useMemo<ComboSelectOptionProps<Book>[]>(() => {
    return result.map((book) => ({
      raw: book,
      value: book.path,
      label: book.name,
    }))
  }, [result])

  const onSearch = useCallback((value: string) => {
    setLoading(true)
    setResult([])
    list({
      type: 'all',
      keyword: value,
      page: 1,
      size: 100,
    }).then(({ success, data }) => {
      setLoading(false)
      if (success) {
        setResult(data?.data || [])
      } else {
        setResult([])
      }
    })
  }, [])

  const debouncedSearch = useMemo(() => debounce(onSearch, 500), [onSearch])

  useEffect(() => {
    debouncedSearch('')
  }, [debouncedSearch])

  return (
    <ComboSelect
      {...props}
      options={options}
      loading={loading}
      placeholder={'请选择'}
      className={'w-full'}
      search={true}
      filter={(value, search) => options.filter((option) => (option.label as string).includes(search)).length}
      onSearch={debouncedSearch}
    />
  )
}
