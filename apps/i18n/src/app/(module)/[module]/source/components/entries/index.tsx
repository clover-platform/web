import { type EntryListQuery, entryList } from '@/rest/source'
import type { Entry } from '@/types/module/entry'
import { useListQuery } from '@clover/public/hooks'
import { Card, DataTable, useAlert, useMessage } from '@easykit/design'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { getColumns, getFilters, getRowActions } from './table'

const initialParams = {
  keyword: '',
  fileId: '',
}

export const Entries = () => {
  const { module } = useParams()
  const alert = useAlert()
  const msg = useMessage()
  const { t } = useTranslation()
  const { loading, data, pagination, load, query, refetch } = useListQuery<Entry, EntryListQuery>({
    params: {
      module: module as string,
    },
    initialParams,
    key: 'module:source:entries',
    action: entryList,
  })

  return (
    <>
      <Card>
        <DataTable<Entry>
          inCard={true}
          filter={{
            items: getFilters(),
            defaultValues: initialParams,
            query: query,
          }}
          load={load}
          pagination={pagination}
          columns={getColumns()}
          rowActions={(cell) => getRowActions(cell)}
          data={data}
          loading={loading}
          onRowActionClick={({ id: key }, { original }) => {
            console.log(key, original)
          }}
        />
      </Card>
    </>
  )
}