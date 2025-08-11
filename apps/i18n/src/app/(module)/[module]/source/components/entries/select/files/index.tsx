import { type FC, useCallback, useEffect, useMemo, useState } from 'react'
import { ComboSelect, type ComboSelectOptionProps, type ComboSelectProps } from '@easykit/design'
import classNames from 'classnames'
import { debounce } from 'es-toolkit'
import { useTranslation } from 'react-i18next'
import { FileName } from '@/components/common/file-name'
import { useModule } from '@/hooks'
import { searchFile } from '@/rest/source'
import type { File } from '@/types/module/source'

export type FilesSelectProps = ComboSelectProps<File> & {
  className?: string
}

export const FilesSelect: FC<FilesSelectProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const m = useModule()
  const [result, setResult] = useState<ComboSelectOptionProps<File>[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [initLoading, setInitLoading] = useState<boolean>(true)

  const onSearch = useCallback(
    debounce(async (value: string) => {
      const { success, data } = await searchFile({ module: m, keyword: value })
      if (success) {
        setInitLoading(false)
        setResult(
          data?.data?.map((item) => ({
            label: <FileName file={item} iconClassName="size-4" />,
            value: `${item.id}`,
            raw: item,
          })) ?? []
        )
      } else {
        setResult([])
      }
      setLoading(false)
    }, 500),
    []
  )

  useEffect(() => {
    onSearch('')
  }, [onSearch])

  const options = useMemo(() => {
    return result
  }, [result])

  return (
    <ComboSelect
      {...props}
      className={classNames('min-w-[180px]', className)}
      filter={(_value, search, option) => {
        return option?.raw?.name.includes(search) ?? false
      }}
      initLoading={initLoading}
      loading={loading}
      multiple={true}
      onSearch={(value) => {
        setLoading(true)
        setResult([])
        onSearch(value)
      }}
      options={options}
      placeholder={t('请选择')}
      search={true}
    />
  )
}
