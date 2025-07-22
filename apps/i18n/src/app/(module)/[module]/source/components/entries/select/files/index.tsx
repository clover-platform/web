import { FileName } from '@/components/common/file-name'
import { useModule } from '@/hooks'
import { searchFile } from '@/rest/source'
import { ComboSelect, type ComboSelectOptionProps, type ComboSelectProps } from '@easykit/design'
import { debounce } from 'es-toolkit'
import { type FC, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

export type FilesSelectProps = ComboSelectProps

export const FilesSelect: FC<FilesSelectProps> = (props) => {
  const { t } = useTranslation()
  const m = useModule()
  const [result, setResult] = useState<ComboSelectOptionProps<File>[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const onSearch = useCallback(
    debounce(async (value: string) => {
      console.log('onSearch', value)
      const { success, data } = await searchFile({ module: m, keyword: value })
      if (success) {
        setResult(
          data?.data?.map((item) => ({
            label: <FileName file={item} />,
            value: `${item.id}`,
          })) ?? []
        )
      } else {
        setResult([])
      }
      setLoading(false)
    }, 500),
    []
  )

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
    />
  )
}
