import { getColumns, getFilters, getRowActions } from './table'

import { Card, DataTable, useAlert, useMessage } from '@easykit/design'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useListQuery } from '@clover/public/hooks'
import { type EntryListQuery, entryList } from '@/rest/source'
import type { Entry } from '@/types/module/entry'

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
    <Card>
      <DataTable<Entry>
        columns={getColumns()}
        data={data}
        filter={{
          items: getFilters(),
          defaultValues: initialParams,
          query: query,
        }}
        inCard={true}
        load={load}
        loading={loading}
        onRowActionClick={({ id: key }, { original }) => {
          console.log(key, original)
        }}
        pagination={pagination}
        rowActions={(cell) => getRowActions(cell)}
      />
    </Card>
  )
}
