import { FileName } from '@/components/common/file-name'
import { useModule } from '@/hooks'
import { searchFile } from '@/rest/source'
import type { File } from '@/types/module/source'
import { ComboSelect, type ComboSelectOptionProps, type ComboSelectProps } from '@easykit/design'
import { debounce } from 'es-toolkit'
import { type FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

export type FilesSelectProps = ComboSelectProps<File>

export const FilesSelect: FC<FilesSelectProps> = (props) => {
  const { t } = useTranslation()
  const m = useModule()
  const [result, setResult] = useState<ComboSelectOptionProps<File>[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const onSearch = useCallback(
    debounce(async (value: string) => {
      const { success, data } = await searchFile({ module: m, keyword: value })
      if (success) {
        setResult(
          data?.data?.map((item) => ({
            label: <FileName iconClassName="size-4" file={item} />,
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
      options={options}
      loading={loading}
      placeholder={t('请选择')}
      multiple={true}
      search={true}
      className="min-w-[180px]"
      onSearch={(value) => {
        setLoading(true)
        setResult([])
        onSearch(value)
      }}
      filter={(_value, search, option) => {
        return option?.raw?.name.includes(search) ?? false
      }}
    />
  )
}
